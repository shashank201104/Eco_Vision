//Author - Pratham Khare
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import { Button } from "./ui/Button";
import heroBg1 from "../assets/hero-bg-1.jpg";
import heroBg2 from "../assets/hero-bg-2.jpg";
import heroBg3 from "../assets/hero-bg-3.jpg";
import axios from "axios";

// ⭐ Step 1: Toast added
import toast, { Toaster } from "react-hot-toast";

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
  const [uploading, setUploading] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  const fileInputRef = useRef(null);

  // ⭐ Step 3: Camera state
  const videoRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleShowPopup = (data) => {
    if (data && data.AnnotatedImage) {
      setPopupImage(data.AnnotatedImage);
    } else {
      console.warn("No AnnotatedImage found in response");
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

  // ⭐ Step 1: Alerts → Toast
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

  // ⭐ Step 3: Start Camera Stream
  const startCamera = async () => {
    setCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast.error("Unable to access camera");
      console.error(error);
    }
  };

  // ⭐ Step 3: Stop Camera Stream
  const stopCamera = () => {
    setCameraOpen(false);

    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };

  // ⭐ Step 3: Capture Photo
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

      setUploading(true);
      handleUpload(file);
    }, "image/jpeg");

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

      {/* ⭐ Toast Container */}
      <Toaster position="top-right" />

      {/* ⭐ Step 2: Uploading Loader */}
      {uploading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
          <div className="w-12 h-12 border-4 border-white border-t-green-500 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg font-semibold tracking-wide">
            Uploading...
          </p>
        </div>
      )}

      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 hero-bg-hero transition-opacity duration-1000 ${
            index === currentBgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block text-white-500 bg-clip-text">
              Recycling Journey
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered detection to identify recyclable items, calculate carbon footprint,
            and provide personalized recycling tips for a sustainable future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            {/* File Upload */}
            <Button
              variant="hero"
              size="xl"
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
                className="cursor-pointer px-4 py-2 rounded-lg shadow-md
                  text-[hsl(var(--primary-foreground))]
                  bg-[hsl(var(--primary))]
                  hover:bg-[hsl(var(--primary-hover))]
                  transition"
              >
                Choose Photo
              </label>
            </Button>

            {/* ⭐ Step 3: Camera */}
            <Button
              variant="hero"
              size="xl"
              onClick={startCamera}
              className="w-full sm:w-auto animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Camera className="h-6 w-6" />
              Take Photo
            </Button>

            {popupImage && (
              <ImagePopup
                imageBase64={popupImage}
                onClose={() => setPopupImage(null)}
              />
            )}
          </div>
        </div>
      </div>

      {/* ⭐ Step 3: Camera Popup */}
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
