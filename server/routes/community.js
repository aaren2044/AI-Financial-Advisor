import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get mentors
router.get('/mentors', async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' })
      .select('name profile.expertise profile.rating');
    res.json({ success: true, mentors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Request mentorship
router.post('/mentorship-requests/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const userId = req.user.id;
    
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ success: false, error: 'Mentor not found' });
    }
    
    // Add mentorship request logic here
    res.json({ success: true, message: 'Mentorship request sent' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get forum topics
router.get('/forum-topics', async (req, res) => {
  try {
    const topics = [
      {
        id: 'business',
        title: 'Starting a Home Business',
        replies: 24,
        active: true
      },
      {
        id: 'savings',
        title: 'Saving Tips & Tricks',
        replies: 18,
        active: true
      },
      {
        id: 'govt-schemes',
        title: 'Government Schemes',
        replies: 32,
        active: true
      }
    ];
    
    res.json({ success: true, topics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create forum post
router.post('/forum-posts', async (req, res) => {
  try {
    const { topicId, content } = req.body;
    const userId = req.user.id;
    
    // Add forum post logic here
    res.json({ success: true, message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get upcoming events
router.get('/events', async (req, res) => {
  try {
    const events = [
      {
        id: 'workshop-1',
        title: 'Financial Planning Workshop',
        date: '2024-03-15',
        type: 'Online'
      },
      {
        id: 'networking-1',
        title: 'Business Networking Meet',
        date: '2024-03-20',
        type: 'In-Person'
      },
      {
        id: 'seminar-1',
        title: 'Digital Banking Seminar',
        date: '2024-03-25',
        type: 'Online'
      }
    ];
    
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Register for event
router.post('/event-registrations/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    
    // Add event registration logic here
    res.json({ success: true, message: 'Successfully registered for event' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;