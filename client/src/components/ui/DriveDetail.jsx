//Author - Pratham Khare
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { Separator } from './Separator.jsx';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Building2, Phone, Mail, Eye, CheckCircle, AlertCircle, Recycle, Info } from 'lucide-react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import categoryPlastic from "../../assets/categoryPlastic.jpg";
import categoryElectronics from '../../assets/categoryElectronics.jpg';
import categoryPaper from '../../assets/categoryPaper.jpg';
import categoryGlass from '../../assets/categoryCans.jpg';
import categoryMetal from '../../assets/categoryBottles.jpg';

const drivesData = {
    1: {
        id: 1,
        title: 'E-Waste Recycling Drive',
        description: 'Join us in collecting e-waste to promote sustainable disposal and protect the environment.',
        fullDescription: 'E-Waste Recycling Drive is a comprehensive initiative to collect and properly dispose of electronic waste. This drive aims to prevent harmful materials from entering landfills and promote the recovery of valuable materials. With just a few minutes to prep and participate, this event is all about creating awareness and making a tangible impact on our environment.',
        image: categoryElectronics,
        date: 'Nov 12, 2025',
        time: '9 AM - 5 PM',
        location: 'Eco Park, Sector 21, Noida',
        fullAddress: 'Eco Park, Sector 21, Near City Mall, Noida, Uttar Pradesh, India - 201301',
        organizer: 'GreenEarth NGO',
        organizerLogo: '🌍',
        categories: ['Electronics'],
        status: 'Offline',
        applicants: 28,
        impressions: 9674,
        registrationDeadline: 'Nov 10, 2025, 11:30 PM IST',
        updatedOn: 'Oct 28, 2025',
        teamSize: 'Individual Participation',
        eligibility: 'Everyone can apply',
        itemsAccepted: [
            '💻 Old computers and laptops',
            '📱 Mobile phones and tablets',
            '🖨️ Printers and scanners',
            '📺 TVs and monitors',
            '🔌 Cables and chargers',
            '⌨️ Keyboards and mice'
        ],
        itemsNotAccepted: [
            'Batteries (bring to separate collection)',
            'Broken CRT monitors',
            'Items with mercury'
        ],
        impact: 'Each kilogram of recycled electronics saves 2 kg of CO₂ emissions and prevents toxic materials from polluting soil and water.',
        goal: 'Collect 500 kg of e-waste and educate 1000+ people about proper e-waste disposal.',
        rules: [
            'Each participant must carry a valid ID card',
            'Participants must arrive 15 minutes prior for check-in',
            'Items should be cleaned and packed safely',
            'Late entries/walk-ins will not be entertained',
            'Any form of misconduct will result in disqualification'
        ],
        procedure: [
            'Registration: Fill the online form before the deadline',
            'Preparation: Collect and segregate your e-waste items',
            'Drop-off: Bring items to the collection center during event hours',
            'Certificate: Receive participation certificate and eco-points'
        ],
        contact: {
            name: 'Ananya Sharma',
            role: 'Event Coordinator',
            phone: '+91-9876543210',
            email: 'greenearthngo@gmail.com'
        },
        partners: ['EcoTech Solutions', 'City Corporation', 'Green Schools Network'],
        dates: [
            { label: 'Registration Opens', date: 'Oct 20, 2025' },
            { label: 'Registration Deadline', date: 'Nov 10, 2025, 11:30 PM' },
            { label: 'Event Date', date: 'Nov 12, 2025, 9 AM - 5 PM' }
        ]
    },
    2: {
        id: 2,
        title: 'Clean Streets Plastic Collection',
        description: 'Community plastic recycling to reduce landfill waste and keep our streets clean.',
        fullDescription: 'Clean Streets Plastic Collection is a community-driven initiative aimed at reducing plastic pollution in our neighborhoods. This drive focuses on collecting various types of plastic waste and ensuring they are properly recycled, preventing them from clogging drains, polluting water bodies, and harming wildlife.',
        image: categoryPlastic,
        date: 'Nov 15, 2025',
        time: '8 AM - 2 PM',
        location: 'Central Park, Mumbai',
        fullAddress: 'Central Park, Linking Road, Bandra West, Mumbai, Maharashtra, India - 400050',
        organizer: 'Clean India Foundation',
        organizerLogo: '🧹',
        categories: ['Plastic'],
        status: 'Offline',
        applicants: 45,
        impressions: 12450,
        registrationDeadline: 'Nov 13, 2025, 11:59 PM IST',
        updatedOn: 'Oct 28, 2025',
        teamSize: 'Individual or Group (Max 5)',
        eligibility: 'Everyone can apply',
        itemsAccepted: [
            '🍼 Plastic bottles and containers',
            '🛍️ Plastic bags and packaging',
            '🥤 PET bottles and cups',
            '🧴 Shampoo and detergent bottles',
            '🎁 Bubble wrap and foam',
            '🍽️ Food containers and cutlery'
        ],
        itemsNotAccepted: [
            'Contaminated or dirty plastic',
            'Medical waste',
            'Hazardous material containers'
        ],
        impact: 'Each kilogram of recycled plastic saves 2.5 kg of CO₂ emissions and prevents ocean pollution.',
        goal: 'Collect 1000 kg of plastic waste and clean 5 km of streets.',
        rules: [
            'Wear comfortable clothes and gloves',
            'Participants must register before deadline',
            'Clean and dry plastic items before bringing',
            'Minors must be accompanied by adults',
            'Follow COVID-19 safety guidelines'
        ],
        procedure: [
            'Registration: Sign up online or at collection point',
            'Collection: Gather plastic waste from your area',
            'Segregation: Separate by plastic type if possible',
            'Drop-off: Bring to Central Park collection center',
            'Reward: Get participation certificate and green points'
        ],
        contact: {
            name: 'Rajesh Kumar',
            role: 'Drive Manager',
            phone: '+91-9845678901',
            email: 'cleanindia@foundation.org'
        },
        partners: ['Mumbai Municipal Corporation', 'PlasticFree India', 'Local Schools'],
        dates: [
            { label: 'Registration Opens', date: 'Oct 25, 2025' },
            { label: 'Registration Deadline', date: 'Nov 13, 2025, 11:59 PM' },
            { label: 'Event Date', date: 'Nov 15, 2025, 8 AM - 2 PM' }
        ]
    },
    3: {
        id: 3,
        title: 'Paper Recycling Campaign',
        description: 'Help us collect newspapers, cardboard, and magazines for recycling into new products.',
        fullDescription: 'Paper Recycling Campaign is dedicated to collecting used paper materials and converting them into new, usable products. This initiative helps save trees, reduce energy consumption, and minimize landfill waste. Every ton of recycled paper saves 17 trees and 7,000 gallons of water.',
        image: categoryPaper,
        date: 'Nov 18, 2025',
        time: '10 AM - 4 PM',
        location: 'City Library, Bangalore',
        fullAddress: 'City Central Library, MG Road, Bangalore, Karnataka, India - 560001',
        organizer: 'EcoWarriors India',
        organizerLogo: '⚔️',
        categories: ['Paper'],
        status: 'Offline',
        applicants: 32,
        impressions: 8920,
        registrationDeadline: 'Nov 16, 2025, 6:00 PM IST',
        updatedOn: 'Oct 28, 2025',
        teamSize: 'Individual Participation',
        eligibility: 'Everyone can apply',
        itemsAccepted: [
            '📰 Newspapers and magazines',
            '📦 Cardboard boxes',
            '📚 Old books and notebooks',
            '📋 Office paper and documents',
            '📮 Paper bags and wrapping',
            '📧 Envelopes and greeting cards'
        ],
        itemsNotAccepted: [
            'Laminated or waxed paper',
            'Carbon paper',
            'Tissues and paper towels',
            'Pizza boxes with grease stains'
        ],
        impact: 'Recycling 1 ton of paper saves 17 trees, 7,000 gallons of water, and reduces carbon emissions by 1 ton.',
        goal: 'Collect 2000 kg of paper and save 68 trees.',
        rules: [
            'Bring clean and dry paper materials',
            'Remove any plastic covers or bindings',
            'Stack papers neatly for easy handling',
            'Get your items weighed for eco-points',
            'Receive certificate for participation'
        ],
        procedure: [
            'Collect: Gather all paper waste from home/office',
            'Clean: Remove staples, plastic, and contaminants',
            'Pack: Bundle newspapers and flatten boxes',
            'Transport: Bring to City Library on event day',
            'Earn: Get certificate and plant 1 tree for every 50kg'
        ],
        contact: {
            name: 'Priya Menon',
            role: 'Campaign Lead',
            phone: '+91-9876012345',
            email: 'ecowarriors@india.org'
        },
        partners: ['Bangalore City Library', 'ITC PaperKraft', 'Green Bangalore Initiative'],
        dates: [
            { label: 'Registration Opens', date: 'Oct 28, 2025' },
            { label: 'Registration Deadline', date: 'Nov 16, 2025, 6:00 PM' },
            { label: 'Event Date', date: 'Nov 18, 2025, 10 AM - 4 PM' }
        ]
    },
    4: {
        id: 4,
        title: 'Glass Bottle Collection Drive',
        description: 'Bring your glass bottles and jars for proper recycling and reuse initiatives.',
        fullDescription: 'Glass Bottle Collection Drive focuses on collecting glass containers for recycling and reuse. Glass is 100% recyclable and can be recycled endlessly without loss in quality. This drive promotes circular economy and reduces the energy needed to produce new glass.',
        image: categoryGlass,
        date: 'Nov 20, 2025',
        time: '9 AM - 3 PM',
        location: 'Green Square, Pune',
        fullAddress: 'Green Square Park, Koregaon Park, Pune, Maharashtra, India - 411001',
        organizer: 'SaveEarth Organization',
        organizerLogo: '🌎',
        categories: ['Glass'],
        status: 'Offline',
        applicants: 18,
        impressions: 5630,
        registrationDeadline: 'Nov 18, 2025, 5:00 PM IST',
        updatedOn: 'Oct 28, 2025',
        teamSize: 'Individual Participation',
        eligibility: 'Everyone can apply',
        itemsAccepted: [
            '🍾 Glass bottles (all colors)',
            '🫙 Glass jars with lids',
            '🥛 Milk bottles',
            '🍷 Wine and beer bottles',
            '⚗️ Cosmetic glass containers',
            '💊 Medicine bottles (empty)'
        ],
        itemsNotAccepted: [
            'Broken glass pieces',
            'Window panes',
            'Light bulbs',
            'Mirrors',
            'Ceramic items'
        ],
        impact: 'Recycling glass saves 30% of energy compared to making new glass and reduces CO₂ emissions.',
        goal: 'Collect 300 kg of glass bottles and promote reuse culture.',
        rules: [
            'Clean bottles thoroughly before bringing',
            'Remove caps and lids',
            'Separate by color if possible',
            'Pack safely to prevent breakage',
            'No broken or cracked glass accepted'
        ],
        procedure: [
            'Clean: Wash all glass bottles and jars',
            'Remove: Take off labels, caps, and lids',
            'Pack: Use boxes or bags for safe transport',
            'Drop: Bring to Green Square collection point',
            'Exchange: Get reusable bags for participation'
        ],
        contact: {
            name: 'Amit Deshmukh',
            role: 'Operations Manager',
            phone: '+91-9823456789',
            email: 'saveearth@organization.in'
        },
        partners: ['Pune Glass Recyclers', 'Zero Waste Pune', 'Local Artisan Community'],
        dates: [
            { label: 'Registration Opens', date: 'Oct 30, 2025' },
            { label: 'Registration Deadline', date: 'Nov 18, 2025, 5:00 PM' },
            { label: 'Event Date', date: 'Nov 20, 2025, 9 AM - 3 PM' }
        ]
    },
    5: {
        id: 5,
        title: 'Metal Scrap Collection',
        description: 'Collection of aluminum cans, steel items, and other metal waste for recycling.',
        fullDescription: 'Metal Scrap Collection drive aims to collect various metal items including aluminum cans, steel containers, copper wires, and other metal waste. Recycling metal saves energy, conserves natural resources, and reduces greenhouse gas emissions significantly.',
        image: categoryMetal,
        date: 'Nov 22, 2025',
        time: '7 AM - 1 PM',
        location: 'Industrial Area, Chennai',
        fullAddress: 'Industrial Area, Guindy, Chennai, Tamil Nadu, India - 600032',
        organizer: 'MetalRecycle India',
        organizerLogo: '🔧',
        categories: ['Metal'],
        status: 'Offline',
        applicants: 25,
        impressions: 7820,
        registrationDeadline: 'Nov 20, 2025, 8:00 PM IST',
        updatedOn: 'Oct 28, 2025',
        teamSize: 'Individual or Company',
        eligibility: 'Everyone can apply',
        itemsAccepted: [
            '🥫 Aluminum cans',
            '🔩 Steel and iron scraps',
            '🪙 Copper wires and pipes',
            '🍳 Old utensils and cookware',
            '🚪 Metal doors and window frames',
            '⚙️ Machine parts and tools'
        ],
        itemsNotAccepted: [
            'Radioactive materials',
            'Pressurized containers',
            'Hazardous waste containers',
            'Paint cans with contents'
        ],
        impact: 'Recycling aluminum saves 95% energy compared to making new aluminum from raw materials.',
        goal: 'Collect 1500 kg of metal scrap and prevent 4 tons of CO₂ emissions.',
        rules: [
            'Clean items to prevent contamination',
            'Separate different metal types',
            'Remove non-metal attachments',
            'Heavy items require prior notification',
            'Commercial quantities welcome'
        ],
        procedure: [
            'Sort: Separate aluminum, steel, copper, etc.',
            'Clean: Remove dirt and non-metal parts',
            'Weigh: Get items weighed at collection center',
            'Payment: Receive fair price for metal scrap',
            'Certificate: Get environmental impact certificate'
        ],
        contact: {
            name: 'Suresh Kumar',
            role: 'Collection Manager',
            phone: '+91-9840123456',
            email: 'metalrecycle@india.com'
        },
        partners: ['Chennai Corporation', 'Indian Metal Recyclers Association', 'Local Industries'],
        dates: [
            { label: 'Registration Opens', date: 'Nov 1, 2025' },
            { label: 'Registration Deadline', date: 'Nov 20, 2025, 8:00 PM' },
            { label: 'Event Date', date: 'Nov 22, 2025, 7 AM - 1 PM' }
        ]
    },
    6: {
        id: 6,
        title: 'Multi-Material Recycling Fair',
        description: 'Comprehensive recycling event accepting all types of recyclable materials.',
        fullDescription: 'Multi-Material Recycling Fair is a comprehensive one-day event accepting all types of recyclable materials including plastic, electronics, paper, glass, and metal. This mega drive brings together multiple recycling partners and aims to make recycling accessible and convenient for everyone.',
        image: categoryPlastic,
        date: 'Nov 25, 2025',
        time: '8 AM - 6 PM',
        location: 'City Stadium, Delhi',
        fullAddress: 'Jawaharlal Nehru Stadium, Pragati Vihar, New Delhi, India - 110003',
        organizer: 'United Green Initiative',
        organizerLogo: '🌿',
        categories: ['Plastic', 'Electronics', 'Paper'],
        status: 'Offline',
        applicants: 67,
        impressions: 18920,
        registrationDeadline: 'Nov 23, 2025, 11:59 PM IST',
        updatedOn: 'Oct 28, 2025',
        teamSize: 'Individual or Group',
        eligibility: 'Everyone can apply',
        itemsAccepted: [
            '♻️ All types of plastic waste',
            '📱 Electronic devices and e-waste',
            '📄 Paper and cardboard',
            '🫙 Glass bottles and jars',
            '🔩 Metal items and scrap',
            '👕 Old clothes and textiles'
        ],
        itemsNotAccepted: [
            'Hazardous medical waste',
            'Wet or contaminated materials',
            'Batteries (separate counter)',
            'Paints and chemicals'
        ],
        impact: 'This mega drive aims to divert 5 tons of waste from landfills and create awareness among 10,000+ citizens.',
        goal: 'Collect 5000 kg of mixed recyclables and engage 5000+ participants.',
        rules: [
            'Pre-registration preferred but walk-ins welcome',
            'Segregate materials by type for faster processing',
            'Free recycling kits for first 500 participants',
            'Special prizes for top contributors',
            'Educational workshops throughout the day'
        ],
        procedure: [
            'Entry: Register at the main gate',
            'Segregation: Use marked bins for different materials',
            'Weighing: Get items weighed at respective counters',
            'Points: Earn green points for each kg donated',
            'Rewards: Redeem points for eco-friendly products'
        ],
        contact: {
            name: 'Dr. Kavita Singh',
            role: 'Event Director',
            phone: '+91-9811234567',
            email: 'unitedgreen@initiative.org'
        },
        partners: ['Delhi Government', 'NDMC', 'Multiple Recycling Companies', 'Schools & Colleges'],
        dates: [
            { label: 'Registration Opens', date: 'Nov 5, 2025' },
            { label: 'Registration Deadline', date: 'Nov 23, 2025, 11:59 PM' },
            { label: 'Event Date', date: 'Nov 25, 2025, 8 AM - 6 PM' }
        ]
    }
};

