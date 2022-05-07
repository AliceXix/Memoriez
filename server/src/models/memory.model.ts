import { Schema, model, Model } from "mongoose";
import { UserType } from "./user.model";
import { PersonType } from "./person.model";

export interface MemoryType {
    title: string;
    text: string;
    author: UserType[];
    person: PersonType[];
}


export const memorySchema = new Schema<MemoryType>(
  {
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    author: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    person: {
        type: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    },
  }
);

const Memory = model<MemoryType>("Memory", memorySchema);
//TODO

export default Memory;
