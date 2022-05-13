import { Schema, model } from "mongoose";
import { MemoryType } from "./memory.model";
import { PersonType } from "./person.model";

export interface UserType {
  username: string;
  mail: string;
  password: string;
  circle: PersonType[];
  favorites : MemoryType[];
}


const userSchema = new Schema<UserType>({
    username: {
        type: String,
    },
    mail: {
        type: String,
    },
    password: {
        type: String,
    },
    circle: {
        type: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    },
    favorites: {
        type: [{ type: Schema.Types.ObjectId, ref: "Memory" }],
    },
});

const User= model<UserType>("User", userSchema);

export default User