const categoryColors = {
    Plastic: 'bg-eco-green',
    Electronics: 'bg-eco-blue',
    Paper: 'bg-eco-earth',
    Glass: 'bg-eco-water',
    Metal: 'bg-muted',
};

// DriveDetail: Displays detailed information for a selected drive.
const DriveDetail = () => {
    const { driveId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('details');

    const drive = drivesData[driveId];

    // If no drive is found, show 404 section.
    if (!drive) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center ">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Drive Not Found</h2>
                        <Button onClick={() => navigate('/drives')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Drives
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 pt-24 sm:pt-28">
                {/* Back Button */}
                <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border">
                    <div className="container mx-auto max-w-7xl">
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/drives')}
                            className="group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Drives
                        </Button>
                    </div>
                </section>

                {/* Header Section */}
                <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
                    <div className="container mx-auto max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Content */}
                            <div className="flex-1">
                                {/* Organizer Logo */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center text-3xl shadow-soft">
                                        {drive.organizerLogo}
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                    {drive.title}
                                </h1>

                                {/* Meta Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-muted-foreground">
                                        <Building2 className="w-4 h-4 mr-2" />
                                        <span>{drive.organizer}</span>
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>{drive.organizer}</span>
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{drive.fullAddress}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>Updated On: {drive.updatedOn}</span>
                                    </div>
                                </div>

                                {/* Category Tags */}
                                <div className="flex gap-2 flex-wrap">
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

                            {/* Right Sidebar - Quick Info */}
                            <div className="lg:w-80">
                                <Card className="border-0 shadow-soft">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            {/* Registration Status */}
                                            <div className="text-center py-3 px-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                                <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                                                    Registration Closed
                                                </p>
                                            </div>

                                            <Separator />

                                            {/* Team Size */}
                                            <div className="flex items-start gap-3">
                                                <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Team Size</p>
                                                    <p className="font-semibold text-foreground">{drive.teamSize}</p>
                                                </div>
                                            </div>

                                            {/* Impressions */}
                                            <div className="flex items-start gap-3">
                                                <Eye className="w-5 h-5 text-muted-foreground mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Impressions</p>
                                                    <p className="font-semibold text-foreground">{drive.impressions.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            {/* Registration Deadline */}
                                            <div className="flex items-start gap-3">
                                                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Registration Deadline</p>
                                                    <p className="font-semibold text-foreground">{drive.registrationDeadline}</p>
                                                </div>
                                            </div>

                                            <Separator />

                                            {/* Eligibility */}
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-2">Eligibility</h3>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <CheckCircle className="w-4 h-4 text-primary" />
                                                    <span className="text-sm">{drive.eligibility}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tabs Section */}
                <section className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-7xl">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-6">
                                <TabsTrigger
                                    value="details"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                                >
                                    Details
                                </TabsTrigger>
                                <TabsTrigger
                                    value="dates"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                                >
                                    Dates & Deadlines
                                </TabsTrigger>
                                <TabsTrigger
                                    value="items"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                                >
                                    Items Accepted
                                </TabsTrigger>
                                <TabsTrigger
                                    value="contact"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                                >
                                    Contact
                                </TabsTrigger>
                            </TabsList>

                            {/* Details Tab */}
                            <TabsContent value="details" className="mt-6">
                                <div className="space-y-8">
                                    {/* Featured Image */}
                                    <div className="relative h-64 sm:h-96 rounded-lg overflow-hidden">
                                        <img
                                            src={drive.image}
                                            alt={drive.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    </div>

                                    {/* Everything you need to know */}
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                            <div className="w-1 h-8 bg-primary rounded-full"></div>
                                            Everything you need to know about {drive.title}
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            {drive.fullDescription}
                                        </p>
                                    </div>

                                    {/* Event Details */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Card className="border-0 shadow-soft">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                        <Calendar className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-foreground mb-1">Date & Time</h3>
                                                        <p className="text-muted-foreground">{drive.date}</p>
                                                        <p className="text-muted-foreground">{drive.time}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="border-0 shadow-soft">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                        <MapPin className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                                                        <p className="text-muted-foreground">{drive.location}</p>
                                                        <p className="text-sm text-muted-foreground">{drive.status}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Impact Section */}
                                    <Card className="border-0 shadow-soft bg-primary/5">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                                <Recycle className="w-5 h-5 text-primary" />
                                                Environmental Impact
                                            </h3>
                                            <p className="text-muted-foreground mb-2">{drive.impact}</p>
                                            <p className="font-semibold text-foreground">Our Goal: {drive.goal}</p>
                                        </CardContent>
                                    </Card>

                                    {/* Participation Procedure */}
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-4">Participation Procedure</h3>
                                        <div className="space-y-3">
                                            {drive.procedure.map((step, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                                                    </div>
                                                    <p className="text-muted-foreground pt-1">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* General Rules */}
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-4">General Rules</h3>
                                        <ul className="space-y-2">
                                            {drive.rules.map((rule, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                    <span className="text-muted-foreground">{rule}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Partners */}
                                    {drive.partners && drive.partners.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-4">Partners & Sponsors</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {drive.partners.map((partner, index) => (
                                                    <Badge key={index} variant="outline" className="px-4 py-2">
                                                        {partner}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            {/* Dates & Deadlines Tab */}
                            <TabsContent value="dates" className="mt-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                        <div className="w-1 h-8 bg-primary rounded-full"></div>
                                        Important dates & deadlines
                                    </h2>
                                    <div className="space-y-4">
                                        {drive.dates.map((dateInfo, index) => (
                                            <Card key={index} className="border-0 shadow-soft">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                            <Calendar className="w-6 h-6 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-foreground">{dateInfo.label}</h3>
                                                            <p className="text-muted-foreground">{dateInfo.date}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Items Accepted Tab */}
                            <TabsContent value="items" className="mt-6">
                                <div className="space-y-8">
                                    {/* Items Accepted */}
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                            <div className="w-1 h-8 bg-primary rounded-full"></div>
                                            Items We Accept
                                        </h2>
                                        <Card className="border-0 shadow-soft">
                                            <CardContent className="p-6">
                                                <ul className="grid sm:grid-cols-2 gap-3">
                                                    {drive.itemsAccepted.map((item, index) => (
                                                        <li key={index} className="flex items-center gap-3">
                                                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                            <span className="text-muted-foreground">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Items NOT Accepted */}
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                            <div className="w-1 h-8 bg-destructive rounded-full"></div>
                                            Items We DO NOT Accept
                                        </h2>
                                        <Card className="border-0 shadow-soft border-destructive/20">
                                            <CardContent className="p-6">
                                                <ul className="space-y-3">
                                                    {drive.itemsNotAccepted.map((item, index) => (
                                                        <li key={index} className="flex items-center gap-3">
                                                            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                                                            <span className="text-muted-foreground">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Contact Tab */}
                            <TabsContent value="contact" className="mt-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                        <div className="w-1 h-8 bg-primary rounded-full"></div>
                                        Contact the organisers
                                    </h2>
                                    <Card className="border-0 shadow-soft">
                                        <CardContent className="p-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="font-semibold text-foreground mb-1">{drive.contact.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{drive.contact.role}</p>
                                                </div>

                                                <Separator />

                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                            <Phone className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-muted-foreground">Phone</p>
                                                            <a href={`tel:${drive.contact.phone}`} className="text-foreground hover:text-primary transition-colors">
                                                                {drive.contact.phone}
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                            <Mail className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-muted-foreground">Email</p>
                                                            <a href={`mailto:${drive.contact.email}`} className="text-foreground hover:text-primary transition-colors">
                                                                {drive.contact.email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <Button className="w-full">
                                                    Send queries to organizers
                                                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default DriveDetail;
