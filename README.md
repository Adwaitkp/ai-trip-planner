# AI Travel Planner

AI Travel Planner is a full-stack application for uploading booking documents, extracting travel details, and generating structured itineraries with AI.

## Project Structure

- `backend/` - Express API, MongoDB models, AI extraction, and itinerary generation
- `frontend/` - React app built with Vite and Tailwind CSS

## Features

- User registration and login
- Upload PDF and image booking documents
- AI-based data extraction from travel documents
- AI itinerary generation
- Shareable itinerary links
- PDF download for itineraries
- Protected dashboard and itinerary views

## Tech Stack

Backend:

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- Google Gen AI SDK

Frontend:

- React
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- React Hot Toast

## Prerequisites

- Node.js 20 or later
- MongoDB database
- Google Gemini API key

## Environment Variables

Create a `.env` file in `backend/` with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

Create a `.env` file in `frontend/` with:

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation

Install dependencies for both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running the Project

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

## Available Scripts

Backend:

- `npm run dev` - Start the development server with nodemon
- `npm start` - Start the production server

Frontend:

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the frontend for production
- `npm run lint` - Run ESLint

## How It Works

1. The user signs up or logs in.
2. The user uploads a booking PDF or image.
3. The backend extracts text from the document.
4. Gemini generates structured travel data and an itinerary.
5. The itinerary can be viewed, shared, and downloaded as PDF.

## Notes

- Uploaded files are stored in the backend uploads directory.
- The frontend expects the backend API to be available at the URL configured in `VITE_API_URL`.
- If PDF generation or AI extraction fails, check the browser console and backend terminal for the exact error.