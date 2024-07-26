const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    product: { type: String, required: true },
    vendor: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitCost: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', saleSchema);
