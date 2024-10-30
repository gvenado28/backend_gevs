const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Importa dotenv para acceder a las variables de entorno

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

// Definición del modelo con nombre de tabla en mayúsculas
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Users', // Asegura el uso de nombre de tabla en mayúsculas
  freezeTableName: true, // Impide que Sequelize cambie el nombre de la tabla
});

// Conexión y sincronización
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Sincronización de modelos con la base de datos completada.');
  })
  .catch(err => {
    console.error('Error al sincronizar los modelos:', err);
  });

// Exportar tanto sequelize como User
module.exports = { sequelize, User };
