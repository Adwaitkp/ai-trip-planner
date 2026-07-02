import { getSharedItinerary } from '../services/itinerary.service.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { toItineraryDTO } from '../dto/itinerary.dto.js';

export const getShared = async (req, res, next) => {
  try {
    const itinerary = await getSharedItinerary(req.params.shareId);
    sendSuccess(res, { ...toItineraryDTO(itinerary), ownerName: itinerary.userId.name });
  } catch (err) {
    next(err);
  }
};