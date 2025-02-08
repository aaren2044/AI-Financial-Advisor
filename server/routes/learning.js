import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Sample Learning Modules with YouTube Links
router.get('/modules', async (req, res) => {
  try {
    const modules = [
      {
        id: 'basic-finance',
        title: 'Basic Financial Literacy',
        description: 'Learn fundamental financial concepts',
        modules: 5,
        topics: ['Budgeting', 'Saving', 'Banking', 'Credit', 'Investment Basics'],
        youtubeLink: 'https://www.youtube.com/watch?v=9wHo2w0kcV8' // Example YouTube link
      },
      {
        id: 'digital-banking',
        title: 'Digital Banking',
        description: 'Master digital banking tools and services',
        modules: 4,
        topics: ['Mobile Banking', 'UPI', 'Online Security', 'Digital Payments'],
        youtubeLink: 'https://www.youtube.com/watch?v=F3TzYXRkXpM'
      },
      {
        id: 'business',
        title: 'Business Planning',
        description: 'Start and grow your own business',
        modules: 6,
        topics: ['Business Basics', 'Market Research', 'Pricing', 'Marketing', 'Accounting', 'Growth'],
        youtubeLink: 'https://www.youtube.com/watch?v=AfqTnfP-ET4'
      },
      {
        id: 'investment',
        title: 'Investment Basics',
        description: 'Learn about different investment options',
        modules: 3,
        topics: ['Savings Accounts', 'Fixed Deposits', 'Government Schemes'],
        youtubeLink: 'https://www.youtube.com/watch?v=bbATC1ZbWcw'
      }
    ];
    
    res.json({ success: true, modules });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add this route to provide video tutorials
router.get('/videos', async (req, res) => {
  try {
    const videos = [
      {
        title: 'Understanding Banking Basics',
        link: 'https://youtu.be/fTTGALaRZoc?si=-IKQUoiFxZQHV3jp',
        duration: 6
      },
      {
        title: 'Starting a Small Business',
        link: 'https://youtu.be/AW-Szrc1I_U?si=HOB3n83hqDm8FYqes',
        duration: 16
      },
      {
        title: 'Managing Personal Finance',
        link: 'https://youtu.be/VaiqGsot5ws?si=xSc_Jh_KEhRh3QVy',
        duration: 12
      }
    ];
    
    res.json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user progress
router.get('/progress', async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    res.json({ 
      success: true, 
      progress: {
        completedModules: user.learningProgress?.completedModules || [],
        quizScores: user.learningProgress?.quizScores || [],
        certificates: user.learningProgress?.certificates || []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update module progress
router.put('/progress/:moduleId', async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });

    const { moduleId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    if (!user.learningProgress.completedModules.includes(moduleId)) {
      user.learningProgress.completedModules.push(moduleId);
    }

    await user.save();
    res.json({ success: true, completedModules: user.learningProgress.completedModules });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Submit quiz
router.post('/quizzes/:moduleId/submit', async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });

    const { moduleId } = req.params;
    const { score } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    user.learningProgress.quizScores.push({
      moduleId,
      score,
      date: new Date()
    });

    await user.save();
    res.json({ success: true, quizScores: user.learningProgress.quizScores });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;