# Author : SHIVANSH GUPTA
# Detail explanation of code is in ML Notebook/notebook.ipynb if anyone want to understand stuff

from ultralytics import YOLO
import cv2
import numpy as np
from typing import List, Dict
import torch
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv("app/.env")

class YOLODetector:
    """
    Wrapper for a custom-trained YOLO model to detect recyclable or reusable items.

    Features:
    - Automatically loads the trained model onto CPU or GPU
    - Uses the custom dataset’s class names instead of COCO labels
    - Returns clean, JSON-serializable detection results
    - Annotates images with bounding boxes and class labels
    """


    def __init__(self, model_path: str = None, device: str = None):
        # Resolve model path: provided arg > env var > default yolo12n.pt
        model_path = model_path or os.getenv("MODEL_PATH","yolo12n.pt")

        # Pick device: prefer GPU if available
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")

        # Load the custom-trained YOLO model onto the selected device
        self.model = YOLO(model_path).to(self.device)
        print(f"[YOLODetector] Loaded model: {model_path} on {self.device}")

        # Map custom model class IDs → class names (from our own dataset)
        self.reusable_classes = {
            0: "Banana",
            1: "Apple",
            2: "Orange",
            3: "Tomato",
            4: "Carrot",
            5: "Cucumber",
            6: "Potato",
            7: "Bread",
            8: "Cake",
            9: "Pizza",
            10: "Hamburger",
            11: "Chicken",
            12: "Fish",
            13: "Food",
            14: "Tin can",
            15: "Bottle",
            16: "Facial tissue holder",
            17: "Toilet paper",
            18: "Paper towel",
            19: "Milk",
            20: "Snack",
            21: "Plastic bag",
            22: "Candy",
            23: "Light bulb",
            24: "Toothbrush",
            25: "Soap dispenser",
            26: "Drinking straw",
            27: "Fast food",
            28: "Pasta",
            29: "Pastry"
        }

    def detect_objects(self, image_path: str, conf: float = 0.3, imgsz: int = 640) -> List[Dict]:
        """
        Run YOLO inference and return filtered detections.
        Args:
            image_path: Path to input image
            conf: Confidence threshold (0..1)
            imgsz: Image size for inference (default 640)
        Returns:
            List of detection dicts with class info, confidence, and bounding box
        """
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found: {image_path}")

        # Restrict to reusable class IDs at model level
        classes = list(self.reusable_classes.keys())

        # Run YOLO inference
        results = self.model(
            image_path,
            conf=conf,
            imgsz=imgsz,
            classes=classes
        )

        detections = []
        for result in results:  # typically one result since one image
            if not getattr(result, "boxes", None):
                continue
            for box in result.boxes:
                class_id = int(box.cls[0])
                confidence = float(box.conf[0])
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())

                detections.append({
                    "class_id": class_id,
                    "class_name": self.reusable_classes[class_id],
                    "confidence": {
                        "score": round(confidence, 4),       # raw score (0..1)
                        "percent": round(confidence * 100, 1)  # human-friendly %
                    },
                    "bbox": [x1, y1, x2, y2]
                })

        return detections

    def annotate_image(self, image_path: str, detections: List[Dict]) -> np.ndarray:
        """
        Draw bounding boxes + labels on an image.
        Args:
            image_path: Path to input image
            detections: List of detection dicts
        Returns:
            Annotated image (RGB numpy array)
        """
        img_bgr = cv2.imread(image_path)
        if img_bgr is None:
            raise FileNotFoundError(f"Failed to read image: {image_path}")

        # Draw detections (OpenCV expects BGR color order)
        for det in detections:
            x1, y1, x2, y2 = det["bbox"]
            label = f"{det['class_name']} {det['confidence']['percent']}%"
            cv2.rectangle(img_bgr, (x1, y1), (x2, y2), (16, 185, 129), 2)
            cv2.putText(img_bgr, label, (x1, y1 - 6),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                        (255, 255, 255), 1, cv2.LINE_AA)

        # Convert to RGB before returning (for consistent display + frontend)
        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        return img_rgb
