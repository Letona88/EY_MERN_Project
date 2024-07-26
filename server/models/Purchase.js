const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    product: { type: String, required: true },
    vendor: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);