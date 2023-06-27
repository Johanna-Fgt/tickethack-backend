var express = require('express');
var router = express.Router();
const Product = require('../models/products');
const Trip = require('../models/trips');
const { checkBody } = require('../modules/utils');

/* POST /products */
router.post('/', (req, res) => {
	const { id } = req.body;

	Product.findById(id).then((d) => {
		// If product already in cart
		if (d) {
			res.json({ result: false, error: 'Product already in cart' });
		} else {
			// If product is not in cart - find it trips list
			Trip.findById(id).then((trip) => {
				const { departure, arrival, date, price } = trip;

				const newProduct = new Product({
					departure,
					arrival,
					date,
					price,
					paid: false,
				});
				newProduct.save().then(res.json({ result: true, product: newProduct }));
			});
		}
	});
});

/* GET /products */
router.get('/', (req, res) => {
	Product.find({ paid: false }).then((data) =>
		data.length > 0
			? res.json({ result: true, products: data })
			: res.json({ result: false })
	);
});

/* GET /products/paid */
router.get('/paid', (req, res) => {
	Product.find({ paid: true }).then((data) =>
		data.length > 0
			? res.json({ result: true, products: data })
			: res.json({ result: false })
	);
});

/* DELETE /products/delete */
router.delete('/delete', (req, res) => {
	const { id } = req.body;
	Product.deleteOne({ _id: id }).then((deletedProduct) =>
		deletedProduct.deletedCount > 0
			? res.json({ result: true })
			: res.json({ result: false, error: 'Product not found' })
	);
});

/* UPDATE /products/paid */
router.put('/paid', (req, res) => {
	const { ids } = req.body;

	// Update every product paid status to true
	for (let i = 0; i < ids.length; i++) {
		Product.updateOne({ _id: ids[i] }, { paid: true });
	}

	// If all products were modified
	Product.find({ paid: true }).then((data) =>
		data.length === ids.length
			? res.json({ result: true })
			: res.json({ result: false, error: 'All products not updated' })
	);
});

module.exports = router;
