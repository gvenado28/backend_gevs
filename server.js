// server.js
require('dotenv').config(); // Carga las variables de entorno
const app = require('./app'); // Importa la aplicación desde app.js
const sequelize = require('./config/sequelize'); // Importa la conexión a la base de datos
const PORT = process.env.PORT || 5000;
const cors = require('cors');

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




// Sincroniza la base de datos antes de iniciar el servidor
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
    
    // Inicia el servidor en el puerto especificado
    const server = app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

    // Manejador de error en caso de que el puerto ya esté en uso
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está en uso. Intenta detener otros procesos o cambiar el puerto.`);
      } else {
        console.error('Error en el servidor:', err);
      }
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
