//Author - Pratham Khare
import React from 'react'
import { useState, useEffect } from 'react'
import { Camera, Divide, Upload } from 'lucide-react'
import { Button } from './ui/Button'
import heroBg1 from "../assets/hero-bg-1.jpg"
import heroBg2 from "../assets/hero-bg-2.jpg"
import heroBg3 from "../assets/hero-bg-3.jpg"

const HeroSection = ({ onUploadClick, onCameraClick }) => {

  // Index to track which background image is currently displayed
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

   // Array of slideshow images
  const backgrounds = [heroBg1, heroBg2, heroBg3];

  // Switch background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Dynamic background images */}
      {backgrounds.map((bg, index) => (
        <div key={index} className={`absolute inset-0 hero-bg-hero transition-opacity duration-1000 ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${bg})` }} />
      ))}

      {/*Content*/}
      <div className='relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto'>
        <div className='animate-fade-in'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>Transform Your
            <span className='block text-white-500 bg-clip-text'>Recycling Journey</span>
          </h1>

          <p className='text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed'>
            AI-powered detection to identify recyclable items, calculate carbon footprint,
            and provide personalized recycling tips for a sustainable future.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            {/* Upload Image Button */}
            <Button variant="hero" size="xl" onClick={onUploadClick} className="w-full sm:w-auto animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Upload className='h-6 w-6' />
              Upload Photo
            </Button>

            {/* Take Photo with Camera Button */}
            <Button variant="hero" size="xl" onClick={onCameraClick} className="w-full sm:w-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Camera className='h-6 w-6' />
              Take Photo
            </Button>
          </div>
        </div>

        {/* Scroll Indicator
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default HeroSection