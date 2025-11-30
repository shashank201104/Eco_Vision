//Author - Pratham Khare
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Camera, Divide, Upload } from "lucide-react";
import { Button } from "./ui/Button";
import heroBg1 from "../assets/hero-bg-1.jpg";
import heroBg2 from "../assets/hero-bg-2.jpg";
import heroBg3 from "../assets/hero-bg-3.jpg";
import axios from "axios";

const ImagePopup = ({ imageBase64, onClose }) => {
  if (!imageBase64) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // close when clicking outside
    >
      <div
        className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full p-4"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking on modal
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

const HeroSection = ({ onUploadClick, onCameraClick }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  const fileInputRef = useRef(null);

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

  const handleUpload = async (fileToUpload) => {
    if (!fileToUpload) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      const res = await axios.post(`${import.meta.env.MODE==="development"?"http://localhost:5000":import.meta.env.VITE_BACKEND_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      handleShowPopup(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 hero-bg-hero transition-opacity duration-1000 ${
            index === currentBgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/*Content*/}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block text-white-500 bg-clip-text">
              Recycling Journey
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered detection to identify recyclable items, calculate carbon
            footprint, and provide personalized recycling tips for a sustainable
            future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="xl"
              // onClick={onUploadClick}
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

            <Button
              variant="hero"
              size="xl"
              onClick={onCameraClick}
              className="w-full sm:w-auto animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Camera className="h-6 w-6" />
              Take Photo
            </Button>
            {popupImage && (
              <ImagePopup
                imageBase64={popupImage}
                onClose={() => {
                  setPopupImage(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
