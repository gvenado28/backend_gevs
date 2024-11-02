// app.js
const express = require('express');
const cors = require('cors'); // Importa CORS
const sequelize = require('./config/sequelize'); // Importa la conexión de Sequelize
const authRoutes = require('./authRoutes'); // Importa las rutas de autenticación
const petRoutes = require('./petRoutes'); // Importa las rutas de PET

const app = express();
const port = process.env.PORT || 5000;

// Middleware para habilitar CORS
app.use(cors()); // Permite solicitudes desde cualquier origen

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Prueba de conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Rutas de autenticación
app.use('/api/auth', authRoutes); // Usa las rutas de autenticación con el prefijo /api/auth

// Rutas de captura de PET
app.use('/api/pet', petRoutes); // Usa las rutas de PET con el prefijo /api/pet

// Ruta raíz para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Aplicación corriendo y conectada a la base de datos.');
});

module.exports = app; // Exporta la aplicación para pruebas o configuración adicional
