import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import itineraryRoutes from './routes/itinerary.routes.js';
import shareRoutes from './routes/share.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(path.resolve(), 'src/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/share', shareRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Global Error Handler
app.use(errorHandler);

export default app;