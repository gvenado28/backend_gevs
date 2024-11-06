// models/PETCapture.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Asegúrate de que esta ruta sea correcta
const User = require('./User'); // Importa el modelo de usuario para establecer la relación

// Definición del modelo PETCapture
const PETCapture = sequelize.define('PETCapture', {
    capture_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    weight_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    price_usd: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    price_mxn: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    userId: {  // Relación con el usuario
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'pet_capture',
    timestamps: false,
});

// Relación: cada captura de PET pertenece a un usuario
PETCapture.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = PETCapture;
