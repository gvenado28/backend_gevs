// app.js
const express = require('express');
const cors = require('cors'); // Importa CORS
const sequelize = require('./config/sequelize'); // Importa la conexión de Sequelize
const authRoutes = require('./authRoutes'); // Importa las rutas de autenticación
const petRoutes = require('./petRoutes'); // Importa las rutas de PET

const app = express();
const port = process.env.PORT || 5000;

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',  // Agrega este origen para solicitudes desde localhost:5000
  'http://54.177.153.3',
  'http://54.177.153.3:5000',
  'http://54.177.153.3:3000' // Agrega el nuevo origen aquí
];

// Opciones de CORS
const corsOptions = {
  origin: (origin, callback) => {
    console.log('Origen de la solicitud:', origin); // Verifica el origen de la solicitud
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Origen no permitido:', origin);
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Incluye OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middleware global para CORS
app.use(cors(corsOptions));

// Middleware para solicitudes OPTIONS específicamente
app.options('*', cors(corsOptions));

// Middlewares para JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware adicional para cabeceras CORS en todas las respuestas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir todos los orígenes para pruebas
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Prueba de conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Rutas de autenticación y PET
app.use('/api/auth', authRoutes);
app.use('/api/pet', petRoutes);

// Ruta raíz para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Aplicación corriendo y conectada a la base de datos.');
});

// Exporta la aplicación
module.exports = app;
