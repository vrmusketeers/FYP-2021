import numpy as np
from nilearn import datasets
import keras
from nilearn.input_data import NiftiLabelsMasker
from nilearn.connectome import ConnectivityMeasure
from nilearn.input_data import NiftiMapsMasker

MODEL_PATH = 'gs://tm_fmri_model_storage/bidlstm'
ATLAS_PATH = "/atlas/"

class BiDLSTMPredictor(object):
    def __init__(self):
        bidlstm, masker, smith_atlas = self.from_path()
        self.bidlstm,self.masker, self.smith_atlas = bidlstm, masker, smith_atlas
        
    def predict(self, func_file, **kwargs):
        subject_data = self.masker.fit_transform(func_file)
        # get longest scan
        max_len_image=np.max(len(subject_data))
        
        # reshape data
        # Padding
        N= max_len_image-len(subject_data)
        padded_array=np.pad(subject_data, ((0, N), (0,0)), 
                            'constant', constant_values=(0))
        subject_data=padded_array
        subject_data=np.array(subject_data)
        subject_data = subject_data.reshape(1,subject_data.shape[0],subject_data.shape[1])
        subject_data = np.array(subject_data)

        print ('data shape: ',np.array(subject_data).shape)
        
        y_pred = self.bidlstm.predict(np.array(subject_data))
        #y_pred_1d=1.0 if y_pred[0]>.5 else 0.0 

        api_output = {
            'predictions':y_pred.tolist()
        }
        
        return api_output

    def from_path(self):
        
        smith_atlas = datasets.fetch_atlas_smith_2009()
        smith_atlas = smith_atlas.rsn70
        print("Loaded Atlas..")
        
        masker = NiftiMapsMasker(maps_img=smith_atlas, standardize=True,
                         memory='nilearn_cache', verbose=0)
        print("Loaded masker..")
        
        model = keras.models.load_model(MODEL_PATH, compile=False)
        print("Loaded model..")
        
        return model, masker, smith_atlas