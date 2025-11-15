import React from 'react'
import { useToast } from "../hooks/use-toast.js"
import Header from "../components/Header.jsx"
import HeroSection from '../components/HeroSection.jsx'
import PopularCategories from '../components/PopularCategories.jsx'
import UserTestimonials from '../components/UserTestimonials.jsx'
import Footer from '../components/Footer.jsx'
import FeedbackForm from '../components/FeedbackForm.jsx'
import { ToastContainer } from '../hooks/ToastContainer.jsx'

const Index = () => {
  const { toast } = useToast();

  const handleAuthClick = () => {
    toast({
      title: "Authentication coming soon!",
      description:
        "Login and registration functionality will be available soon...",
      variant: "default",
    });
  };

  const handleUploadClick = () => {
    console.log("rfdceds");

    toast({
      title: "Upload feature coming soon!",
      description: "Photo upload functionality will be available soon...",
      variant: "default",
    });
  };

  const handleCameraClick = () => {
    toast({
      title: "Camera feature coming soon!",
      description: "Camera capture functionality will be available soon...",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Header onAuthClick={handleAuthClick} /> */}

      <main>
        <HeroSection
          onUploadClick={handleUploadClick}
          onCameraClick={handleCameraClick}
        />

        <div id="categories">
          <PopularCategories />
        </div>

        <div id="testimonials">
          <UserTestimonials />
        </div>

        <div id="feedback">
          <FeedbackForm />
          <ToastContainer/>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Index;
