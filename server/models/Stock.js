const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    productId: { type: Number, required: true, unique: true },
    product: { type: String, required: true },
    vendor: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitCost: { type: Number, required: true },
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
