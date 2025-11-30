//Author - Pratham Khare


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { ArrowLeft, Recycle, TrendingDown, Lightbulb } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import categoryPlastic from '../assets/categoryPlastic.jpg';
import categoryGlass from '../assets/categoryBottles.jpg';
import categoryMetal from '../assets/categoryCans.jpg';
import categoryPaper from '../assets/categoryPaper.jpg';
import categoryElectronics from '../assets/categoryElectronics.jpg';

const categoryData = {
  plastic: {
    name: 'Plastic Recycling',
    image: categoryPlastic,
    description: 'Learn how to properly recycle plastic materials and reduce plastic waste in your daily life.',
    carbonFootprint: '2.5 kg CO₂ saved per item',
    recyclingRate: '8.5%',
    tips: [
      'Clean containers before recycling to remove food residue',
      'Check recycling codes - numbers 1, 2, and 5 are most commonly accepted',
      'Remove caps and lids as they may be made from different plastic types',
      'Avoid putting plastic bags in curbside bins - take them to store drop-off points',
      'Look for products with minimal plastic packaging when shopping'
    ],
    impact: 'Recycling one plastic bottle saves enough energy to power a 60W light bulb for 3 hours.',
    facts: [
      'It takes 450-1000 years for plastic to decompose in landfills',
      'Only 9% of all plastic ever produced has been recycled',
      'Recycling plastic uses 88% less energy than making new plastic'
    ]
  },
  glass: {
    name: 'Glass Recycling',
    image: categoryGlass,
    description: 'Discover the benefits of glass recycling and how to maximize the environmental impact.',
    carbonFootprint: '1.8 kg CO₂ saved per item',
    recyclingRate: '33%',
    tips: [
      'Separate glass by color when possible (clear, brown, green)',
      'Remove metal caps and plastic labels before recycling',
      'Rinse containers to remove food and beverage residue',
      'Never include broken window glass or mirrors - these require special handling',
      'Consider reusing glass jars for storage before recycling'
    ],
    impact: 'Glass can be recycled indefinitely without losing quality or purity.',
    facts: [
      'Recycling glass uses 40% less energy than making new glass',
      'One recycled glass bottle saves enough energy to power a computer for 25 minutes',
      'Glass is 100% recyclable and can be recycled endlessly'
    ]
  },
  metal: {
    name: 'Metal Recycling',
    image: categoryMetal,
    description: 'Learn about aluminum and steel recycling to maximize resource conservation.',
    carbonFootprint: '3.2 kg CO₂ saved per item',
    recyclingRate: '68%',
    tips: [
      'Aluminum cans are infinitely recyclable - always recycle them',
      'Steel cans (food cans) can be recycled with labels still on',
      'Remove plastic caps from aluminum bottles before recycling',
      'Crush cans to save space but check local guidelines first',
      'Look for the magnet test - if it sticks, it\'s steel; if not, it\'s aluminum'
    ],
    impact: 'Recycling aluminum uses 95% less energy than producing new aluminum from raw materials.',
    facts: [
      'A recycled aluminum can is back on the shelf as a new can in just 60 days',
      'Americans throw away enough aluminum to rebuild the entire commercial fleet every 3 months',
      'Steel is the most recycled material in the world'
    ]
  },
  paper: {
    name: 'Paper Recycling',
    image: categoryPaper,
    description: 'Understand paper recycling processes and how to prepare materials correctly.',
    carbonFootprint: '1.5 kg CO₂ saved per item',
    recyclingRate: '65%',
    tips: [
      'Remove tape, staples, and plastic windows from envelopes',
      'Keep paper dry - wet paper can\'t be recycled effectively',
      'Separate cardboard from mixed paper for better processing',
      'Don\'t include wax-coated paper, carbon paper, or laminated materials',
      'Shred sensitive documents but keep shreds contained in clear bags'
    ],
    impact: 'Recycling paper reduces methane emissions from landfills and preserves forest resources.',
    facts: [
      'Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and 3.3 cubic yards of landfill space',
      'Paper can be recycled 5-7 times before fibers become too short',
      'Using recycled paper reduces air pollution by 95%'
    ]
  },
  electronics: {
    name: 'Electronics Recycling',
    image: categoryElectronics,
    description: 'Safely dispose of electronic waste and recover valuable materials.',
    carbonFootprint: '15.0 kg CO₂ saved per item',
    recyclingRate: '25%',
    tips: [
      'Never throw electronics in regular trash - they contain toxic materials',
      'Wipe personal data from devices before recycling',
      'Find certified e-waste recyclers in your area',
      'Consider donating working electronics to extend their life',
      'Remove batteries separately as they require special handling'
    ],
    impact: 'E-waste contains valuable metals like gold, silver, and copper that can be recovered and reused.',
    facts: [
      'One smartphone contains more than 40 elements from the periodic table',
      'E-waste is the fastest-growing waste stream globally',
      'Recycling 1 million laptops saves enough energy to power 3,500 homes for a year'
    ]
  }
};

const CategoryDetail = () => {

  //Retrieves the dynamic categoryId parameter from the URL.
  const { categoryId } = useParams();

  // Match the categoryId with data object
  const category = categoryId ? categoryData[categoryId] : null;

  const handleAuthClick = () => {
    navigate('/login');
  };

  
  //If the category doesn't exist, show a fallback "Category not found" page
  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header onAuthClick={handleAuthClick} />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category not found</h1>
          <Link to="/">
            <Button variant="outline" >Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAuthClick={handleAuthClick} />

      {/*/Category Main Information Section*/}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center transition-transform transform hover:-translate-y-1 hover:scale-105 hover:bg-eco-green/10 hover:text-eco-green shadow-md hover:shadow-lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                {category.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {category.description}
              </p>

              {/* Quick Stats: Carbon Footprint + Recycling Rate */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="text-center p-4">
                  <CardContent className="p-0">
                    <TrendingDown className="h-8 w-8 text-eco-green mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Carbon Saved</p>
                    <p className="font-semibold text-foreground">{category.carbonFootprint}</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-4">
                  <CardContent className="p-0">
                    <Recycle className="h-8 w-8 text-eco-water mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Recycling Rate</p>
                    <p className="font-semibold text-foreground">{category.recyclingRate}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Category Image */}
            <div>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-96 object-cover rounded-xl shadow-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recycling Tips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-medium border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Lightbulb className="h-6 w-6 text-eco-green" />
                <span>Recycling Tips</span>
              </CardTitle>
            </CardHeader>

             {/* Tips List */}
            <CardContent>
              <ul className="space-y-4">
                {category.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-eco-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{tip}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environmental Impact Section*/}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Environmental Impact
          </h2>

          {/* Highlighted Impact Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-medium border-0 bg-eco-green text-black">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-4">Did You Know?</h3>
                <p className="text-black/90">{category.impact}</p>
              </CardContent>
            </Card>

            {/* Interesting Facts List */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle>Key Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.facts.map((fact, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-eco-green font-bold">•</span>
                      <span className="text-muted-foreground text-sm">{fact}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

       {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryDetail;