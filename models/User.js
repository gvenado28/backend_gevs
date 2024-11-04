// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Asegúrate de que esta ruta sea correcta

// Define el modelo de usuario
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
  tableName: 'users', // Nombre de la tabla en la base de datos
  timestamps: false, // Desactiva los timestamps automáticos (createdAt y updatedAt)
});

module.exports = User; // Exporta el modelo para que pueda ser usado en otras partes de la aplicación
