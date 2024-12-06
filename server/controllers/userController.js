const db = require('../databaseConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO User (Name, Email, Password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.status(201).json({ message: 'User registered successfully!' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM User WHERE Email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to login user' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in successfully!', token });
  });
};
