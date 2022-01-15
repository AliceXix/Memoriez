const mongoose = require('mongoose');
require('dotenv').config();

import { createUser } from '../services/createUser';
import { doesUserExists } from '../services/loginUser';

describe('User CRUD', () => {
    let connection : any;
    let db : any;
    const userModel : any = mongoose.model("test_"+process.env.COLLECTION,mongoose.Schema({
        username: String,
        mail: String
    }));

    beforeAll(async () => {
        connection = await
    mongoose.connect('mongodb://localhost:27017/test_'+process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology: true});
        db = mongoose.connection;
        const collection = process.env.COLLECTION;
        await db.createCollection(collection);
    });

    afterAll(async () => {
        const collection : any = "test_"+process.env.COLLECTION;
        await db.dropCollection(collection);
        await db.dropDatabase();
        await db.close();
    });

    test("Add User POST /user", async () => {
        const userInput : any  = {
            username: 'Alice',
            mail: 'alice@alice.com'
        };

        const createdUser : any = await createUser(userModel, userInput);
        expect(createdUser.username).toBe(userInput.username);
    });

    test("Login User POST /user", async() => {
        const username : string = 'Alice'

        const userFromDB : any = await doesUserExists(userModel, username);
        expect(userFromDB.username).toBe(username)
    });

});