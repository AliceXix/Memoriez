import express from 'express';

const app = express();
const port = 3000;

import { createUser } from './services/createUser';
const User = require('./models/user.model');

//@ts-ignore
app.listen(port, err => {
	if (err) {
		return console.error(err);
	}
	return console.log(`server is listening on ${port}`);
});

const register = app.post('/', (req, res, next) => {
	// Read input from request
	const userInput = req.body;
	// Create user from request
	createUser(User, req.body);
	

	// Return response from created user

});