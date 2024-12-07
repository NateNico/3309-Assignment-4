// server/routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add a new expense
router.post('/add', async (req, res) => {
  const { userId, amount, category, date, description } = req.body;
  if (!userId || !amount || !category || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const expense = {
      userId,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      description: description || '',
    };
    const docRef = await db.collection('expenses').add(expense);
    res.json({ success: true, expenseId: docRef.id });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// Get all expenses for a user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const snapshot = await db.collection('expenses').where('userId', '==', userId).get();
    const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Search expenses by category, date range, and amount range
router.post('/search', async (req, res) => {
  const { userId, category, startDate, endDate, minAmount, maxAmount } = req.body;
  let query = db.collection('expenses').where('userId', '==', userId);

  // Filter by category if provided
  if (category && category.trim() !== '') {
    query = query.where('category', '==', category);
  }

  // Since Firestore queries are limited in combining multiple inequalities on different fields,
  // we'll do the date range filtering with queries and amount filtering in-memory.
  if (startDate) {
    const start = new Date(startDate);
    query = query.where('date', '>=', start);
  }
  if (endDate) {
    const end = new Date(endDate);
    query = query.where('date', '<=', end);
  }

  try {
    const snapshot = await query.get();
    let results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // In-memory filtering for amount
    if (minAmount) {
      results = results.filter(exp => exp.amount >= parseFloat(minAmount));
    }
    if (maxAmount) {
      results = results.filter(exp => exp.amount <= parseFloat(maxAmount));
    }

    res.json(results);
  } catch (error) {
    console.error('Error searching expenses:', error);
    res.status(500).json({ error: 'Failed to search expenses' });
  }
});

// Generate expense reports (by category or by month)
router.get('/report/:userId/:type', async (req, res) => {
  const { userId, type } = req.params;
  try {
    const snapshot = await db.collection('expenses').where('userId', '==', userId).get();
    const expenses = snapshot.docs.map(doc => doc.data());

    let report = {};

    if (type === 'category') {
      expenses.forEach(exp => {
        if (!report[exp.category]) report[exp.category] = 0;
        report[exp.category] += exp.amount;
      });
    } else if (type === 'month') {
      // Group by Month (YYYY-MM)
      expenses.forEach(exp => {
        const month = exp.date.toISOString().substring(0, 7);
        if (!report[month]) report[month] = 0;
        report[month] += exp.amount;
      });
    } else {
      return res.status(400).json({ error: 'Invalid report type. Use "category" or "month".' });
    }

    res.json(report);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

module.exports = router;


