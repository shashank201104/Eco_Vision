//Author - Pratham Khare


import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Card, CardContent} from "./ui/Card.jsx"
import categoryPlastic from "../assets/categoryPlastic.jpg"
import categoryCans from "../assets/categoryCans.jpg"
import categoryBottles from "../assets/categoryBottles.jpg"
import categoryPaper from "../assets/categoryPaper.jpg"
import categoryElectronics from "../assets/categoryElectronics.jpg"

const categories = [
  {
    id: 'paper',
    name: 'Paper',
    image: categoryPaper,
    description: 'Newspapers, cardboard, magazines',
    carbonSaving: '1.5 kg CO₂',
  },

  {
    id: 'metal',
    name: 'Metal',
    image: categoryCans,
    description: 'Cans, aluminum, steel',
    carbonSaving: '3.2 kg CO₂',
  },
  
  {
    id: 'glass',
    name: 'Glass',
    image: categoryBottles,
    description: 'Bottles, jars, containers',
    carbonSaving: '1.8 kg CO₂',
  },

  {
    id: 'plastic',
    name: 'Plastic',
    image: categoryPlastic,
    description: 'Bottles, containers, packaging',
    carbonSaving: '2.5 kg CO₂',
  },

  {
    id: 'electronics',
    name: 'Electronics',
    image: categoryElectronics,
    description: 'Phones, computers, components',
    carbonSaving: '15.0 kg CO₂',
  },
];

const PopularCategories = () => {
  const navigate = useNavigate();

  // Handles click on a category card and routes to its category details page
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  }

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 bg-background'>
      <div className='container mx-auto max-w-7xl'>

        {/* Section Title and Subtitle */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
            Popular Recycling Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore different types of recyclable materials and learn how to make a positive impact on the environment
          </p>
        </div>

        {/* Category Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            // Each category card is clickable and navigates to detail page
            <Card 
              key={category.id} 
              className="group cursor-pointer hover-lift border-0 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden bg-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-0 relative h-64">
                {/* Category Image */}
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold mb-1 drop-shadow-lg">{category.name}</h3>
                    <p className="text-sm text-white/90 mb-2 drop-shadow-md">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-eco-green px-2 py-1 rounded-full">
                        {category.carbonSaving} saved
                      </span>
                    </div>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularCategories