// backend/controllers/expenseController.js
const db = require('../db');

exports.addExpense = (req, res) => {
  const { userId, categoryId, amount, date, description } = req.body;
  const sql = 'INSERT INTO Expense (UserID, CategoryID, Amount, Date, Description) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userId, categoryId, amount, date, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Expense added successfully' });
  });
};

exports.getExpenses = (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM Expense WHERE UserID = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};
