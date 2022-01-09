"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const createUser_1 = require("./services/createUser");
const loginUser_1 = require("./services/loginUser");
const User = require('./models/user.model');
console.log(cors_1.default);
app.use((0, cors_1.default)({
    origin: '*'
}));
//@ts-ignore
app.listen(port, err => {
    console.log("Listening and we know of cors:", cors_1.default);
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
const register = app.post('/api/register', (req, res, next) => {
    console.log('test2' + req.body);
    // Read input from request
    const userInput = req.body;
    // Create user from request
    (0, createUser_1.createUser)(User, req.body);
    // Return response from created user
    res.send(`this is the new created user`);
});
const login = app.post('/api/login', (req, res, next) => {
    //read input from request
    const username = req.body.username;
    //check if user exists in db
    try {
        (0, loginUser_1.doesUserExists)(User, username);
    }
    catch (error) {
        res.send(error);
    }
    //return response
    res.send('log this user in');
});
//# sourceMappingURL=app.js.map