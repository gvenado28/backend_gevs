// config/sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Importa dotenv para acceder a las variables de entorno

// Crear la instancia de Sequelize con las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: console.log, // Para ver todas las consultas SQL ejecutadas
  }
);

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// config/sequelize.js
sequelize.sync()
  .then(() => {
    console.log('Sincronización de modelos con la base de datos completada.');
  })
  .catch(err => {
    console.error('Error al sincronizar los modelos:', err);
  });


// Exportar la instancia de sequelize
module.exports = sequelize;
