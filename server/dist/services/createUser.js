"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
function createUser(userModel, userInput) {
    console.log('printing2:');
    console.log(userInput.username);
    console.log(userInput.mail);
    const newUser = userModel.create({
        username: userInput.username,
        mail: userInput.mail,
    });
    console.log('printing:' + newUser);
    return newUser;
}
exports.createUser = createUser;
// TODO: In the future, create a Service Class that summarizes all User
// operations, like `createUser`, etc.
// class UserService {
//     createUser() {
//     },
//     findUser() {
//     },
//     checkIfUserIsAvailable() {
//     },
// }
//# sourceMappingURL=createUser.js.map