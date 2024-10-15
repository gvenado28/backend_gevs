const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

module.exports = router;
