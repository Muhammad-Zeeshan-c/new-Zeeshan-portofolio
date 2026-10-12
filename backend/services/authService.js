import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

/**
 * Auth Service
 * Handles admin credential verification, JWT generation, and initial seed
 */
export const authenticateAdmin = async (username, password) => {
  // Auto-seed the admin from environment variables if the collection is empty.
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const seedUsername = process.env.ADMIN_USERNAME;
    const seedPassword = process.env.ADMIN_PASSWORD;

    if (!seedUsername || !seedPassword) {
      console.error('❌ ADMIN_USERNAME or ADMIN_PASSWORD not set in .env – cannot seed admin.');
    } else {
      console.log('No admins found in database. Seeding admin from environment variables...');
      await Admin.create({ username: seedUsername, password: seedPassword });
      console.log('✅ Admin seeded successfully.');
    }
  }

  const adminUser = await Admin.findOne({ username });

  if (!adminUser || !(await adminUser.matchPassword(password))) {
    return null;
  }

  const token = jwt.sign(
    { id: adminUser._id, username: adminUser.username, role: 'admin' },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  );

  return {
    token,
    admin: {
      username: adminUser.username,
      name: 'Muhammad Zeeshan'
    }
  };
};
