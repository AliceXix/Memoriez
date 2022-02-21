"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
    circle: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Person' }]
    }
});
const User = (0, mongoose_1.model)("User", userSchema);
//module.exports = User;
exports.default = User;
//# sourceMappingURL=user.model.js.map