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
      userId: userId,
      amount: parseFloat(amount),
      category: category.trim(),
      date: new Date(date), // Convert user input to Date
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
    const expenses = snapshot.docs.map(doc => {
      const data = doc.data();
      if (data.date && data.date.toDate) {
        data.date = data.date.toDate(); // Convert Firestore Timestamp to Date
      }
      return { id: doc.id, ...data };
    });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Search expenses
router.post('/search', async (req, res) => {
  const { userId, category, startDate, endDate, minAmount, maxAmount } = req.body;
  try {
    let query = db.collection('expenses').where('userId', '==', userId);

    if (category && category.trim() !== '') {
      query = query.where('category', '==', category.trim());
    }

    if (startDate) {
      const start = new Date(startDate);
      if (!isNaN(start)) {
        query = query.where('date', '>=', start);
      }
    }
    if (endDate) {
      const end = new Date(endDate);
      if (!isNaN(end)) {
        query = query.where('date', '<=', end);
      }
    }

    const snapshot = await query.get();
    let results = snapshot.docs.map(doc => {
      const data = doc.data();
      if (data.date && data.date.toDate) {
        data.date = data.date.toDate();
      }
      return { id: doc.id, ...data };
    });

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

// Expense report (no month filtering, just show all expenses by category)
router.get('/report/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const snapshot = await db.collection('expenses').where('userId', '==', userId).get();
    if (snapshot.empty) {
      return res.json([]);
    }

    const categoryTotals = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.date && data.date.toDate) {
        data.date = data.date.toDate();
      }

      // Sum up all expenses by category
      if (!categoryTotals[data.category]) {
        categoryTotals[data.category] = 0;
      }
      categoryTotals[data.category] += data.amount;
    });

    // Convert to array
    const reportArray = Object.keys(categoryTotals).map(cat => ({
      name: cat,
      total: categoryTotals[cat]
    }));

    res.json(reportArray);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

module.exports = router;

