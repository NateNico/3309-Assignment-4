// backend/controllers/categoryController.js
const db = require('../db');

exports.addCategory = (req, res) => {
  const { userId, name } = req.body;
  const sql = 'INSERT INTO Category (UserID, Name) VALUES (?, ?)';
  db.query(sql, [userId, name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Category added successfully' });
  });
};

exports.getCategories = (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM Category WHERE UserID = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};
