import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db';

const app = express();
const port = 3000;

import { createUser } from './services/createUser';
import { doesUserExists } from './services/loginUser';
const User = require('./models/user.model');

app.use(cors({
	origin: '*'
}));

app.use(bodyParser.json())

//@ts-ignore
app.listen(port, err => {
	console.log("Listening and we know of cors:", cors);
	if (err) {
		return console.error(err);
	}
	return console.log(`server is listening on ${port}`);
});

const register = app.post('/api/register', (req, res, next) => {

	// Read input from request
	const userInput : object = req.body;

	// Create user from request
	try {
		createUser(User, userInput);
	}
	catch(err: unknown) {
		console.log(err)
	}

	// Return response from created user
	res.send({message:"success"})
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