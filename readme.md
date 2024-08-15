
# 🍅 Agricultural Disease Detection with CNNs 📊

## Deployment and Previews 🌐

### API Documentation
- **Deployed Link (Heroku):** [Tomato Disease API](https://tomato-disease-cnn-5f092777a81e.herokuapp.com/docs)

### Website Interface
- **Deployed Link:** [Tomato Disease Detection Website](https://tomato-disease-cnn.vercel.app)

### Mobile Application
- **Expo Go Link:** `exp://u.expo.dev/update/cab3f727-1be2-4e4a-b797-e511c6753903`
- **Instructions:**
  - Download the Expo Go app from the App Store or Google Play Store.
  - Click on the link and paste it in your browser to open the app.

## Running Locally 🖥️

### Website (built with Next.js)
1. Navigate to the `web` folder.
2. Run `yarn` if you are using Yarn or `npm install` if you are using npm.
3. Run `yarn dev` or `npm run dev`.

### App (built with React Native)
1. Navigate to the `mobile` folder.
2. Run `yarn` if you are using Yarn or `npm install` if you are using npm.
3. Run `npx expo start`.
4. Download the Expo Go app.
5. Scan the QR code displayed on your terminal screen.

## Technologies Used 🛠️

- **TensorFlow & Keras:** For building and training the deep learning model.
- **Python:** As the primary programming language.
- **FastAPI:** For creating the API.
- **Next.js:** For building the web interface.
- **React Native:** For developing the mobile application.
- **Expo:** For running the mobile application.
- **Heroku:** For deploying the API.
- **Vercel:** For deploying the web interface.

## Overview 🌟

Welcome to the technical documentation for my Tomato Leaf Disease Detection Model! This Convolutional Neural Network (CNN) model is designed to accurately classify tomato leaf diseases, ensuring healthier crops and better yields for farmers. 🚜🌿

## Methodology 🚀

### Dataset Preparation 📂

1. **Source:** The dataset contains 10,373 images of tomato leaves, categorized into 5 classes: Bacterial Spot, Healthy, Septoria Leaf Spot, Spider Mites (Two-spotted Spider Mite), and YellowLeaf Curl Virus. (https://www.kaggle.com/datasets/arjuntejaswi/plant-village)
2. **Preprocessing:** 
   - **Resizing:** Images are resized to 256x256 pixels.
   - **Batching:** A batch size of 32 is used for training.
   - **Splitting:** The dataset is split into 80% training, 10% validation, and 10% testing.

### Data Augmentation 📈

To improve the model's robustness and prevent overfitting, the following data augmentation techniques are applied:
1. **Random Flipping:** Horizontal and vertical flipping.
2. **Random Rotation:** Rotation by 0.2 radians.

### Data Pipeline Setup 🔄

1. **Resizing and Rescaling:**
    ```python
    resize_and_rescale = tf.keras.Sequential([
        layers.Resizing(IMG_HEIGHT, IMG_WIDTH),
        layers.Rescaling(1./255)
    ])
    ```
    - **Explanation:** This sequential model first resizes the images to the specified height and width, and then rescales the pixel values to the range [0, 1]. Rescaling is important for normalizing the input data.

2. **Data Augmentation:**
    ```python
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
    ])
    ```
    - **Explanation:** This sequential model applies random horizontal and vertical flips and random rotations to the input images. Data augmentation increases the diversity of the training data and helps prevent overfitting.

## AI Model Architecture 🧠

The AI model is a Convolutional Neural Network (CNN) with the following architecture:

1. **Input Layer:**
    - Input shape: (256, 256, 3)
    - Resizing and rescaling.

2. **Convolutional Layers:**
    - Six Conv2D layers with ReLU activation:
        ```python
        layers.Conv2D(32, 3, activation="relu", input_shape=input_shape),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, activation="relu"),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, activation="relu"),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, activation="relu"),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, activation="relu"),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, activation="relu"),
        layers.MaxPooling2D()
        ```
      - **Explanation:** 
      - **Conv2D Layers:** These layers apply convolution operations to detect features in the input images. The number of filters increases from 32 to 64 to capture more complex features at deeper layers.
      - **ReLU Activation:** ReLU (Rectified Linear Unit) introduces non-linearity, allowing the model to learn complex patterns. It outputs the input directly if it is positive; otherwise, it outputs zero.
      - **MaxPooling2D Layers:** These layers reduce the spatial dimensions (height and width) of the feature maps, retaining the most important features and reducing computational load.


3. **Fully Connected Layers:**
    - Flattening layer followed by two Dense layers:
        ```python
        layers.Flatten(),
        layers.Dense(64, activation="relu"),
        layers.Dense(num_classes, activation="softmax")
        ```
    - **Explanation:** 
      - **Flatten Layer:** Converts the 2D feature maps into a 1D vector, preparing the data for the fully connected layers.
      - **Dense Layers:** The first dense layer (with ReLU activation) learns complex patterns and interactions between the features. The second dense layer (with softmax activation) outputs the probabilities for each class.
      - **Softmax Activation:** Softmax is used for multi-class classification. It converts the raw output scores into probabilities, summing up to 1.
        
4. **Model Summary:**
    ```python
    model.summary()
    ```
    
   - **Explanation:** Provides a summary of the model architecture, including the layer names, output shapes, and the number of parameters.

    
    <pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┓
   ┃<span style="font-weight: bold"> Layer (type)                    </span>┃<span style="font-weight: bold"> Output Shape           </span>┃<span style="font-weight: bold">       Param # </span>┃
   ┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━┩
   │ sequential_1 (<span style="color: #0087ff; text-decoration-color: #0087ff">Sequential</span>)       │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">256</span>, <span style="color: #00af00; text-decoration-color: #00af00">256</span>, <span style="color: #00af00; text-decoration-color: #00af00">3</span>)      │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ sequential (<span style="color: #0087ff; text-decoration-color: #0087ff">Sequential</span>)         │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">256</span>, <span style="color: #00af00; text-decoration-color: #00af00">256</span>, <span style="color: #00af00; text-decoration-color: #00af00">3</span>)      │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ conv2d (<span style="color: #0087ff; text-decoration-color: #0087ff">Conv2D</span>)                 │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">254</span>, <span style="color: #00af00; text-decoration-color: #00af00">254</span>, <span style="color: #00af00; text-decoration-color: #00af00">32</span>)     │           <span style="color: #00af00; text-decoration-color: #00af00">896</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ max_pooling2d (<span style="color: #0087ff; text-decoration-color: #0087ff">MaxPooling2D</span>)    │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">127</span>, <span style="color: #00af00; text-decoration-color: #00af00">127</span>, <span style="color: #00af00; text-decoration-color: #00af00">32</span>)     │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ conv2d_1 (<span style="color: #0087ff; text-decoration-color: #0087ff">Conv2D</span>)               │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">125</span>, <span style="color: #00af00; text-decoration-color: #00af00">125</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)     │        <span style="color: #00af00; text-decoration-color: #00af00">18,496</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ max_pooling2d_1 (<span style="color: #0087ff; text-decoration-color: #0087ff">MaxPooling2D</span>)  │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">62</span>, <span style="color: #00af00; text-decoration-color: #00af00">62</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)       │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ conv2d_2 (<span style="color: #0087ff; text-decoration-color: #0087ff">Conv2D</span>)               │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">60</span>, <span style="color: #00af00; text-decoration-color: #00af00">60</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)       │        <span style="color: #00af00; text-decoration-color: #00af00">36,928</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ max_pooling2d_2 (<span style="color: #0087ff; text-decoration-color: #0087ff">MaxPooling2D</span>)  │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">30</span>, <span style="color: #00af00; text-decoration-color: #00af00">30</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)       │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ conv2d_3 (<span style="color: #0087ff; text-decoration-color: #0087ff">Conv2D</span>)               │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">28</span>, <span style="color: #00af00; text-decoration-color: #00af00">28</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)       │        <span style="color: #00af00; text-decoration-color: #00af00">36,928</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ max_pooling2d_3 (<span style="color: #0087ff; text-decoration-color: #0087ff">MaxPooling2D</span>)  │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">14</span>, <span style="color: #00af00; text-decoration-color: #00af00">14</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)       │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ conv2d_4 (<span style="color: #0087ff; text-decoration-color: #0087ff">Conv2D</span>)               │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">12</span>, <span style="color: #00af00; text-decoration-color: #00af00">12</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)       │        <span style="color: #00af00; text-decoration-color: #00af00">36,928</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ max_pooling2d_4 (<span style="color: #0087ff; text-decoration-color: #0087ff">MaxPooling2D</span>)  │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">6</span>, <span style="color: #00af00; text-decoration-color: #00af00">6</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)         │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ conv2d_5 (<span style="color: #0087ff; text-decoration-color: #0087ff">Conv2D</span>)               │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">4</span>, <span style="color: #00af00; text-decoration-color: #00af00">4</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)         │        <span style="color: #00af00; text-decoration-color: #00af00">36,928</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ max_pooling2d_5 (<span style="color: #0087ff; text-decoration-color: #0087ff">MaxPooling2D</span>)  │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">2</span>, <span style="color: #00af00; text-decoration-color: #00af00">2</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)         │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ flatten (<span style="color: #0087ff; text-decoration-color: #0087ff">Flatten</span>)               │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">256</span>)              │             <span style="color: #00af00; text-decoration-color: #00af00">0</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ dense (<span style="color: #0087ff; text-decoration-color: #0087ff">Dense</span>)                   │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">64</span>)               │        <span style="color: #00af00; text-decoration-color: #00af00">16,448</span> │
   ├─────────────────────────────────┼────────────────────────┼───────────────┤
   │ dense_1 (<span style="color: #0087ff; text-decoration-color: #0087ff">Dense</span>)                 │ (<span style="color: #00af00; text-decoration-color: #00af00">32</span>, <span style="color: #00af00; text-decoration-color: #00af00">5</span>)                │           <span style="color: #00af00; text-decoration-color: #00af00">325</span> │
   └─────────────────────────────────┴────────────────────────┴───────────────┘
   </pre>

    

## Training Process 🏋️‍♂️

1. **Compilation:**
    - Optimizer: Adam
    - Loss Function: Sparse Categorical Crossentropy
    - Metrics: Accuracy
    ```python
    model.compile(
        optimizer="adam",
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )
    ```
    - **Explanation:**
      - The model is compiled with the Adam optimizer, which is efficient and requires little memory. The loss function used is sparse categorical cross-entropy, suitable for multi-class classification tasks. The accuracy metric is used to evaluate the performance of the model during training and validation.
      - **Adam Optimizer:** Adam (Adaptive Moment Estimation) computes adaptive learning rates for each parameter. It is efficient and well-suited for problems with sparse gradients.
      - **Sparse Categorical Crossentropy:** Used for multi-class classification when the target labels are integers. It measures the performance of the model by comparing the predicted probabilities with the actual class labels.
        
2. **Model Training:**
    ```python
    history = model.fit(
        train_ds,
        batch_size=BATCH_SIZE,
        validation_data=val_ds,
        epochs=EPOCHS,
        verbose=1
    )
    ```
    - **Explanation:** The model is trained using the fit method, where the training dataset (`train_ds`) and validation dataset (`val_ds`) are provided. The number of epochs determines how many times the entire dataset is passed through the model. The batch size controls the number of samples processed before the model's internal parameters are updated.
      
3. **Evaluation:**
    ```python
    score = model.evaluate(test_ds)
    print(f"Test loss: {score[0]}")
    print(f"Test accuracy: {score[1] * 100}%")
    ```
    - **Explanation:** The model is evaluated on the test dataset (`test_ds`) to determine its performance. The test loss and test accuracy are printed to assess how well the model generalizes to unseen data.
      
## Performance Metrics 📊

- **Accuracy:** 0.07274306565523148
- **Loss:** 97.36%

## Visualizations 📈

### Training and Validation Accuracy
```python
plt.figure(figsize=(8, 8))
plt.subplot(2, 1, 1)
plt.plot(history.history["accuracy"], label="Training Accuracy")
plt.plot(history.history["val_accuracy"], label="Validation Accuracy")
plt.legend(loc="lower right")
plt.ylabel("Accuracy")
plt.ylim([0, 1])
plt.title("Training and Validation Accuracy")
```
<img width="713" alt="1" src="https://github.com/user-attachments/assets/3904ae98-0345-485f-b2c6-58a44895be17">

- **Findings:** The training and validation accuracy curves show the model's performance over epochs. Consistent improvement in accuracy indicates effective learning, while any significant divergence between training and validation accuracy could suggest overfitting.

### Training and Validation Loss
```python
plt.subplot(2, 1, 2)
plt.plot(history.history["loss"], label="Training Loss")
plt.plot(history.history["val_loss"], label="Validation Loss")
plt.legend(loc="upper right")
plt.ylabel("Cross Entropy")
plt.title("Training and Validation Loss")
plt.xlabel("epoch")
plt.show()
```
<img width="715" alt="2" src="https://github.com/user-attachments/assets/21f6d814-70c4-433b-905c-89abafdf6762">

- **Findings:** The loss curves indicate the model's error rate during training and validation. A decrease in both training and validation loss over epochs signifies effective model learning. A plateau or increase in validation loss while training loss decreases may indicate overfitting.

### Sample Predictions
```python
plt.figure(figsize=(20, 20))
for image_batch, labels_batch in test_ds.take(1):
    for i in range(9):
        image = image_batch[i]
        label = labels_batch[i]
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(image.numpy().astype("uint8"))
        predicted_class, confidence = predict_image(model, image.numpy())
        actual_class = class_names[label]
        plt.title(f"Actual: {actual_class},\nPredicted: {predicted_class}\nConfidence: {confidence}%")
        plt.axis("off")
```
<img width="750" alt="3" src="https://github.com/user-attachments/assets/cec5df5c-542a-49d6-a4d0-4c890ff51b89"/>


- **Findings:** This visualization shows the actual vs. predicted labels for a batch of test images. Correct predictions enhance confidence in the model's real-world application, while misclassifications provide insights into areas needing improvement.


## Main Challenges 🧗‍♂️

1. **Overfitting:** Implementing data augmentation and regularization techniques to prevent the model from overfitting to the training data.
2. **Hyperparameter Tuning:** Finding the optimal parameters for learning rate, batch size, and the number of epochs to maximize model performance.

## Impact 🌍

The implementation of this Tomato Leaf Disease Detection model can have significant positive impacts, especially in the agricultural sector:

1. **Early Detection:** By identifying diseases at an early stage, farmers can take timely actions to prevent the spread of diseases, thus saving crops and ensuring better yield.
2. **Increased Productivity:** Healthy crops lead to higher productivity and better-quality produce, benefiting both farmers and consumers.
3. **Sustainable Farming:** Early disease detection helps in reducing the usage of pesticides and other chemicals, promoting sustainable and eco-friendly farming practices.
4. **Cost Savings:** By preventing large-scale crop damage, farmers can save on costs associated with disease management and crop loss.
5. **Food Security:** Ensuring healthy crops contributes to food security by providing a stable and reliable food supply.
   
## Sample Images for Testing 🖼️

### Bacterial Spot
![ffcf0c9e-f932-4836-b160-47277fbe124c___GCREC_Bact Sp 3776](https://github.com/user-attachments/assets/9a14294e-8dfc-4a6b-8425-e9bd55b4f3c3)


### Healthy
![0a205a11-1e64-49f7-93c2-ad59312b4f83___RS_HL 0334](https://github.com/user-attachments/assets/3ec6e232-05c9-4146-ba37-fc089eae9247)

### Septoria Leaf Spot
![2f4afdee-f957-400f-8515-4ea92173d00d___Matt S_CG 0667](https://github.com/user-attachments/assets/688e271f-4dc7-47b2-8f60-ffbb231c6972)

### Spider Mites (Two-spotted Spider Mite)
![2a1b18db-6bbb-4c36-ad06-bf0fcaa5c4b8___Com G_SpM_FL 1418](https://github.com/user-attachments/assets/12f22256-5d94-421e-b517-53b8358a3fd6)

### Yellow Leaf Curl Virus
![0b668e46-2ef6-4dbf-b45e-220b45bad923___YLCV_NREC 2553](https://github.com/user-attachments/assets/47558e71-0cd4-4399-9426-661d8992feae)

