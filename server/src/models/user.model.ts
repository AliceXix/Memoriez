import { Schema, model } from "mongoose";
import { PersonType } from "./person.model";

export interface UserType {
  username: string;
  mail: string;
  password: string;
  circle: PersonType[];
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

export default User