"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = __importDefault(require("../utils/index"));
mongoose
    .connect(index_1.default)
    .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
    .catch((err) => {
    console.error("Error connecting to mongo: ", err);
});
exports.default = mongoose;
//# sourceMappingURL=index.js.map