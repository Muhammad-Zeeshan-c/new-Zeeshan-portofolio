import express from 'express';
import cors from 'cors';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import certRoutes from './routes/certRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import cvRoutes from './routes/cvRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

// Import Error Middleware
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API Backend is running smoothly' });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/contact', messageRoutes); // Alias for contact form submission
app.use('/api/cv', cvRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);

// Catch 404 routes
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
