// authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./config/sequelize'); // Importa User desde config/sequelize
const router = express.Router();

// Clave secreta para JWT desde variables de entorno
const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta'; // Cambia 'clave_secreta' por una clave segura

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validación de datos de entrada
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya está registrado.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = await User.create({ username, email, password: hashedPassword });
    
    // Generar un token JWT
    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'Usuario registrado correctamente', token, user: { username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validación de datos de entrada
  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ where: { email } });
    
    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Generar un token JWT
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Inicio de sesión exitoso', token, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

module.exports = router;
