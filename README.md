---

# 🌱 **Eco Vision – FastAPI Backend**

This repository contains the backend service for **Eco Vision**, a sustainability-focused application that detects household items using a **custom-trained YOLO model** and provides **reuse or recycling tips** for each item.

The backend integrates:

* A custom YOLO model trained on 30 recyclable/reusable object classes
* A FastAPI service for inference and image annotation
* Reuse-tip mapping for sustainability guidance
* Deployment-ready configurations (Docker + Render)
* Full ML training artifacts for transparency and reproducibility

---

# 🌍 **Live API (Render Deployment)**

Base URL:

```
https://eco-vision-1.onrender.com
```

Interactive API documentation:

```
https://eco-vision-1.onrender.com/docs
```

The interface supports image uploads and displays detections, reuse tips, and annotated output.

---

# 📁 **Project Structure**

```
fastapi/
│
├── .env
├── build.sh
├── Dockerfile
├── requirements.txt
│
├── ML work/
│   │   best.pt
│   │   notebook.ipynb
│   │   yolo12n.pt
│   │   yolo12s.pt
│   │   test.jpg
│   │   test0.jpg
│   │   test1.jpg
│   │   test2.jpg
│   │   test3.jpg
│   │   test4.jpg
│   │   test5.jpg
│   │   test6.jpg
│   │   test7.jpeg
│   │   test13.jpg
│   │   test15.webp
│   │   test16.jpg
│   │   test17.jpg
│   │   test20.jpg
│   │   test23.jpg
│   │
│   └── dest/
│       │   data.yaml
│       │   notebook4e6102f5bd.log
│       │   yolo11n.pt
│       │   yolo12n.pt
│       │   yolo12s.pt
│       │
│       └── runs/
│           └── detect/
│               ├── custom_yolo_training/
│               │   │   args.yaml
│               │   │   labels.jpg
│               │   │   results.csv
│               │   │   train_batch0.jpg
│               │   │   train_batch1.jpg
│               │   │   train_batch2.jpg
│               │   │
│               │   └── weights/
│               │           best.pt     ← final trained model
│               │           last.pt
│               │
│               └── train/
│                   │   args.yaml
│                   │   labels.jpg
│                   │   results.csv
│                   │   results.png
│                   │   confusion_matrix.png
│                   │   confusion_matrix_normalized.png
│                   │   BoxF1_curve.png
│                   │   BoxPR_curve.png
│                   │   BoxP_curve.png
│                   │   BoxR_curve.png
│                   │   train_batch0.jpg
│                   │   train_batch1.jpg
│                   │   train_batch2.jpg
│                   │   val_batch0_labels.jpg
│                   │   val_batch0_pred.jpg
│                   │   val_batch1_labels.jpg
│                   │   val_batch1_pred.jpg
│                   │   val_batch2_labels.jpg
│                   │   val_batch2_pred.jpg
│                   │
│                   └── weights/
│                           best.pt
│                           last.pt
│
└── app/
    ├── data/
    │   └── reuse_mapping.json
    │
    ├── models/
    │   └── yolo_detector.py
    │
    ├── services/
    │   └── detection_service.py
    │
    ├── main.py
    │
    └── weights/
        └── best.pt   ← model used by the API
```

---

# 🤖 **Model Overview**

The backend uses a **custom-trained YOLO model** with 30 household object classes, such as:

* Banana
* Tomato
* Tin can
* Bottle
* Paper towel
* Milk
* Plastic bag
* Light bulb
* Toothbrush
* Snack
* Pasta
* Pastry
* Fast food
* Cake
* Hamburger

The final model is located at:

```
ML work/dest/runs/detect/custom_yolo_training/weights/best.pt
```

and is copied into:

```
app/weights/best.pt
```

for production inference.

---

# 🧠 **System Architecture**

### **1. Model Layer – `yolo_detector.py`**

Handles:

* YOLO model loading
* Device selection (CPU/GPU)
* Object detection
* Bounding box + confidence extraction
* Image annotation

### **2. Service Layer – `detection_service.py`**

Handles:

* Running YOLO inference
* Attaching reuse tips
* Formatting detection results
* Returning annotated images as numpy arrays

### **3. API Layer – `main.py`**

Provides:

```
GET /health
POST /detect
```

`/detect` accepts an uploaded image, performs detection, attaches reuse tips, annotates the image, and returns JSON + Base64.

---

# ⚙️ **Installation & Local Development**

### Clone the repository

```bash
git clone https://github.com/shashank201104/Eco_Vision.git
cd Eco_Vision/fastapi
```

### Install dependencies

```bash
pip install -r requirements.txt
```

or:

```bash
bash build.sh
```

### Start the API

```bash
uvicorn app.main:app --reload
```

Access locally:

```
http://127.0.0.1:8000
http://127.0.0.1:8000/docs
```

---

# 📤 **API Usage**

## **POST /detect**

### Request:

Multipart form with a single file.

### Example:

```bash
curl -X POST "https://eco-vision-1.onrender.com/detect" \
     -F "file=@test.jpg"
```

### Example Response:

```json
{
  "total_items": 2,
  "detections": [
    {
      "class_id": 15,
      "class_name": "Bottle",
      "confidence": { "score": 0.8731, "percent": 87.3 },
      "bbox": [140, 50, 310, 490],
      "reuse_tip": "Repurpose as a water bottle, planter, or storage container."
    }
  ],
  "annotated_image": "<BASE64_ENCODED_JPEG>"
}
```

The image can be displayed directly:

```js
<img src={`data:image/jpeg;base64,${annotated_image}`} />
```

---

# 🧪 **Testing the API**

Test images are available in:

```
fastapi/ML work/
```

Alternatively, use the deployed Swagger interface:

```
https://eco-vision-1.onrender.com/docs
```

---

# 🐳 **Deployment (Render)**

### Environment Variables

In Render Dashboard → Environment:

```
MODEL_PATH=app/weights/best.pt
ALLOWED_ORIGINS=https://eco-vision-lzem.onrender.com
```

### Start Command

```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Build Command

Handled by the Dockerfile.

---

# 🔁 **Updating the YOLO Model**

To update the inference model:

1. Train a new model via the notebook
2. Locate the new weights:

   ```
   ML work/dest/runs/detect/custom_yolo_training/weights/best.pt
   ```
3. Replace:

   ```
   app/weights/best.pt
   ```
4. Redeploy or restart the backend service

---

# 🎯 **Purpose**

This backend serves as the inference engine for Eco Vision.
It combines:

* Object detection
* Sustainability guidance
* Visual annotation
* Easy integration with frontends

and enables the Eco Vision application to promote environmentally responsible habits.

---

# 👤 **Author**

Shivansh Gupta
Eco Vision – ML, backend, training, and deployment.

---