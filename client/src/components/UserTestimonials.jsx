//Author - Pratham Khare
import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    rating: 5,
    feedback: 'EcoVision has completely transformed how I approach recycling! The AI detection is incredibly accurate, and I love seeing my carbon footprint reduction in real-time.',
    avatar: '👩🏻‍💼',
  },
  {
    id: 2,
    name: 'Mark Chen',
    location: 'Seattle, WA',
    rating: 5,
    feedback: 'As a family, we\'ve learned so much about proper recycling through this app. The tips are practical and easy to follow. Highly recommend!',
    avatar: '👨🏻‍🔧',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Austin, TX',
    rating: 4,
    feedback: 'The photo recognition feature is amazing! I never knew some items could be recycled differently. This app has made me much more environmentally conscious.',
    avatar: '👩🏽‍🎓',
  },
  {
    id: 4,
    name: 'David Park',
    location: 'Portland, OR',
    rating: 5,
    feedback: 'Great tool for our office sustainability program. The carbon footprint tracking helps us measure our environmental impact effectively.',
    avatar: '👨🏻‍💻',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    location: 'Denver, CO',
    rating: 5,
    feedback: 'I love how user-friendly this is. Even my kids can use it to learn about recycling. It\'s educational and fun!',
    avatar: '👩🏼‍🏫',
  },
];

const UserTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users making a difference for our planet
          </p>
        </div>

        <div className="relative">
          <Card className="shadow-medium border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center">
                {/* Avatar */}
                <div className="text-6xl mb-4">
                  {currentTestimonial.avatar}
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < currentTestimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>

                {/* Feedback */}
                <blockquote className="text-lg sm:text-xl text-foreground mb-6 italic leading-relaxed">
                  "{currentTestimonial.feedback}"
                </blockquote>

                {/* User Info */}
                <div className="text-center">
                  <p className="font-semibold text-foreground text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-muted-foreground">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex
                      ? 'bg-[hsl(var(--primary))]' 
                      : 'bg-[hsl(var(--muted-foreground)/0.3)]'
                    }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;