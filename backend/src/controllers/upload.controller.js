import Upload from '../models/Upload.js';
import { extractDataFromDocument } from '../services/extraction.service.js';
import { sendSuccess } from '../utils/ApiResponse.js';

export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    const fileType = req.file.mimetype.split('/')[1] === 'pdf' ? 'pdf' : req.file.mimetype.split('/')[1];
    
    const upload = await Upload.create({
      userId: req.user.id,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileType
    });

    const extractedData = await extractDataFromDocument(upload.filePath, upload.fileType);
    
    upload.extractedData = extractedData;
    await upload.save();

    sendSuccess(res, { upload, extractedData }, 201);
  } catch (err) {
    next(err);
  }
};