// server/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add a category
router.post('/add', async (req, res) => {
  const { userId, name } = req.body;
  if (!userId || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const docRef = await db.collection('categories').add({ userId, name });
    res.json({ success: true, categoryId: docRef.id });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Failed to add category' });
  }
});

// Get categories for a user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const snapshot = await db.collection('categories').where('userId', '==', userId).get();
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Edit category
router.post('/edit', async (req, res) => {
  const { userId, categoryId, name } = req.body;
  if (!userId || !categoryId || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const categoryRef = db.collection('categories').doc(categoryId);
    const doc = await categoryRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const categoryData = doc.data();
    if (categoryData.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await categoryRef.update({ name });
    res.json({ success: true });
  } catch (error) {
    console.error('Error editing category:', error);
    res.status(500).json({ error: 'Failed to edit category' });
  }
});

// Delete category
router.delete('/delete', async (req, res) => {
  const { userId, categoryId } = req.body;
  if (!userId || !categoryId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const categoryRef = db.collection('categories').doc(categoryId);
    const doc = await categoryRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const categoryData = doc.data();
    if (categoryData.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await categoryRef.delete();
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;




