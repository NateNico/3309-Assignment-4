// server/server.js
const express = require('express');
const cors = require('cors');

const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);

// Spending Analysis Endpoint
app.get('/api/spending-analysis/:userId', async (req, res) => {
  const { userId } = req.params;
  const db = require('./config/db');
  
  try {
    const snapshot = await db.collection('expenses').where('userId', '==', userId).get();
    if (snapshot.empty) {
      return res.json({ totalSpent: 0, topCategory: null, suggestion: 'No expenses found.' });
    }

    let total = 0;
    let categoryTotals = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      total += data.amount;
      if (!categoryTotals[data.category]) categoryTotals[data.category] = 0;
      categoryTotals[data.category] += data.amount;
    });

    // Find the category with the highest spending
    let topCategory = null;
    let maxSpent = 0;
    for (const cat in categoryTotals) {
      if (categoryTotals[cat] > maxSpent) {
        maxSpent = categoryTotals[cat];
        topCategory = cat;
      }
    }

    const analysis = {
      totalSpent: total,
      topCategory: topCategory,
      suggestion: `You spent the most on '${topCategory}'. Consider reducing expenses in this category.`
    };

    res.json(analysis);
  } catch (error) {
    console.error('Error generating spending analysis:', error);
    res.status(500).json({ error: 'Failed to generate spending analysis' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


