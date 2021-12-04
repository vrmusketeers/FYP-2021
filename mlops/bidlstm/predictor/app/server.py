import os
from models import BiDLSTMPredictor
from flask import Flask
from flask import request
import json
from google.cloud import storage

bidlstm = BiDLSTMPredictor()
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "/uploads/"
app.config['MAX_CONTENT_LENGTH'] = 200 * 1000 * 1000
app.config['IMAGE_PATH'] = 'fmri_data_musketeers'

@app.route("/predict", methods=['POST'])
def predict():
    file_name = request.get_json().get('nii_file')
    destination_file_path = saveFile(file_name)
    return bidlstm.predict(destination_file_path)

def saveFile(fileName):
    storage_client = storage.Client()
    bucket = storage_client.bucket(app.config['IMAGE_PATH'])
    blob = bucket.blob(fileName)
    destination_file_path = os.path.join(app.config['UPLOAD_FOLDER'], fileName)
    blob.download_to_filename(destination_file_path)
    return destination_file_path
            
@app.errorhandler(413)
def request_entity_too_large(error):
    return str(error) + " I could have sent a HTML template too."

if __name__ == "__main__":
	app.run(host="127.0.0.1", port=5000, debug=True)
