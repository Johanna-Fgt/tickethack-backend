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
	Product.find().then(data => {
		
		if (data) {
			res.json({ result: true, product: data});
		  } else { 
			res.json({ result: false});
		  }
  });
}); 

module.exports = router;
