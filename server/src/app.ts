import express from 'express';

const app = express();
const port = 3000;

import { createUser } from './services/createUser';
import { doesUserExists } from './services/loginUser';
const User = require('./models/user.model');

//@ts-ignore
app.listen(port, err => {
	if (err) {
		return console.error(err);
	}
	return console.log(`server is listening on ${port}`);
});

const register = app.post('/api/register', (req, res, next) => {
	// Read input from request
	const userInput : object = req.body;

	// Create user from request
	createUser(User, req.body);

	// Return response from created user
	res.send(`this is the new created user`)
});

const login = app.post('/api/login', (req, res, next) => {
	//read input from request
	const username : string = req.body.username;

	//check if user exists in db
	try {
		doesUserExists(User, username)
	} catch (error) {
		res.send(error)
	}

	//return response
	res.send('log this user in')
});