// backend/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/add', categoryController.addCategory);
router.get('/user/:userId', categoryController.getCategories);

module.exports = router;
