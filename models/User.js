const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Ajusta esta ruta

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: true, // Habilita automáticamente createdAt y updatedAt
});

// Sincroniza el modelo con la base de datos
User.sync()
  .then(() => {
    console.log('Modelo User sincronizado con la base de datos.');
  })
  .catch(err => {
    console.error('Error al sincronizar el modelo User:', err);
  });

module.exports = User;
