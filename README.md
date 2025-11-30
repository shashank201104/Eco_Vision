# 🌱 **Eco Vision – FastAPI Backend**

*A custom-trained YOLO object-detection API that promotes recycling, reuse, and sustainability.*

The Eco Vision backend:

* Runs detection using **your custom YOLO model**
* Attaches **reuse / recycling tips** for each detected item
* Returns **annotated images** (Base64)
* Powers the Eco Vision frontend
* Is deployed on **Render**
* Includes the **full ML training workflow** and all YOLO training outputs

This is your complete AI inference system.

---

# 🌍 **Live API**

```
https://eco-vision-1.onrender.com
```

Swagger UI:

```
https://eco-vision-1.onrender.com/docs
```

Upload an image here to see detections, confidences, reuse tips, and annotated output.

---

# 📁 **Project Structure**

This is the complete structure of your `fastapi/` backend folder:

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
│               │           best.pt     ← FINAL TRAINED MODEL
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
    ├── main.py   ← FastAPI app entrypoint
    │
    └── weights/
        └── best.pt   ← copied from ML work for production use
```

---

# 🤖 **Custom YOLO Model**

Your final production model is:

```
ML work/dest/runs/detect/custom_yolo_training/weights/best.pt
```

This file is manually copied into:

```
app/weights/best.pt
```

and loaded using `.env`:

```
MODEL_PATH=app/weights/best.pt
```

The model has **30 custom classes** (Banana, Bottle, Light bulb, Plastic bag, Cake, Pasta, etc.).

---

# 🧠 **How the Backend Works**

### **1. YOLO Model Layer (`yolo_detector.py`)**

* Loads the YOLO model
* Detects only your 30 custom classes
* Returns:

  * class ID
  * class name
  * bounding box
  * confidence (raw + %)
* Draws bounding boxes + labels on the image

### **2. Detection Service (`detection_service.py`)**

* Runs detection
* Loads reuse tips from `reuse_mapping.json`
* Adds `"reuse_tip"` to each detected item
* Returns:

  * detections
  * annotated RGB image (for Base64 conversion)
  * total count

### **3. FastAPI Layer (`main.py`)**

Endpoints:

```
GET /health
POST /detect
```

`/detect`:

1. Accepts file upload
2. Saves it temporarily
3. Runs detection
4. Encodes annotated image to Base64
5. Returns JSON response
6. Deletes temp file

---

# 📤 **API Usage**

## **POST /detect**

### Request:

Upload an image as `file`.

### Example (curl):

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
  "annotated_image": "<BASE64_STRING>"
}
```

Render this in frontend:

```js
<img src={`data:image/jpeg;base64,${data.annotated_image}`} />
```

---

# 🧪 **Testing the API**

You can test with the images located directly inside:

```
fastapi/ML work/
```

Or upload any custom picture through:

```
https://eco-vision-1.onrender.com/docs
```

---

# 🐳 **Deployment (Render)**

Your backend is deployed on Render at:

```
https://eco-vision-1.onrender.com
```

### Required Environment Variables (Render Dashboard):

```
MODEL_PATH=app/weights/best.pt
ALLOWED_ORIGINS=https://eco-vision-lzem.onrender.com
```

### Start Command (Render):

```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Render automatically injects `$PORT`.

### Build Command:

Handled by your Dockerfile.

---

# 🔁 **Updating the YOLO Model**

To update the model after retraining:

1. Go to your training output:

   ```
   ML work/dest/runs/detect/custom_yolo_training/weights/best.pt
   ```

2. Copy the updated best.pt to:

   ```
   app/weights/best.pt
   ```

3. Redeploy or restart the FastAPI server.

---

# 🎯 **Purpose of This Backend**

This service provides:

* Real-time recognition of recyclable or reusable items
* Sustainability-oriented suggestions
* Visual annotations
* A clean JSON API for frontend or mobile apps

It is the **AI engine** behind the Eco Vision project.

---

# 👤 **Author**

**Shivansh Gupta**
Creator of Eco Vision — ML + backend + deployment.

---
