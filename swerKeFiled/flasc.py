from flask import Flask, request, jsonify
import tensorflow 
import numpy as np
from PIL import Image
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

# Load your trained model
model = tensorflow.keras.models.load_model('veggies_model.keras')

class_labels = ['apple', 'banana', 'beetroot', 'bell pepper', 'cabbage', 'capsicum', 'carrot', 'cauliflower', 'chilli pepper', 'corn', 'cucumber', 'eggplant', 'garlic', 'ginger', 'grapes', 'jalepeno', 'kiwi', 'lemon', 'lettuce', 'mango', 'onion', 'orange', 'paprika', 'pear', 'peas', 'pineapple', 'pomegranate', 'potato', 'raddish', 'soy beans', 'spinach', 'sweetcorn', 'sweetpotato', 'tomato', 'turnip', 'watermelon']

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'About'

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    
    try:
        img = Image.open(file)
        img = img.resize((128, 128)) 
        img = np.array(img) / 255.0  
        img = np.expand_dims(img, axis=0)  

        predictions = model.predict(img)
        predicted_class = np.argmax(predictions, axis=1)[0]
        predicted_label = class_labels[predicted_class]
        print(jsonify({"predicted_class": predicted_label}))

        return jsonify({"predicted_class": predicted_label})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

