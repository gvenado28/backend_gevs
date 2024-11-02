// models/PETCapture.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Importa sequelize desde config

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
}, {
    tableName: 'pet_capture',
    timestamps: false,
});

module.exports = PETCapture;
