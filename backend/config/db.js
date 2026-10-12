import mongoose from 'mongoose';
import dns from 'node:dns';

// Override DNS servers to bypass Windows DNS SRV resolution issues
// Using Google (8.8.8.8) and Cloudflare (1.1.1.1) public DNS
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        family: 4, // Force IPv4
      });
      console.log(`🍃 MongoDB Atlas Connected: ${conn.connection.host}`);
      return; // Success – stop retrying
    } catch (error) {
      console.error(`❌ MongoDB Connection Attempt ${attempt}/${MAX_RETRIES} failed: ${error.message}`);
      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * attempt;
        console.log(`⏳ Retrying in ${delay / 1000}s...`);
        await sleep(delay);
      } else {
        console.error('⚠️  All MongoDB connection attempts exhausted. Server will run without database.');
      }
    }
  }
};

// Reconnection event handlers
mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected. Attempting reconnect...');
});
mongoose.connection.on('reconnected', () => {
  console.log('🍃 MongoDB reconnected successfully');
});

export default connectDB;
