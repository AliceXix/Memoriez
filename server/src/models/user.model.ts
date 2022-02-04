let { Schema, model} = require("mongoose")

const userSchema : object = new Schema(
    {
        username: {
            type: String
        },
        mail: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        circle : {
            type: [{type : Schema.Types.ObjectId, ref: 'Person'}]
        }
    }
);

const User : Object = model("User", userSchema);

module.exports = User;