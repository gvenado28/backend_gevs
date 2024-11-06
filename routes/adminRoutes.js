// routes/adminRoutes.js
const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ejemplo de ruta protegida para administradores
router.get('/admin-dashboard', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Bienvenido al panel de administración.' });
});

module.exports = router;
