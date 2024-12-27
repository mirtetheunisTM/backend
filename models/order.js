const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    city: String,
    state: String,
    items: Array,
    total: Number,
    status: { 
        type: String, 
        enum: ['in productie', 'verzonden', 'geleverd', 'geannuleerd', 'teruggestuurd'],
        default: 'in productie'
    },
    date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order