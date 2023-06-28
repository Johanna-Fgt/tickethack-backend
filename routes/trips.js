var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const { checkBody } = require('../modules/utils');

/* POST Trip */
router.post('/', (req, res) => {
	const { departure, arrival, date } = req.body;

	// Check if body's data are valid
	let reqIsValid = checkBody(req.body, ['departure', 'arrival', 'date']);

	if (!reqIsValid) {
		res.json({ result: false, error: 'Missing or empty fields' });
	} else {
		//Find the corresponding elements in db
		Trip.find({ departure, arrival }).then((d) => {
			if (d) {
				// Reture trips on same day only
				let trips = d.filter(
					(el) =>
						new Date(el.date).getTime() > new Date(date).getTime() &&
						new Date(el.date).getTime() <
							new Date(date).setDate(new Date(date).getDate() + 1)
				);
				res.json({ result: true, trips });
			} else {
				// Trip not found
				res.json({
					result: false,
					error: 'No corresponding trip for this day',
				});
			}
		});
	}
});

module.exports = router;
