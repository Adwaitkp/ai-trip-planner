import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Upload', required: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    generatedItinerary: { type: mongoose.Schema.Types.Mixed, required: true },
    shareId: { type: String, unique: true, sparse: true },
    isPublic: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Itinerary', itinerarySchema);