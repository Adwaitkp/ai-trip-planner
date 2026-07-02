import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileType: { type: String, required: true, enum: ['pdf', 'png', 'jpg', 'jpeg'] },
    extractedData: { type: mongoose.Schema.Types.Mixed, default: null }
  },
  { timestamps: true }
);

export default mongoose.model('Upload', uploadSchema);