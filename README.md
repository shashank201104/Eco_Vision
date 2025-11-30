🌿 Eco Vision: AI-Powered Sustainability Platform 

~ Helping people identify recyclable items, reduce waste, and make eco-friendly decisions effortlessly.

## Overview

Eco Vision is an AI-powered web platform designed to make sustainability simple, interactive, and accessible.
Users can upload or capture a photo of their environment (room, kitchen, fridge, workspace), and the system instantly identifies recyclable & reusable items, highlights them visually, and suggests actionable reuse or recycling ideas. It also connects users to the nearest recycling centers using geo-location APIs.
This repository contains the source code and resources for Eco Vision, an initiative that leverages machine learning and data-driven approaches to help users make eco-friendly decisions.

## The Problem 

The Gap in Waste Management

Every day, households and businesses discard items that could be reused or recycled. Existing applications only handle reporting and pickup, but fail to identify valuable items before they become waste.

This gap leads to several issues:

Rising pollution and landfill overflow.

Loss of resources that could be recycled.

No guidance on reuse or disposal options.

GAP: There is no AI-driven tool to detect, guide, and connect people with recycling solutions.

## Our Solution

Eco Vision: the cutting-edge platform that uses AI-Powered visual intelligence to transform your photos into actionable sustainability insights, making it effortless to identify, reuse, and responsibly recycle the valuable items hiding right in your home.

Our Core Features

- **The Intuitive Web Platform**:
Forget manual logging. Our platform allows users to simply capture or upload a photo—whether it's a messy corner of a room, a packed fridge, or a kitchen counter. It’s the easiest way to start reducing waste.

- **AI-Powered Detection & Creative Suggestions**:
This is where the magic happens. Our advanced AI instantly identifies reusable and recyclable items within your photo, highlighting them with precision. More than just identification, we provide tailored, creative reuse ideas to transform those potential discarded items into something valuable.

- **Smart Integration & Local Connections**:
Once you know what you have, we tell you what to do next. Eco Vision smartly connects you to the nearest certified recycling centers and disposal services, making the final step of responsible disposal quick and convenient.



## Key Features & USP


- **AI-Powered Detection:**: Instantly detects reusable and recyclable items in an uploaded image
- **Context-Aware Guidance**: Provides instant, context-aware reuse and recycle tips.
- **Location-Based Results**: Fetches nearby recycling centers using Google Places/OpenStreetMap
- **Cross-Platform Access**: Runs on any device with potential offline PWA support
- **Custom Model**: The AI model is specifically tuned for Indian waste categories.

## Tech Stack


## Architecture 
The architecture follows this pipeline:

1. User Interaction: User uploads or captures a photo and grants location access
2. Frontend (React): Sends the data (image + location) to the Node.js backend API.
3. Backend (Node.js): Forwards the image to the dedicated Python AI service.
4. AI Service (Python/YOLOv8): Performs object detection and annotation.
5. External APIs (): Fetches nearby recycling centers
6. Frontend Display: Renders the annotated photo, reuse tips, and a list of recycling centers.



## Installation & Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/shashank201104/Eco_Vision.git
    cd Eco_Vision
    ```

2. Install Frontend:
    ```bash
    cd client
    npm install
    npm start
    ```

3. Install Backend:
    ```bash
    cd server
    npm install
    npm run dev
    ```

4. Install dependencies:
    ```bash
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```
5. Create .env Files
   ```bash
   GOOGLE_PLACES_KEY=
   MONGO_URI=
   AI_SERVICE_URL=   
   ``` 

## Future Enhancements

- Carbon footprint estimation
- Sustainability leaderboard & rewards
- Mobile app (React Native)
- Offline PWA support
- Automatic waste pickup scheduling

## License

MIT License © 2025 Developed by Team Code Knights

## Contact

For support or queries, reach out at shashank.mca25@cs.du.ac.in
