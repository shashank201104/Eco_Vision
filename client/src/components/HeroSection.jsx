//Author - Pratham Khare
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import { Button } from "./ui/Button";
import heroBg1 from "../assets/hero-bg-1.jpg";
import heroBg2 from "../assets/hero-bg-2.jpg";
import heroBg3 from "../assets/hero-bg-3.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Step 1

const ImagePopup = ({ imageBase64, onClose }) => {
  if (!imageBase64) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt="Annotated"
          className="w-full h-auto rounded-md"
        />
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false); // Step 2
  const [popupImage, setPopupImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false); // Step 3

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleShowPopup = (data) => {
    if (data?.AnnotatedImage) {
      setPopupImage(data.AnnotatedImage);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setUploading(true);
      handleUpload(selected);
    }
  };

  const handleUpload = async (fileToUpload) => {
    if (!fileToUpload) return toast.error("Please select a file first");

    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      const res = await axios.post(
        `${
          import.meta.env.MODE === "development"
            ? "http://localhost:5000"
            : import.meta.env.VITE_BACKEND_URL
        }/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("File uploaded successfully!");
      handleShowPopup(res.data);

    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // OPEN CAMERA
  const startCamera = async () => {
    setCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      toast.error("Unable to access camera");
    }
  };

  // STOP CAMERA
  const stopCamera = () => {
    setCameraOpen(false);

    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };

  // CAPTURE PHOTO
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], "camera.jpg", { type: "image/jpeg" });
      setUploading(true);
      handleUpload(file);
    });

    stopCamera();
  };

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const backgrounds = [heroBg1, heroBg2, heroBg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <Toaster position="top-right" />

      {/* Step 2: Upload Loader */}
      {uploading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
          <div className="w-12 h-12 border-4 border-white border-t-green-500 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg font-semibold">Uploading...</p>
        </div>
      )}

      {/* BACKGROUNDS */}
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          className={`absolute inset-0 hero-bg-hero transition-opacity duration-1000 ${
            i === currentBgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* MAIN CONTENT */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
          Transform Your
          <span className="block">Recycling Journey</span>
        </h1>

        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          AI-powered detection to identify recyclable items, calculate carbon footprint,
          and provide personalized recycling tips.
        </p>

        {/* BUTTONS (FILE 1 STYLE) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          {/* Choose Photo Button */}
          <div className="w-full sm:w-auto">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="ecoFileInput"
            />

            <label
              htmlFor="ecoFileInput"
              className="cursor-pointer px-8 py-3 rounded-full 
                bg-gradient-to-r from-green-500 to-green-600
                text-white font-semibold text-lg shadow-md hover:shadow-xl
                transition-all duration-300 flex items-center gap-2"
            >
              <Camera className="h-5 w-5 text-white" />
              Choose Photo
            </label>
          </div>

          {/* Take Photo Button */}
          <button
            onClick={startCamera}
            className="w-full sm:w-auto px-8 py-3 rounded-full 
              bg-white text-green-600 font-semibold text-lg
              shadow-md hover:shadow-xl border border-green-400
              transition-all duration-300 flex items-center gap-2"
          >
            <Camera className="h-5 w-5" />
            Take Photo
          </button>
        </div>

        {popupImage && (
          <ImagePopup
            imageBase64={popupImage}
            onClose={() => setPopupImage(null)}
          />
        )}
      </div>

      {/* CAMERA POPUP */}
      {cameraOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-[350px] h-auto rounded-md"
            ></video>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={capturePhoto}
                className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700"
              >
                Capture
              </button>

              <button
                onClick={stopCamera}
                className="px-6 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default HeroSection;
