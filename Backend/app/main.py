# Author: SHIVANSH GUPTA
# Detail explanation of code is in ML Notebook/notebook.ipynb if anyone want to understand stuff

from pathlib import Path
import base64
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cv2
import os
from app.services.detection_service import DetectionService
import tempfile

# -----------------------------
# Initialize FastAPI app
# -----------------------------
app = FastAPI(title="Reusable Item Detector API")

# Configure allowed origins for CORS
allowed_origins = (
    [origin.strip() for origin in (os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","))]
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# -----------------------------
# Initialize service layers
# -----------------------------
detection_service = DetectionService()

# -----------------------------
# Health check endpoint
# -----------------------------
@app.get("/health")
async def health():
    """
    Simple health check endpoint.
    """
    return {"status": "healthy"}

# -----------------------------
# Detection endpoint
# -----------------------------
@app.post("/detect")
async def detect(file: UploadFile = File(...), confidence: float = Form(0.5)):
    """
        Upload an image, run detection and return JSON
        response with detections and annotated image.
    """
    print("/detect called")

    try:

        # Validate uploaded file
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Uploaded file must be an image")

        #  Save uploaded file temporarily using tempfile
        temp_dir = Path(tempfile.gettempdir())
        temp_path = temp_dir / f"tmp_{file.filename}"
        print(f"Saving file to: {temp_path}")

        with temp_path.open("wb") as f:
            f.write(await file.read())

        print("File saved. Running detection...")

        # Run detection
        result = detection_service.run_detection(str(temp_path), confidence)

        # Convert annotated image to base64
        annotated_b64 = None
        if result.get("annotated_image") is not None:
            print("Converting annotated image...")
            bgr_img = cv2.cvtColor(result["annotated_image"], cv2.COLOR_RGB2BGR)
            _, buf = cv2.imencode(".jpg", bgr_img)
            annotated_b64 = base64.b64encode(buf).decode("utf-8")

        # Build response
        resp = {
            "success": True,
            "detections": result.get("detections", []),
            "annotated_image": annotated_b64,
            "total_items": result.get("total_items", 0)  #defaults to 0 if key is missing.
        }

        return JSONResponse(content=resp)


    except Exception as e:
        print("ERROR in /detect:", e)
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error in /detect: {e}")


    finally:
        if "temp_path" in locals() and temp_path.exists():
            print(f"Cleaning up {temp_path}")
            temp_path.unlink()
