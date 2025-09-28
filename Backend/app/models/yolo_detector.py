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
load_dotenv()

class YOLODetector:
    """
    Wrapper for YOLOv12 model to detect reusable/recyclable items.

    Features:
    - Loads model onto CPU/GPU automatically
    - Filters detections to only include selected COCO classes
    - Returns clean, JSON-serializable results
    - Annotates images with bounding boxes + labels
    """

    def __init__(self, model_path: str = None, device: str = None):
        # Resolve model path: provided arg > env var > default yolo12n.pt
        model_path = model_path or os.getenv("MODEL_PATH","yolo12n.pt")

        # Pick device: prefer GPU if available
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")

        # Load pretrained YOLO model onto the chosen device
        self.model = YOLO(model_path)
        print(f"[YOLODetector] Loaded model: {model_path} on {self.device}")

        # Map COCO dataset IDs -> names for items consider reusable
        self.reusable_classes = {
            39: 'bottle',
            41: 'cup',
            42: 'fork',
            43: 'knife',
            44: 'spoon',
            45: 'bowl',
            46: 'banana',
            47: 'apple',
            51: 'orange',
            67: 'cell phone',
            73: 'laptop',
            76: 'keyboard',
            84: 'book',
        }

    def detect_objects(self, image_path: str, conf: float = 0.5, imgsz: int = 640) -> List[Dict]:
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
            device=self.device,
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
