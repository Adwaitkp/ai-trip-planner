import { generateItinerary, getUserItineraries, getItineraryById, deleteItinerary, toggleShareItinerary } from '../services/itinerary.service.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { toItineraryDTO } from '../dto/itinerary.dto.js';
import Upload from '../models/Upload.js';
import { AppError } from '../utils/errors.js';

export const generate = async (req, res, next) => {
  try {
    const { uploadId } = req.body;
    const upload = await Upload.findById(uploadId);
    
    if (!upload || !upload.extractedData) {
      throw new AppError('Upload not found or data not extracted', 404);
    }

    const itinerary = await generateItinerary(req.user.id, uploadId, upload.extractedData);
    sendSuccess(res, toItineraryDTO(itinerary), 201);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const itineraries = await getUserItineraries(req.user.id);
    sendSuccess(res, itineraries.map(toItineraryDTO));
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const itinerary = await getItineraryById(req.params.id, req.user.id);
    sendSuccess(res, toItineraryDTO(itinerary));
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteItinerary(req.params.id, req.user.id);
    sendSuccess(res, { message: 'Itinerary deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const toggleShare = async (req, res, next) => {
  try {
    const itinerary = await toggleShareItinerary(req.params.id, req.user.id);
    sendSuccess(res, toItineraryDTO(itinerary));
  } catch (err) {
    next(err);
  }
};