import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Auto-seed the admin from environment variables if the collection is empty.
    // Credentials are NEVER hardcoded here – they live only in .env
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

    // Find the admin by username
    const adminUser = await Admin.findOne({ username });

    if (adminUser && (await adminUser.matchPassword(password))) {
      const token = jwt.sign(
        { id: adminUser._id, username: adminUser.username, role: 'admin' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        token,
        admin: {
          username: adminUser.username,
          name: 'Muhammad Zeeshan'
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
