// Author - Pratham Khare
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/Card.jsx";
import { Button } from "./ui/Button.jsx";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";

const ROTATE_INTERVAL = 4000; // 4 seconds auto rotate

const UserTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --------------------------
  // Fetch testimonials from API
  // --------------------------
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axiosInstance.get("/feedback");
        setTestimonials(res.data);
      } catch (err) {
        console.error("Failed to load testimonials", err);
      }
    };

    fetchTestimonials();

    // Optional: auto-refresh every 15 sec to check for new feedback
    const refreshInterval = setInterval(fetchTestimonials, 15000);

    return () => clearInterval(refreshInterval);
  }, []);

  // --------------------------
  // Auto rotate every 4 seconds
  // --------------------------
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [testimonials]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Move to previous testimonial (wraps around)
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0)
    return (
      <p className="text-center py-10 text-muted-foreground">
        Loading testimonials...
      </p>
    );

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-4xl">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users making a difference for our planet
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <Card className="shadow-medium border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center">

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < (current.rating || 5)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Feedback */}
                <blockquote className="text-lg sm:text-xl text-foreground mb-6 italic leading-relaxed">
                  "{current.feedback}"
                </blockquote>

                {/* User Info */}
                <div>
                  <p className="font-semibold text-foreground text-lg">
                    {current.name}
                  </p>
                  <p className="text-muted-foreground">
                    {current.location || ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-[hsl(var(--primary))]"
                      : "bg-[hsl(var(--muted-foreground)/0.3)]"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
