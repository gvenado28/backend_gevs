// server.js
require('dotenv').config(); // Carga las variables de entorno
const app = require('./app'); // Importa la aplicación desde app.js
const sequelize = require('./config/sequelize'); // Importa la conexión a la base de datos
const PORT = process.env.PORT || 5000;

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
