export const toItineraryDTO = (itinerary) => {
  if (!itinerary) {
    return null;
  }

  return {
    id: itinerary._id,
    userId: itinerary.userId,
    uploadId: itinerary.uploadId,
    title: itinerary.title,
    destination: itinerary.destination,
    generatedItinerary: itinerary.generatedItinerary,
    shareId: itinerary.shareId,
    isPublic: itinerary.isPublic,
    createdAt: itinerary.createdAt,
    updatedAt: itinerary.updatedAt
  };
};