const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Obtener todas las compras
router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id);
        res.json(purchase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva compra
router.post('/', async (req, res) => {
    const purchases = req.body;  // Asume que req.body es un array
    try {
        const newPurchases = await Purchase.insertMany(purchases);
        res.status(201).json(newPurchases);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar una compra
router.patch('/:id', async (req, res) => {
    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPurchase);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una compra
router.delete('/:id', async (req, res) => {
    try {
        const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
        res.json({ message: 'Purchase deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;