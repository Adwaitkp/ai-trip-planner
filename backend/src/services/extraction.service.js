import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import Tesseract from 'tesseract.js';
import { GoogleGenAI } from '@google/genai';
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

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: dataBuffer });
  const data = await parser.getText();
  return data.text;
};

const extractTextFromImage = async (filePath) => {
  const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
  return text;
};

export const extractDataFromDocument = async (filePath, fileType) => {
  let rawText = '';
  
  if (fileType === 'pdf') {
    rawText = await extractTextFromPDF(filePath);
  } else {
    rawText = await extractTextFromImage(filePath);
  }

  if (!rawText || rawText.trim().length < 10) {
    throw new AppError('Could not extract readable text from the document', 400);
  }

  const fallbackResult = {
    type: 'unknown',
    data: {
      rawText: rawText.trim().slice(0, 2000)
    }
  };

  try {
    const client = getClient();
    if (!client) {
      return fallbackResult;
    }

    const prompt = `
      Extract travel booking information from the following text. 
      Return ONLY valid JSON matching one of these structures based on what you find:
      
      1. Flight: {"type": "flight", "data": {"airline": "", "flightNumber": "", "departureAirport": "", "arrivalAirport": "", "departureDate": "", "departureTime": "", "arrivalDate": "", "arrivalTime": ""}}
      2. Hotel: {"type": "hotel", "data": {"hotelName": "", "address": "", "checkInDate": "", "checkOutDate": ""}}
      3. Train/Bus: {"type": "transport", "data": {"source": "", "destination": "", "date": "", "time": "", "operator": ""}}
      
      If unsure, return: {"type": "unknown", "data": {"rawText": "extracted summary here"}}
      
      Text:
      ${rawText}
    `;
    
    const response = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    const responseText = response.text || '';
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) return fallbackResult;
    
    return JSON.parse(jsonMatch[1] || jsonMatch[0]);
  } catch (error) {
    console.error('AI Extraction Error:', error);
    return fallbackResult;
  }
};