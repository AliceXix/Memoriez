import { Schema, model } from "mongoose";

interface UserType {
    username: string,
    mail: string,
    password: string,
    circle: any[]
}

const userSchema = new Schema<UserType>(
    {
        username: {
            type: String
        },
        mail: {
            type: String
        },
        password: {
            type: String
        },
        circle : {
            type: [{type : Schema.Types.ObjectId, ref: 'Person'}]
        }
    }
);

const User= model<UserType>("User", userSchema);

//module.exports = User;
export default User