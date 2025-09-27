# Author: SHIVANSH GUPTA
# Detail explanation of code is in ML Notebook/notebook.ipynb if anyone want to understand stuff

import base64
import cv2
import json
import os
from typing import Dict
from pathlib import Path

from Backend.app.models.yolo_detector import YOLODetector


class DetectionService:
    def __init__(self):
        # Initialize YOLO detector
        self.detector = YOLODetector()

        # Load reuse tips mapping
        data_path = Path(__file__).parent.parent / "data" / "reuse_mapping.json"  # __file__ means current file path, then .parent.parent means going 2 times up
        if not data_path.exists():
            raise FileNotFoundError(f"Missing reuse_mapping.json at {data_path}")

        with open(data_path, "r") as f:
            self.reuse_mapping = json.load(f)   # this load fn convert json to dict

    def run_detection(self, image_path: str, conf: float = 0.5) -> dict:
        """
        Detect objects, enrich with reuse tips, and return annotated image + metadata.
        """
        # Step 1: Run YOLO
        detections = self.detector.detect_objects(image_path, conf=conf)

        # Step 2: Attach reuse tips
        for d in detections:
            cls = d["class_name"]
            d["reuse_tip"] = self.reuse_mapping.get(cls, "No tip available")

        # Step 3: Annotate image
        annotated_img = self.detector.annotate_image(image_path, detections)

        # Step 4: Convert annotated image to base64 (for JSON return)
        _, buffer = cv2.imencode(".jpg", cv2.cvtColor(annotated_img, cv2.COLOR_RGB2BGR))
        img_base64 = base64.b64encode(buffer).decode("utf-8")

        return {
            "detections": detections,
            "annotated_image": img_base64
        }
