const { Schema, model} = require("mongoose")

const userSchema : String = new Schema(
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
            type: [{type : Schema.Types.ObjectId, ref: 'Relationship'}]
        }
    }
);

const User : Object = model("User", userSchema);

module.exports = User;