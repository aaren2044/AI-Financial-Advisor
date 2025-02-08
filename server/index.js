import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { GoogleGenerativeAI } from '@google/generative-ai';

import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import financeRoutes from './routes/finance.js';
import learningRoutes from './routes/learning.js';
import communityRoutes from './routes/community.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://naridhansakhi.com' : 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// JWT Authentication Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid or expired token' });
//     }
//     req.user = user;
//     next();
//   });
// };

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/community', communityRoutes);

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-mentorship-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('receive-message', {
      ...data,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});