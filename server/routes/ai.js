import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI('AIzaSyBe2nbxp1NYpt5BTD0yiIkPfXCYvQ-GHHo');

// AI Chatbot endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, language = 'English' } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      You are a financial advisor helping rural women in India.
      Respond in ${language}.
      Keep responses simple, practical, and culturally relevant.
      Focus on basic financial literacy and empowerment.
      User message: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      reply: text
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'AI service error',
      message: error.message
    });
  }
});

// Voice transcription endpoint
router.post('/voice-transcribe', async (req, res) => {
  try {
    const { audioText, language = 'English' } = req.body;

    if (!audioText) {
      return res.status(400).json({
        success: false,
        error: 'Audio text is required'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Translate and process this voice input from a rural woman in India:
      Language: ${language}
      Text: ${audioText}
      
      Provide a helpful response related to financial matters.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      reply: text
    });

  } catch (error) {
    console.error('Voice Transcription Error:', error);
    res.status(500).json({
      success: false,
      error: 'Voice processing error',
      message: error.message
    });
  }
});

// Financial recommendation endpoint
router.post('/recommend', async (req, res) => {
  try {
    const { userId, financialProfile } = req.body;

    if (!userId || !financialProfile) {
      return res.status(400).json({
        success: false,
        error: 'User ID and financial profile are required'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      As a financial advisor for rural women in India, analyze this profile and provide recommendations:
      Profile: ${JSON.stringify(financialProfile)}
      
      Provide practical advice on:
      1. Savings strategies
      2. Income opportunities
      3. Risk management
      4. Basic financial planning
      
      Keep recommendations simple, actionable, and culturally appropriate.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      recommendations: text
    });

  } catch (error) {
    console.error('AI Recommendation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Recommendation error',
      message: error.message
    });
  }
});

export default router;