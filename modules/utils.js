const checkBody = (body, props) =>
	props.length === Object.keys(body).length &&
	props.every((key) => !!body[`${key}`]);

module.exports = {
	checkBody,
};
