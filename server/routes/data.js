import express from 'express';
import FinancialGoal from '../models/FinancialGoal.js';
import Savings from '../models/Savings.js';
import Expense from '../models/Expense.js';
import TotalSavings from '../models/TotalSavings.js';
import Income from '../models/Income.js';

const router = express.Router();

// ✅ Get Financial Goals
router.get('/financial-goals', async (req, res) => {
  try {
    const goals = await FinancialGoal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get Savings Data
router.get('/savings', async (req, res) => {
  try {
    const savings = await Savings.find();
    res.json(savings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get Expense Data
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get Total Savings
router.get('/total-savings', async (req, res) => {
  try {
    const totalSavings = await TotalSavings.find();
    res.json(totalSavings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get Income
router.get('/income', async (req, res) => {
  try {
    const income = await Income.find();
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;