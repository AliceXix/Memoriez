"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const personSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    relationship: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Relationship" }],
    },
    memories: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Memory" }]
    }
});
const Person = (0, mongoose_1.model)("Person", personSchema);
exports.default = Person;
//# sourceMappingURL=person.model.js.map