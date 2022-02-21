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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./db");
const app = (0, express_1.default)();
const port = 3000;
const user_model_1 = __importDefault(require("./models/user.model"));
const memory_model_1 = __importDefault(require("./models/memory.model"));
const person_model_1 = __importDefault(require("./models/person.model"));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(body_parser_1.default.json());
//@ts-ignore
app.listen(port, (err) => {
    console.log("Listening and we know of cors:", cors_1.default);
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
const register = app.post("/api/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Read input from request
    const userInput = req.body;
    function createUser(userModel, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield userModel.create({
                username: userInput.username,
                mail: userInput.mail,
            });
            return newUser;
        });
    }
    const newUser = yield createUser(user_model_1.default, userInput);
    // Return response from created user
    res.send({ user: `${newUser}` });
}));
const login = app.post("/api/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //read input from request
    const { username, mail } = req.body;
    console.log(`this is user ${username}, ${mail}`);
    console.log(username);
    function getUser(userModel, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = userModel.findOne({ username });
            return userId;
        });
    }
    let userID = yield getUser(user_model_1.default, username);
    console.log(`this is user id ${userID}`);
    console.log(userID._id);
    if (!userID) {
        res.send({ message: "this user does not exist" });
    }
    else {
        //res.send({message: 'this worked fine'})
        res.send({ id: `${userID._id}` });
    }
}));
const getInfosFromDB = app.get("/api/dashboard/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //read input from request
    const id = req.params;
    if (!id) {
        res.send({ message: "something went wrong big time" });
    }
    console.log("this is the URLInput");
    console.log(id.id);
    function getUserById(userModel, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = userModel.findById(id);
            return user;
        });
    }
    let user = yield getUserById(user_model_1.default, id.id);
    console.log("this comes from api dashboard and is the user");
    console.log(user);
    if (!user) {
        res.send({ message: "this user does not exist" });
    }
    //no you do not need a "getPerson" because Person is part of the property circle of User
    //------------------//
    function getMemories(memoryModel, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let memories = memoryModel.find({ author: `${id}` });
            return memories;
        });
    }
    let memory = yield getMemories(memory_model_1.default, id.id);
    console.log("this comes from api dashboard and are the memories");
    console.log(memory);
    if (!memory) {
        res.send({ message: "this user does not have any memories yet" });
    }
    res.send({ memory: `${memory}`, user: `${user}` });
}));
const getPersonDetails = app.get("/api/person/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    if (!id) {
        res.send({ message: "something went wrong big time" });
    }
    else {
        res.send({ message: "this is your infos" });
    }
    function getPersonById(model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let person = yield model.findById({ id });
            return person;
        });
    }
    let personDetails = yield getPersonById(person_model_1.default, id);
}));
const addMemory = app.post("/api/add-memory", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //const id = req.params;
    const userInput = req.body;
    // if (!id) {
    //   res.send({ message: "something went wrong big time" });
    // }
    function addMemory(model, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMemory = yield model.create({
                title: input.title,
                text: input.text,
                author: input.author,
                person: input.person
            });
            return newMemory;
        });
    }
    const newMemory = yield addMemory(memory_model_1.default, userInput);
    res.send({ memory: `${newMemory}` });
}));
const addPerson = app.post("/api/add-person", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //const id = req.params;
    const userInput = req.body;
    // if (!id) {
    //   res.send({ message: "something went wrong big time" });
    // }
    function addPerson(model, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMemory = yield model.create({
                name: input.name,
                relationship: input.relationship,
            });
            return newMemory;
        });
    }
    const newPerson = yield addPerson(person_model_1.default, userInput);
    res.send({ person: `${newPerson}` });
}));
//# sourceMappingURL=app.js.map