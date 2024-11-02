// petRoutes.js
const express = require('express');
const router = express.Router();
const PETCapture = require('./models/PETCapture');

// Ruta para registrar una nueva captura de PET
router.post('/pet-capture', async (req, res) => {
    try {
        const { capture_date, weight_kg } = req.body;

        // Calcula los precios en USD y MXN
        const price_usd = weight_kg * 0.5;
        const conversionRate = 18;
        const price_mxn = price_usd * conversionRate;

        // Crea el registro de captura en la base de datos
        const newCapture = await PETCapture.create({
            capture_date,
            weight_kg,
            price_usd,
            price_mxn,
        });

        // Responde con el registro creado
        res.status(201).json(newCapture);
    } catch (error) {
        console.error('Error al registrar captura de PET:', error);
        res.status(500).json({ error: 'Error al registrar captura de PET' });
    }
});

// Ruta para obtener el reporte de capturas de PET
router.get('/pet-report', async (req, res) => {
    try {
        const captures = await PETCapture.findAll({
            order: [['capture_date', 'DESC']],
        });
        res.status(200).json(captures);
    } catch (error) {
        console.error('Error al obtener reporte de PET:', error);
        res.status(500).json({ error: 'Error al obtener reporte de PET' });
    }
});

module.exports = router;
