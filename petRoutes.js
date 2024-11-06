// petRoutes.js
const express = require('express');
const router = express.Router();
const PETCapture = require('./models/PETCapture');
const { authenticateToken } = require('./middlewares/authMiddleware'); // Asegúrate de la ruta correcta

// Ruta para registrar una nueva captura de PET
router.post('/pet-capture', authenticateToken, async (req, res) => {
    try {
        const { capture_date, weight_kg } = req.body;
        const userId = req.user.id; // Obtenemos el ID del usuario autenticado

        // Calcula los precios en USD y MXN
        const price_usd = weight_kg * 0.5;
        const conversionRate = 18;
        const price_mxn = price_usd * conversionRate;

        // Crea el registro de captura en la base de datos asociado al usuario
        const newCapture = await PETCapture.create({
            capture_date,
            weight_kg,
            price_usd,
            price_mxn,
            userId,
        });

        res.status(201).json(newCapture);
    } catch (error) {
        console.error('Error al registrar captura de PET:', error);
        res.status(500).json({ error: 'Error al registrar captura de PET' });
    }
});

// Ruta para obtener el reporte de capturas de PET del usuario autenticado
router.get('/pet-report', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Obtenemos el ID del usuario autenticado

        // Filtra las capturas del usuario autenticado
        const captures = await PETCapture.findAll({
            where: { userId },
            order: [['capture_date', 'DESC']],
        });

        res.status(200).json(captures);
    } catch (error) {
        console.error('Error al obtener reporte de PET:', error);
        res.status(500).json({ error: 'Error al obtener reporte de PET' });
    }
});

module.exports = router;
