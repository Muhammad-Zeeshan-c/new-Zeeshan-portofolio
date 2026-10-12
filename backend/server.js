import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env inside backend/ directory (or parent directory)
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import express application and database connection
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 3001;

// Connect to MongoDB Atlas
connectDB();

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Portfolio Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Keep server running in development or close gracefully in production
});

export default server;
