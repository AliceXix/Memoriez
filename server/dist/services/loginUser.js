"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesUserExists = void 0;
function doesUserExists(userModel, userInput) {
    const userFromDB = userModel.findOne({
        username: userInput.username,
        mail: userInput.mail,
    });
    return userFromDB;
}
exports.doesUserExists = doesUserExists;
//# sourceMappingURL=loginUser.js.map