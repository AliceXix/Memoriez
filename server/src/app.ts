import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db';

const app = express();
const port = 3000;

import { createUser } from './services/createUser';
import { doesUserExists } from './services/loginUser';
import { getUserFromDB } from './services/getUserFromDB';
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
	console.log(userInput)

	// Create user from request
	try {
		createUser(User, userInput);
	}
	catch(err: unknown) {
		console.log(err)
	}

	// Return response from created user
	res.send({message: "success"})
});



const login = app.post('/api/login', async (req, res, next) => {
	//read input from request
	const {username, mail} = req.body;

	//let userDB = await doesUserExists(User, userInput);


	//TEST//

	

	console.log(`this is user ${username}, ${mail}`)
	console.log(username)

	async function getUser(userModel:any, username:any) {

		let userId = userModel.findOne({username})
		return userId
}

let userID: any = await getUser(User, username);

console.log(`this is user id ${userID}`)
console.log(userID._id)

	if (!userID) {
		res.send({message: 'this user does not exist'})
	} else {
		//res.send({message: 'this worked fine'})
		res.send({id: `${userID._id}`})
	}
});


const getProfileInfo = app.get('api/dashboard/:id', async (req, res, next) => {

	//read input from request
	const id = req.params;

	console.log('this is the URLInput' + id)
	//get the user in DB
	//let userFromDB = await getUserFromDB(User, URLInput)

	async function getUserId(Usermodel:any , userid:any) {
		let userId: any = Usermodel.findByID({userid})
		return userId
	}

	let userId: any = await getUserId(User, id)

	console.log("this comes from api dashboard")
	console.log(userId)

	if (!id) {
		res.send({message: 'something went wrong big time'})
	} else {
		res.send({message: 'this is your dashboard'})
	}

});

// const getUserId = app.get('api/userId', async (req, res, next) => {
// 	console.log(req)
// })