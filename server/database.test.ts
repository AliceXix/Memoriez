const mongoose = require('mongoose');
require('dotenv').config();

describe('User CRUD', () => {
    let connection : any;
    let db : any;
    const users : any = mongoose.model("test_"+process.env.COLLECTION,mongoose.Schema({
        username: String,
        mail: String
    }));

    beforeAll(async () => {
        connection = await
    mongoose.connect('mongodb://localhost:27017/test_'+process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology: true});
        let db : any = mongoose.connection;
        const collection = process.env.COLLECTION;
        await db.createCollection(collection);
    });

    afterAll(async () => {
        const collection : any = "test_"+process.env.COLLECTION;
        await db.dropCollection(collection);
        await db.dropDatabase();
        await db.close();
        await connection.close();
    });

    test("Add User POST /user", async () => {
        const response : any = await users.create({
            username: process.env.USER_NAME,
            mail: process.env.USER_EMAIL
        });
            await response.save();
            expect(response.name).toBe(process.env.USER_NAME);
    });
})