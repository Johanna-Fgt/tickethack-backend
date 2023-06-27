const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	departure: String,
	arrival: String,
	date: Date,
	price: Number,
	paid: Boolean,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
