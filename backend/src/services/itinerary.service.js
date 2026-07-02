import Itinerary from '../models/Itinerary.js';
import { GoogleGenAI } from '@google/genai';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/errors.js';

let ai;

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, vertexai: false });
  }

  return ai;
};

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';

export const generateItinerary = async (userId, uploadId, extractedData) => {
  const client = getClient();
  if (!client) {
    throw new AppError('Gemini API key is not configured', 500);
  }

  const prompt = `
    You are an expert travel planner. Create a comprehensive, structured travel itinerary based on this booking data: 
    ${JSON.stringify(extractedData)}

    Return ONLY a JSON object with this exact structure:
    {
      "tripSummary": "Brief overview",
      "destination": "Main destination",
      "dayWisePlan": [{"day": 1, "activities": ["Morning: ", "Afternoon: ", "Evening: "]}],
      "travelTimeline": {"departure": "", "return": ""},
      "hotelInfo": {"name": "", "address": "", "checkIn": "", "checkOut": ""},
      "transportationDetails": {"type": "", "details": ""},
      "suggestedPlaces": ["Place 1", "Place 2"],
      "localFood": ["Food 1", "Food 2"],
      "estimatedBudget": {"currency": "USD", "amount": 0, "breakdown": {"stay": 0, "food": 0, "travel": 0, "activities": 0}},
      "packingChecklist": ["Item 1", "Item 2"],
      "travelTips": ["Tip 1", "Tip 2"]
    }
  `;

  const response = await client.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });
  const responseText = response.text || '';
  const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new AppError('Failed to parse generated itinerary', 500);
  }
  const generatedItinerary = JSON.parse(jsonMatch[1] || jsonMatch[0]);

  const title = `${generatedItinerary.destination} Trip`;

  const itinerary = await Itinerary.create({
    userId,
    uploadId,
    title,
    destination: generatedItinerary.destination,
    generatedItinerary,
    shareId: uuidv4()
  });

  return itinerary;
};

export const getUserItineraries = async (userId) => {
  return await Itinerary.find({ userId }).sort({ createdAt: -1 });
};

export const getItineraryById = async (id, userId) => {
  const itinerary = await Itinerary.findById(id);
  if (!itinerary || itinerary.userId.toString() !== userId.toString()) {
    throw new AppError('Itinerary not found', 404);
  }
  return itinerary;
};

export const deleteItinerary = async (id, userId) => {
  const itinerary = await Itinerary.findOneAndDelete({ _id: id, userId });
  if (!itinerary) throw new AppError('Itinerary not found', 404);
  return true;
};

export const toggleShareItinerary = async (id, userId) => {
  const itinerary = await Itinerary.findById(id);
  if (!itinerary || itinerary.userId.toString() !== userId.toString()) {
    throw new AppError('Itinerary not found', 404);
  }
  itinerary.isPublic = !itinerary.isPublic;
  await itinerary.save();
  return itinerary;
};

export const getSharedItinerary = async (shareId) => {
  const itinerary = await Itinerary.findOne({ shareId, isPublic: true }).populate('userId', 'name');
  if (!itinerary) throw new AppError('Shared itinerary not found or is private', 404);
  return itinerary;
};