import pandas as pd
import numpy as np

# For NiLearn
from nilearn import datasets
from nilearn import plotting
from nilearn import image
from nilearn.input_data import NiftiLabelsMasker
from nilearn.connectome import ConnectivityMeasure

# For Plotting
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
# Form sklearn
from sklearn.metrics import accuracy_score, classification_report
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.gaussian_process.kernels import RBF
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score
from sklearn.metrics import plot_confusion_matrix, confusion_matrix, precision_recall_curve, recall_score, precision_score, precision_recall_curve, roc_curve, auc
from sklearn.model_selection import cross_val_predict, cross_val_score

from prettytable import PrettyTable
from matplotlib.colors import ListedColormap
import time as time
from joblib import dump, load
import tensorflow as tf
from kerastuner.tuners import RandomSearch
from tensorflow import keras
from tensorflow.keras import layers
from keras.models import load_model
from keras.models import Model
from keras.layers import Input, Dense
from keras.layers import LSTM, Bidirectional
from keras import optimizers
from keras import utils
import numpy as np
from keras import utils as np_utils

"""## Constant Declarations"""
BUCKET = 'gs://tm_fmri_model_storage/'
data_dir = '/dataset/'
PRE_PROCESSED_FEATURE_DATA = data_dir + 'ABIDE_FEATURE_SET'
LABEL_DATA = data_dir + 'ABIDE_LABELS'

#Parameters for the sample size and study
n_subjects = 1112
DX_GROUP = {1,2}
DSM_IV_TR = [0,1,2,3,4]

X_features = np.load(PRE_PROCESSED_FEATURE_DATA+'.npz')['a']
all_subjects_data_reshaped=np.array(X_features)
all_subjects_data_reshaped.shape
labels_ndarray = np.load(LABEL_DATA+'.npz')['a']
labels= labels_ndarray.tolist()
labels[0]=1
labels[10]=1

# create the model
model = keras.Sequential()

# LSTM layers - 
# Long Short-Term Memory layer - Hochreiter 1997.
t_shape=316
RSN_shape=70

model.add(Bidirectional(LSTM(units=70, # dimensionality of the output space 
               dropout=0.4, # Fraction of the units to drop (inputs)
               recurrent_dropout=0.15, # Fraction of the units to drop (recurent state)
               return_sequences=True, # return the last state in addition to the output
               input_shape=(t_shape,RSN_shape))))

model.add(Bidirectional(LSTM(units=60,  
               dropout=0.4, 
               recurrent_dropout=0.15, 
               return_sequences=True)))

model.add(Bidirectional(LSTM(units=50,  
               dropout=0.4, 
               recurrent_dropout=0.15, 
               return_sequences=True)))

model.add(Bidirectional(LSTM(units=40,  
               dropout=0.4, 
               recurrent_dropout=0.15, 
               return_sequences=False)))


model.add(Dense(units=2, 
                activation="sigmoid"))

model.compile(loss='binary_crossentropy', 
                optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), 
                metrics=['binary_accuracy'])
model.build((871, 316, 70))

tf.keras.utils.plot_model(model, show_shapes=True, show_layer_names=True)



def get_train_test(X, y, i, verbrose=False):
  '''
  split to train and test and reshape data
  
  X data
  y labels
  i random state
  '''
  
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
  
  # print if verbrose
  if verbrose:
    print(X_train.shape[0], 'train samples')
    print(X_test.shape[0], 'test samples')
  
  # Converts class vectors to binary class matrices.
  y_train = keras.utils.to_categorical(y_train, 2)
  y_test = keras.utils.to_categorical(y_test, 2)
  
  return X_train, X_test, y_train, y_test


def train():
  # split data
  X_train, X_test, y_train, y_test=get_train_test(all_subjects_data_reshaped,
                                                 labels, 
                                                 i=42, verbrose=True)
  early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=3)
  
  checkpoint_filepath = '/checkpoint'
  
  model_checkpoint = tf.keras.callbacks.ModelCheckpoint(
      filepath=checkpoint_filepath,
      save_weights_only=True,
      monitor='val_binary_accuracy',
      mode='max',
      save_best_only=True)
  
  history = model.fit(X_train, y_train, validation_split=0.2, epochs=100, callbacks=[early_stopping,model_checkpoint],validation_data=(X_test, y_test))
  
  history = model.fit(X_train, y_train, validation_split=0.2, epochs=100,validation_data=(X_test, y_test))
  
 model.save(BUCKET + '/bilstm/model')