const mongoose = require('mongoose');
require('dotenv').config();

describe('User CRUD', () => {
    let connection : any;
    let db : any;
    const user : object = mongoose.model("test_"+process.env.COLLECTION,mongoose.Schema({
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
})