const { Sequelize } = require('sequelize');
require('dotenv').config(); // Importa dotenv para acceder a las variables de entorno

// Configura la conexión con las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT, // Aquí especificamos el dialecto (postgres)
    logging: false, // Opcional: para deshabilitar el logging de Sequelize
  }
);

// Verificación de la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
