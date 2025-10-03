//Author - Pratham Khare
import React, { useState } from 'react';
import { Button } from './ui/Button.jsx';
import { Input } from './ui/Input.jsx';
import { Textarea } from './ui/TextArea.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card.jsx';
import { Label } from './ui/Label.jsx';
import { useToast } from '../hooks/use-toast.js';
import { Send } from 'lucide-react';

const FeedbackForm = () => {

  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !feedback.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and feedback are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    //Simulate Api Call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      //send to backend
      console.log('Feedback Submitted', { name, feedback });

      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback has been submitted successfully.",
        variant: "default",
      });

      //Reset Form
      setName('');
      setFeedback('');
    }

    catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Share Your Feedback
          </h2>
          <p className="text-lg text-muted-foreground">
            Help us improve EcoVision and make it even better for the community
          </p>
        </div>

        <Card className="shadow-medium border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-center text-xl text-foreground">
              We'd love to hear from you
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Your Name</Label>
                <Input id="name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="border-border focus:border-primary transition-colors" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-foreground font-medium">
                  Your Feedback
                </Label>
                <Textarea id="feedback" placeholder="Tell us about your experience with EcoVision..." value={feedback} onChange={(e) => setFeedback(e.target.value)} className="border-border focus:border-primary transition-colors min-h-[120px] resize-none" required />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full" variant="eco" size="lg">
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Submit Feedback</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default FeedbackForm