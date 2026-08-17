//Author - Pratham Khare, Manish Aggarwal, Shashank

import React from "react";
import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import heroBg1 from "../assets/hero-bg-1.jpg";
import heroBg2 from "../assets/hero-bg-2.jpg";
import heroBg3 from "../assets/hero-bg-3.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// ⭐ RESPONSIVE POPUP: image + mobile-friendly results list
const ImagePopup = ({ imageBase64, itemData, onClose }) => {
  if (!imageBase64) return null;

  const getConfidenceColor = (percent) => {
    if (percent >= 80) return "text-green-600 font-semibold";
    if (percent >= 50) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close */}
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-green-700">Detected Items</h2>
          <button
            aria-label="Close"
            className="ml-3 inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Responsive layout: image left on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image */}
          <div className="rounded-md bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200 p-2">
            <img
              src={`data:image/jpeg;base64,${imageBase64}`}
              alt="Annotated"
              className="w-full h-auto object-contain max-h-[60vh]"
            />
          </div>

          {/* Results */}
          <div className="space-y-3">
            {/* For larger screens show a compact table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-2 border-b text-left">Name</th>
                    <th className="p-2 border-b">Carbon</th>
                    <th className="p-2 border-b">Confidence</th>
                    <th className="p-2 border-b">Shelf</th>
                    <th className="p-2 border-b">Tips</th>
                  </tr>
                </thead>
                <tbody>
                  {itemData?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-red-600 font-semibold">
                        No items detected
                      </td>
                    </tr>
                  ) : (
                    itemData?.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 align-top">
                        <td className="p-2 font-medium capitalize">{item.name}</td>
                        <td className="p-2">{item.carbon_Footprint}</td>
                        <td className={`p-2 ${getConfidenceColor(item.confidence.percent)}`}>
                          {item.confidence.percent.toFixed(1)}%
                        </td>
                        <td className="p-2">{item.shelf_Life}</td>
                        <td className="p-2 max-w-[200px] whitespace-normal">{item.recycle_Tips}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile-friendly cards */}
            <div className="md:hidden grid grid-cols-1 gap-3">
              {itemData?.length === 0 ? (
                <div className="p-4 rounded-md border border-gray-200 text-center text-red-600 font-semibold">No items detected</div>
              ) : (
                itemData?.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-md font-semibold capitalize">{item.name}</div>
                      <div className={`text-sm ${getConfidenceColor(item.confidence.percent)}`}>{item.confidence.percent.toFixed(1)}%</div>
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                      <div><span className="font-medium">Carbon:</span> {item.carbon_Footprint}</div>
                      <div><span className="font-medium">Shelf life:</span> {item.shelf_Life}</div>
                    </div>

                    <div className="text-sm text-gray-700"><span className="font-medium">Recycle tips:</span> {item.recycle_Tips}</div>
                  </div>
                ))
              )}
            </div>

            {/* Action buttons (full width on mobile) */}
            <div className="mt-2 flex flex-col sm:flex-row gap-3">
              <button
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                onClick={() => {
                  // allow user to download the annotated image
                  const a = document.createElement('a');
                  a.href = `data:image/jpeg;base64,${imageBase64}`;
                  a.download = 'annotated.jpg';
                  a.click();
                }}
              >
                Download Image
              </button>

              <button
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [uploading, setUploading] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // 🟢 Set popup data
  const handleShowPopup = (data) => {
    setPopupImage(data.AnnotatedImage);
    setItemData(data.itemData || []);
  };

  // 🟢 File change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      handleUpload(file);
    }
  };

  // 🟢 Upload logic (unchanged)
  const handleUpload = async (file) => {
    if (!file) return toast.error("Please select a file first");

    const formData = new FormData();
    formData.append("file", file);

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

      handleShowPopup(res.data);
      toast.success("File uploaded successfully!");
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 🟢 Camera start
  const startCamera = async () => {
    setCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch {
      toast.error("Camera access denied");
    }
  };

  // 🟢 Camera stop
  const stopCamera = () => {
    setCameraOpen(false);
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((t) => t.stop());
  };

  // 🟢 Capture from camera
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], "camera.jpg", { type: "image/jpeg" });
      setUploading(true);
      handleUpload(file);
    });

    stopCamera();
  };

  // 🟢 Background slideshow
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
      <Toaster position="top-right" />

      {/* Loader */}
      {uploading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
          <div className="w-14 h-14 border-4 border-white border-t-green-500 rounded-full animate-spin"></div>
          <p className="text-white mt-5 text-xl font-semibold">Uploading...</p>
        </div>
      )}

      {/* Background */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 hero-bg-hero transition-opacity duration-1000 ${
            index === currentBgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Transform Your
          <span className="block text-green-200">Recycling Journey</span>
        </h1>

        <p className="text-base sm:text-lg text-white/90 mt-6 mb-10">
          AI-powered detection to identify recyclable items, calculate carbon
          footprint, and provide personalized recycling tips.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          {/* Choose Photo */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              id="ecoFileInput"
              onChange={handleFileChange}
            />

            <label
              htmlFor="ecoFileInput"
              className="cursor-pointer px-10 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600
              text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex gap-2 items-center"
            >
              <Camera className="h-5 w-5" />
              Choose Photo
            </label>
          </div>

          {/* Take Photo */}
          <button
            onClick={startCamera}
            className="px-10 py-3 rounded-full bg-white text-green-600 font-semibold text-lg
            shadow-lg border border-green-400 hover:shadow-2xl transition-all flex gap-2 items-center"
          >
            <Camera className="h-5 w-5" />
            Take Photo
          </button>
        </div>
      </div>

      {/* Camera Popup */}
      {cameraOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/95 rounded-2xl p-5 shadow-xl border border-gray-200 animate-scaleIn">
            <video
              ref={videoRef}
              autoPlay
              playsInline
                          className="w-full max-w-[360px] rounded-xl shadow-md"
            ></video>

            <div className="flex justify-center gap-5 mt-5">
              <button
                onClick={capturePhoto}
                className="px-7 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
              >
                Capture
              </button>

              <button
                onClick={stopCamera}
                className="px-7 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Popup */}
      {popupImage && (
        <ImagePopup
          imageBase64={popupImage}
          itemData={itemData}
          onClose={() => setPopupImage(null)}
        />
      )}
    </section>
  );
};

export default HeroSection;
