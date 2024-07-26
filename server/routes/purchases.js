const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Stock = require('../models/Stock');
const Sale = require('../models/Sale')
const mongoose = require('mongoose');

// Obtener todas las compras
router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/purchases', async (req, res) => {
    const { productId, product, vendor, quantity, unitCost, totalAmount } = req.body;

    try {
        // Crear y guardar la nueva compra
        const newPurchase = new Purchase({ productId, product, vendor, quantity, unitCost, totalAmount });
        await newPurchase.save();

        // Verificar y actualizar el stock
        const stockItem = await Stock.findOne({ productId });
        if (stockItem) {
            stockItem.quantity += quantity;
            await stockItem.save();
        } else {
            const newStockItem = new Stock({
                productId,
                product,
                vendor,
                quantity,
                unitCost
            });
            await newStockItem.save();
        }

        res.status(201).json(newPurchase);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Añadir nueva venta
router.post('/sales', async (req, res) => {
    const { productId, quantity, unitCost, totalAmount } = req.body;

    try {
        const stockItem = await Stock.findOne({ productId });
        if (!stockItem) {
            throw new Error('Producto no encontrado en el stock.');
        }
        if (stockItem.quantity < quantity) {
            throw new Error('Cantidad insuficiente en stock.');
        }

        stockItem.quantity -= quantity;
        await stockItem.save();

        const newSale = new Sale({
            productId,
            product: stockItem.product,
            vendor: stockItem.vendor,
            quantity,
            unitCost,
            totalAmount
        });
        await newSale.save();

        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});





// En tu archivo de rutas de Express, asumiendo que tienes un modelo Stock
router.get('/stock-items', async (req, res) => {
    try {
        const stockItems = await Stock.find({});
        res.json(stockItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
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

module.exports = router;
