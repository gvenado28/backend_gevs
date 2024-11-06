// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

// Middleware para verificar y autenticar el token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  // Verificar si el token está presente en los encabezados
  if (!token) return res.status(403).json({ message: 'Token no proporcionado.' });

  try {
    // Decodificar el token y verificarlo
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Asignar los datos decodificados al objeto de la solicitud
    next(); // Continuar al siguiente middleware o ruta
  } catch (err) {
    // Enviar una respuesta de error si el token es inválido
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  // Comprobar el rol del usuario en el token decodificado
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No tienes permisos de administrador.' });
  }
  next(); // Continuar al siguiente middleware o ruta si es administrador
};

module.exports = { authenticateToken, isAdmin };
