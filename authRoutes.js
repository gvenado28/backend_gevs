// authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Importa el modelo User
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

// Ruta para verificar si el nombre de usuario o correo ya existen
router.post('/check-availability', async (req, res) => {
  const { username, email } = req.body;

  try {
    const userByUsername = await User.findOne({ where: { username } });
    const userByEmail = await User.findOne({ where: { email } });

    if (userByUsername) {
      return res.status(409).json({ message: 'El nombre de usuario ya está en uso.' });
    }
    if (userByEmail) {
      return res.status(409).json({ message: 'El correo electrónico ya está en uso.' });
    }

    return res.status(200).json({ message: 'Disponible' });
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    return res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
  }

  try {
    // Verificar si el correo o el nombre de usuario ya existen
    const existingUserByEmail = await User.findOne({ where: { email } });
    const existingUserByUsername = await User.findOne({ where: { username } });

    if (existingUserByEmail) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario con el rol especificado
    const newUser = await User.create({ username, email, password: hashedPassword, role });
    
    // Generar un token JWT
    const token = jwt.sign({ email: newUser.email, role: newUser.role }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      token,
      user: { username: newUser.username, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

module.exports = router;
