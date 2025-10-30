import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// POST a new expense
router.post('/', async (req, res) => {
  try {
    const { title, amount, date } = req.body;

    if (!title || !amount || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newExpense = new Expense({
      title,
      amount,
      date: new Date(date)
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

export default router;
