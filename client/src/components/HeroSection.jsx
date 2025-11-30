//Author - Pratham Khare, Manish Aggarwal

import React from "react";
import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import heroBg1 from "../assets/hero-bg-1.jpg";
import heroBg2 from "../assets/hero-bg-2.jpg";
import heroBg3 from "../assets/hero-bg-3.jpg";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";

// ⭐ preexisting toast library
import toast, { Toaster } from "react-hot-toast";

// POPUP TO SHOW THE RETURNED ANNOTATED IMAGE
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
  // States
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  const fileInputRef = useRef(null);
  const { authUser } = useAuthStore();

  // CAMERA STATES
  const videoRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  // Show YOLO image
  const handleShowPopup = (data) => {
    if (data && data.AnnotatedImage) {
      setPopupImage(data.AnnotatedImage);
    }
  };

  // File select
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setUploading(true);
      handleUpload(selected);
    }
  };

  // Upload logic
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
      console.error("Upload error:", err);
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Start camera
  const startCamera = async () => {
    setCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast.error("Could not access camera");
      console.error(error);
    }
  };

  // Stop camera
  const stopCamera = () => {
    setCameraOpen(false);

    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };

  // Capture → upload
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], "camera.jpg", { type: "image/jpeg" });

      handleUpload(file);
    }, "image/jpeg");

    stopCamera();
  };

  // Background slider
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const backgrounds = [heroBg1, heroBg2, heroBg3];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ⭐ Pre-existing Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background images */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 hero-bg-hero transition-opacity duration-1000 ${
            index === currentBgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* HERO CONTENT */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block text-white-500 bg-clip-text">
              Recycling Journey
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered detection to identify recyclable items...
          </p>

          {/* Show Upload buttons only when logged in */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            {authUser && (
              <>
                {/* Choose Photo */}
                <div
                  className="w-full sm:w-auto animate-scale-in"
                  style={{ animationDelay: "0.2s" }}
                >
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

                {/* Take Photo */}
                <button
                  onClick={startCamera}
                  className="w-full sm:w-auto animate-scale-in px-8 py-3 rounded-full 
                    bg-white text-green-600 font-semibold text-lg
                    shadow-md hover:shadow-xl border border-green-400
                    transition-all duration-300 flex items-center gap-2"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Camera className="h-5 w-5" />
                  Take Photo
                </button>
              </>
            )}

            {/* Annotated Image Popup */}
            {popupImage && (
              <ImagePopup
                imageBase64={popupImage}
                onClose={() => setPopupImage(null)}
              />
            )}

          </div>
        </div>
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
