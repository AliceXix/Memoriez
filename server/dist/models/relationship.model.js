"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const relationshipSchema = new mongoose_1.Schema({
    type: {
        type: String,
    },
});
const Relationship = (0, mongoose_1.model)("Relationship", relationshipSchema);
exports.default = Relationship;
//# sourceMappingURL=relationship.model.js.map