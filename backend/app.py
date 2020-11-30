from flask import Flask,render_template,Response, jsonify, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from predictor import Predictor
from tools import Helper, ModelLoader
import json
import os
from mimetypes import guess_extension, guess_type
import base64
import shutil
import tempfile
#initialization for flask app
app = Flask(__name__)
api = Api(app)  # type: Api

predictor = Predictor()
model_loader = ModelLoader()

@app.route('/predict_car_type', methods=['POST'])
def predict_car_type():
    if "images" not in request.form:
        return "images must be provided", status.HTTP_400_BAD_REQUEST

    images = json.loads(request.form['images'])

    images_to_predict = Helper.get_fixed_base64_images_by_dict(images)
    model = model_loader.load(os.path.join(os.getcwd(),"models/Resnet50_with_traning_best.hdf5"))
    predictions = predictor.predict(model, images_to_predict, (224,224), ["car", "jeep", "truck"])
    # the order {'car': 0, 'jeep': 1, 'truck': 2} come from train_generator.class_indices, validation_generator.class_indices or test_generator.class_indices 
    # the 3 give some order for classes
    return jsonify(predictions)

@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    header['Access-Control-Allow-Methods'] = 'OPTIONS, HEAD, GET, POST, DELETE, PUT'
    return response

if __name__ == "__main__":
    app.run()