#Import Statements
import numpy as np
import pandas as pd
import pathlib

from sklearn.model_selection import train_test_split

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from kerastuner.tuners import RandomSearch
from keras.models import load_model
from keras.models import Model
from keras.layers import Input, Dense
from keras.layers import LSTM
from keras import optimizers
from keras import utils

from nilearn import datasets
from nilearn import plotting
from nilearn import image
from nilearn.input_data import NiftiLabelsMasker
from nilearn.connectome import ConnectivityMeasure

import time as time
from joblib import dump, load
#Open Cloud Bucket
BUCKET = 'gs://tm_fmri_model_storage/'
data_dir = '/dataset'
#Constant Declarations
# Parameters for the sample size and study
n_subjects = 40
DX_GROUP = {1,2}
DSM_IV_TR = [0,1,2,3,4]

#Download Data
data = datasets.fetch_abide_pcp(n_subjects=n_subjects, 
                                DX_GROUP=DX_GROUP, 
                                DSM_IV_TR=DSM_IV_TR,
                                data_dir=data_dir)
# Number of samples
print('The total number of participants are', len(data.func_preproc))
#apply Smith’s rs-fMRI components atlas. 
#Smith atlas reflects seventy resting-state networks (RSN) acquired using an independent component analysis (ICA) on thousands of healthy patients.
smith_atlas = datasets.fetch_atlas_smith_2009()
smith_atlas_rs_networks = smith_atlas.rsn70
data.func_preproc


# Region signals extraction using a mask
# exctracting the activation values of the seventy networks
from nilearn.input_data import NiftiMapsMasker
# Generate a mask
masker = NiftiMapsMasker(maps_img=smith_atlas_rs_networks,  # Smith atlas
                         standardize=True, # centers and norms the time-series
                         memory='nilearn_cache', # cache
                         verbose=0) #do not print verbose
            
# Apply the mask on the data & sort it based on label

all_subjects_data=[] # actiavtion patterns for all subjects
labels=[]  # 1 if ASD, 0 if control
func_file=data.func_preproc
phenotypic=data.phenotypic
#for func_file, confound_file, phenotypic in zip(
        #data.func_preproc, data.confounds, data.phenotypic):

for func_file, phenotypic in zip(
        data.func_preproc,data.phenotypic):
    
    time_series = masker.fit_transform(func_file)
    
    all_subjects_data.append(time_series)
    labels.append(phenotypic['DX_GROUP'])

print('N control:' ,labels.count(1))
print('N ASD:' ,labels.count(2))

np_subjects= np.array(all_subjects_data)
np_subjects[0].shape

print('N control:' ,labels.count(1))
print('N ASD:' ,labels.count(2))

for i, x in enumerate(labels):
  labels[i] = 1 if x>1 else 0
  
print('N control:' ,labels.count(0))
print('N ASD:' ,labels.count(1))

# get longest scan
max_len_image=np.max([len(i) for i in all_subjects_data])

# reshape all data
all_subjects_data_reshaped=[]
for subject_data in all_subjects_data:
  # Padding
  N= max_len_image-len(subject_data)
  padded_array=np.pad(subject_data, ((0, N), (0,0)), 
                      'constant', constant_values=(0))
  subject_data=padded_array
  subject_data=np.array(subject_data)
  subject_data.reshape(subject_data.shape[0],subject_data.shape[1],1)
  all_subjects_data_reshaped.append(subject_data)
  
print ('data shape: ',np.array(all_subjects_data_reshaped).shape)

#Train Model
# LSTM layers - 
# Long Short-Term Memory layer - Hochreiter 1997.
model = keras.Sequential()
t_shape=np.array(all_subjects_data_reshaped).shape[1]
RSN_shape=np.array(all_subjects_data_reshaped).shape[2]

model.add(LSTM(units=70, # dimensionality of the output space 
               dropout=0.4, # Fraction of the units to drop (inputs)
               recurrent_dropout=0.15, # Fraction of the units to drop (recurent state)
               return_sequences=True, # return the last state in addition to the output
               input_shape=(t_shape,RSN_shape)))

model.add(LSTM(units=60,  
               dropout=0.4, 
               recurrent_dropout=0.15, 
               return_sequences=True))

model.add(LSTM(units=50,  
               dropout=0.4, 
               recurrent_dropout=0.15, 
               return_sequences=True))

model.add(LSTM(units=40,  
               dropout=0.4, 
               recurrent_dropout=0.15, 
               return_sequences=False))


model.add(Dense(units=2, 
                activation="sigmoid"))

model.compile(loss='binary_crossentropy', 
                optimizer=tf.keras.optimizers.Adam(lr=0.001), 
                metrics=['binary_accuracy'])

print(model.summary())

X = all_subjects_data_reshaped
y = labels
i = 42
verbose = True

X_train, X_test, y_train, y_test = train_test_split(X,
                                        y, test_size=0.2, random_state=i)

# Reshapes data to 3D for Hierarchical RNN.
t_shape=np.array(all_subjects_data_reshaped).shape[1]
RSN_shape=np.array(all_subjects_data_reshaped).shape[2]

X_train = np.reshape(X_train, (len(X_train), t_shape, RSN_shape))
X_test = np.reshape(X_test, (len(X_test), t_shape, RSN_shape))

# enforce continuous labeling
X_train = X_train.astype('float32')
X_test = X_test.astype('float32')

# print if verbose
if verbose:
  print(X_train.shape[0], 'train samples')
  print(X_test.shape[0], 'test samples')

# Converts class vectors to binary class matrices.
y_train = keras.utils.to_categorical(y_train, 2)
y_test = keras.utils.to_categorical(y_test, 2)

history = model.fit(X_train, y_train, validation_split=0.2, epochs=30)

model.save(BUCKET + '/lstm/model')