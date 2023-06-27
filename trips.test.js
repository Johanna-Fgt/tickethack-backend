const request = require('supertest');
const app = require('./app');

// Renvoie les voyages correspondant à la selection GET /trips
it('POST /trips', async () => {
	const res = await request(app).post('/trips').send({
		departure: 'Paris',
		arrival: 'Lyon',
		date: '2023-07-11T05:34:44.810Z',
	});

	expect(res.statusCode).toBe(200);
	expect(res.body.trips).toEqual([
		{
			_id: '649a9a280d610d0d0e79f0d6',
			departure: 'Paris',
			arrival: 'Lyon',
			date: '2023-07-11T07:58:09.315Z',
			price: 54,
		},
	]);
});
