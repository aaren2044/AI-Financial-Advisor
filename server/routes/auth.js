import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password });

    // Save the user
    await user.save();

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Send response with the user info and token
    res.status(201).json({
      token,
      user: { id: user._id, name, email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists by email
    const user = await User.findOne({ email });
    console.log('User found:', user);  // Debugging

    // If user does not exist, return error
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);  // Debugging

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Update the last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Send response with the token and user data
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Biometric authentication routes
router.post('/voice-auth', async (req, res) => {
  try {
    const { userId, voicePrint } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Store voice print data
    user.biometricData.voicePrint = voicePrint;
    await user.save();

    console.log('Voice authentication updated for user:', userId);
    res.json({ message: 'Voice authentication successful' });
  } catch (error) {
    console.error('Voice auth error:', error);
    res.status(500).json({ message: 'Voice authentication failed' });
  }
});

router.post('/face-auth', async (req, res) => {
  try {
    const { userId, faceData } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Store face recognition data
    user.biometricData.faceData = faceData;
    await user.save();

    console.log('Face authentication updated for user:', userId);
    res.json({ message: 'Face authentication successful' });
  } catch (error) {
    console.error('Face auth error:', error);
    res.status(500).json({ message: 'Face authentication failed' });
  }
});

router.post('/fingerprint-auth', async (req, res) => {
  try {
    const { userId, fingerprintHash } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Store fingerprint hash
    user.biometricData.fingerprintHash = fingerprintHash;
    await user.save();

    console.log('Fingerprint authentication updated for user:', userId);
    res.json({ message: 'Fingerprint authentication successful' });
  } catch (error) {
    console.error('Fingerprint auth error:', error);
    res.status(500).json({ message: 'Fingerprint authentication failed' });
  }
});

// Verify token middleware
// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

export default router;