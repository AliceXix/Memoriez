"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memorySchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    author: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    },
    person: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Person" }],
    },
});
const Memory = (0, mongoose_1.model)("Memory", memorySchema);
exports.default = Memory;
//# sourceMappingURL=memory.model.js.map