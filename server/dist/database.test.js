"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
require('dotenv').config();
const createUser_1 = require("./src/services/createUser");
const loginUser_1 = require("./src/services/loginUser");
describe('User CRUD', () => {
    let connection;
    let db;
    const userModel = mongoose.model("test_" + process.env.COLLECTION, mongoose.Schema({
        username: String,
        mail: String
    }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield mongoose.connect('mongodb://localhost:27017/test_' + process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
        db = mongoose.connection;
        const collection = process.env.COLLECTION;
        yield db.createCollection(collection);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const collection = "test_" + process.env.COLLECTION;
        yield db.dropCollection(collection);
        yield db.dropDatabase();
        yield db.close();
    }));
    test("Add User POST /user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userInput = {
            username: 'Alice',
            mail: 'alice@alice.com'
        };
        const createdUser = yield (0, createUser_1.createUser)(userModel, userInput);
        expect(createdUser.username).toBe(userInput.username);
    }));
    test("Login User POST /user", () => __awaiter(void 0, void 0, void 0, function* () {
        const username = 'Alice';
        const userFromDB = yield (0, loginUser_1.doesUserExists)(userModel, username);
        expect(userFromDB.username).toBe(username);
    }));
});
//# sourceMappingURL=database.test.js.map