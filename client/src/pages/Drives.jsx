//Author - Pratham Khare
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import categoryPlastic from '../assets/categoryPlastic.jpg';
import categoryElectronics from '../assets/categoryElectronics.jpg';
import categoryPaper from '../assets/categoryPaper.jpg';
import categoryGlass from '../assets/categoryBottles.jpg';
import categoryMetal from '../assets/categoryCans.jpg';

const drives = [
  {
    id: 1,
    title: 'E-Waste Recycling Drive',
    description: 'Join us in collecting e-waste to promote sustainable disposal and protect the environment.',
    image: categoryElectronics,
    date: 'Nov 12, 2025',
    time: '9 AM - 5 PM',
    location: 'Eco Park, Sector 21, Noida',
    organizer: 'GreenEarth NGO',
    categories: ['Electronics'],
    status: 'Offline',
    applicants: 28,
  },
  {
    id: 2,
    title: 'Clean Streets Plastic Collection',
    description: 'Community plastic recycling to reduce landfill waste and keep our streets clean.',
    image: categoryPlastic,
    date: 'Nov 15, 2025',
    time: '8 AM - 2 PM',
    location: 'Central Park, Mumbai',
    organizer: 'Clean India Foundation',
    categories: ['Plastic'],
    status: 'Offline',
    applicants: 45,
  },
  {
    id: 3,
    title: 'Paper Recycling Campaign',
    description: 'Help us collect newspapers, cardboard, and magazines for recycling into new products.',
    image: categoryPaper,
    date: 'Nov 18, 2025',
    time: '10 AM - 4 PM',
    location: 'City Library, Bangalore',
    organizer: 'EcoWarriors India',
    categories: ['Paper'],
    status: 'Offline',
    applicants: 32,
  },
  {
    id: 4,
    title: 'Glass Bottle Collection Drive',
    description: 'Bring your glass bottles and jars for proper recycling and reuse initiatives.',
    image: categoryGlass,
    date: 'Nov 20, 2025',
    time: '9 AM - 3 PM',
    location: 'Green Square, Pune',
    organizer: 'SaveEarth Organization',
    categories: ['Glass'],
    status: 'Offline',
    applicants: 18,
  },
  {
    id: 5,
    title: 'Metal Scrap Collection',
    description: 'Collection of aluminum cans, steel items, and other metal waste for recycling.',
    image: categoryMetal,
    date: 'Nov 22, 2025',
    time: '7 AM - 1 PM',
    location: 'Industrial Area, Chennai',
    organizer: 'MetalRecycle India',
    categories: ['Metal'],
    status: 'Offline',
    applicants: 25,
  },
  {
    id: 6,
    title: 'Multi-Material Recycling Fair',
    description: 'Comprehensive recycling event accepting all types of recyclable materials.',
    image: categoryPlastic,
    date: 'Nov 25, 2025',
    time: '8 AM - 6 PM',
    location: 'City Stadium, Delhi',
    organizer: 'United Green Initiative',
    categories: ['Plastic', 'Electronics', 'Paper'],
    status: 'Offline',
    applicants: 67,
  },
];

const categoryColors = {
  Plastic: 'bg-eco-green',
  Electronics: 'bg-eco-blue',
  Paper: 'bg-eco-earth',
  Glass: 'bg-eco-water',
  Metal: 'bg-muted',
};

const allCategories = ['All', 'Plastic', 'Electronics', 'Paper', 'Glass', 'Metal'];

const Drives = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Added state for popup
  const [showComingSoon, setShowComingSoon] = useState(false);

  const filteredDrives = selectedCategory === 'All' 
    ? drives 
    : drives.filter(drive => drive.categories.includes(selectedCategory));

  const handleDriveClick = (driveId) => {
    navigate(`/drive/${driveId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 animate-fade-in">
                Explore Recycling Drives
              </h1>

              {/*Add Drive Button*/}
              <button
                onClick={() => setShowComingSoon(true)}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
              >
                Add Drive
              </button>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-3 justify-center">
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Drives Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrives.map((drive, index) => (
                <Card 
                  key={drive.id}
                  className="group cursor-pointer hover-lift border-0 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden bg-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleDriveClick(drive.id)}
                >
                  <CardContent className="p-0">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={drive.image} 
                        alt={drive.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant="secondary" className="bg-background/90 text-foreground">
                          {drive.status}
                        </Badge>
                      </div>

                      {/* Category Tags */}
                      <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                        {drive.categories.map((cat) => (
                          <Badge 
                            key={cat}
                            className={`${categoryColors[cat] || 'bg-muted'} text-white`}
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {drive.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-3">
                        Organized by <span className="font-semibold text-foreground">{drive.organizer}</span>
                      </p>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {drive.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2 text-primary" />
                          <span>{drive.date}</span>
                          <Clock className="w-4 h-4 ml-4 mr-2 text-primary" />
                          <span>{drive.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          <span className="line-clamp-1">{drive.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-2 text-primary" />
                          <span>{drive.applicants} Applied</span>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDrives.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No drives found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* COMING SOON POPUP */}
        {showComingSoon && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowComingSoon(false)}
          >
            <div
              className="bg-white rounded-xl shadow-xl p-8 w-80 text-center animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-foreground mb-3">Coming Soon!</h2>
              <Button onClick={() => setShowComingSoon(false)} className="w-full">
                Close
              </Button>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Drives;
