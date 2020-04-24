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

const USERS = 'users';
const GITHUB_API_URL = 'https://api.github.com/';
const GITHUB_USERS_ENDPOINT = `${GITHUB_API_URL}${USERS}`;

app.get('/oauth', cors(corsOptions), function(req, res) {
	const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token';
	const CODE = req.query.code;

	console.log('@@@oauth/ RECEIVED GITHUB CODE: ', CODE);

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
			console.log('Successfully got token ' + response.data);
			res.send(response.data);
		})
		.catch(function(error) {
			console.warn('Error when getting token' + error.message);
		});
});

app.get(`/${USERS}`, cors(corsOptions), function(req, res) {
	const TOKEN = req.query.accessToken;

	console.log('@@@users/ RECEIVED TOKEN: ', TOKEN);

	axios({
		url: GITHUB_USERS_ENDPOINT,
		method: 'GET',
		headers: {
			Authorization: `token ${TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
			'Access-Control-Allow-Origin': '*',
		},
	})
		.then(function(response) {
			console.log('Successfully fetched users ' + response.data);
			res.send(response.data);
		})
		.catch(function(error) {
			console.warn('Error fetching users ' + error.message);
		});
});

app.listen(port, function() {
	console.log(`my-oauth listening on port ${port}!`);
});
