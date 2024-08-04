from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://tomato-disease-cnn.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model('../models/tomato_disese_model_V1.keras')

class_names = ['Bacterial_spot', 'Healthy', 'Septoria_leaf_spot',
               'Spider_mites_Two_spotted_spider_mite', 'YellowLeaf__Curl_Virus']

@app.get('/')
def read_root():
    return {"Hello": "World"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents))
    image = np.array(image)
    image = np.expand_dims(image, axis=0)
    prediction = model.predict(image)
    predicted_class = class_names[np.argmax(prediction)]
    return {"class": predicted_class, "confidence": str(np.max(prediction))}

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
