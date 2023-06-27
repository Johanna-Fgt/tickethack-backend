const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
	departure: String,
	arrival: String,
	hour: Date,
	price: Number,
	paid: Boolean,
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;
