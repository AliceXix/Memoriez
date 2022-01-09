const { Schema, model } = require("mongoose");
const userSchema = new Schema({
    username: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    }
}, {
    circle: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Relationship' }]
    }
});
const User = model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.model.js.map