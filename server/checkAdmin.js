/**
 * checkAdmin.js – Admin seed / reset utility
 *
 * Usage (from the `server/` directory):
 *   node checkAdmin.js
 *
 * Reads ADMIN_USERNAME and ADMIN_PASSWORD from .env (never hardcoded).
 * Creates the admin if missing, or resets the password if it already exists.
 */

import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root (one level above server/)
dotenv.config({ path: path.join(__dirname, '../.env') });

const checkAdmins = async () => {
  await connectDB();

  // Wait for mongoose to be ready
  if (mongoose.connection.readyState !== 1) {
    console.error('❌ Could not connect to MongoDB. Exiting.');
    process.exit(1);
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('❌ ADMIN_USERNAME or ADMIN_PASSWORD is not set in .env. Exiting.');
    process.exit(1);
  }

  console.log(`\n🔍 Checking for admin: ${username}`);

  const admins = await Admin.find({});
  console.log(`📋 Total admins in DB: ${admins.length}`);
  admins.forEach(a => console.log(`  - ${a.username}`));

  const existing = await Admin.findOne({ username });
  if (!existing) {
    console.log('\n➕ Admin not found. Creating...');
    await Admin.create({ username, password });
    console.log('✅ Admin created successfully.');
  } else {
    console.log('\n🔄 Admin already exists. Resetting password...');
    existing.password = password;
    await existing.save();
    console.log('✅ Password reset successfully.');
  }

  process.exit(0);
};

checkAdmins();
