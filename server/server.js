var axios = require('axios');
var express = require('express');
var app = express();
var config = require('./config');
var cors = require('cors');

const port = process.env.PORT || 5000;

var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
};

app.get('/oauth', cors(corsOptions), function(req, res) {
	const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token';
	const CODE = req.query.code;

	console.log('@@@@@@@@@@@@@@RECEIVED GITHUB CODE: ', CODE);

	axios({
		method: 'POST',
		url: GITHUB_AUTH_ACCESSTOKEN_URL,
		data: {
			client_id: config.CLIENT_ID,
			client_secret: config.CLIENT_SECRET,
			code: CODE,
		},
	})
		.then(function(response) {
			console.log('Success ' + response.data);
			res.send(response.data);
		})
		.catch(function(error) {
			console.error('Error ' + error.message);
		});
});

app.listen(port, function() {
	console.log(`my-oauth listening on port ${port}!`);
});
