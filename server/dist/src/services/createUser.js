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
exports.createUser = void 0;
function createUser(userModel, userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = userModel.create({
            username: String = userInput.username,
            mail: String = userInput.mail,
        });
        return newUser;
    });
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