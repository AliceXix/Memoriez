import { Schema, model } from "mongoose";
//import { UserType } from "./user.model";
//import { PersonType } from "./person.model";

interface MemoryType {
  title: string,
  text: string,
  author: any[], //TODO
  person: any[] //TODO
}

const memorySchema = new Schema<MemoryType>(
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

export default Memory;
