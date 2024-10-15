const { Sequelize } = require('sequelize');

// Configuración de la conexión con MySQL en Google Cloud SQL
const sequelize = new Sequelize('pgbdb', 'root', 'linux', {
  host: '/cloudsql/static-emblem-438517-d7:us-central1:pgb1234',
  dialect: 'mysql',
  logging: false
});

// Función para autenticar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos MySQL realizada exitosamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos MySQL:', err);
  });

module.exports = sequelize;
