import { Schema, model } from "mongoose";
import { RelationshipType } from "./relationship.model";
import { MemoryType } from "./memory.model";

export interface PersonType {
    name: string;
    relationship: RelationshipType[];
    memories: MemoryType[];
}


const personSchema = new Schema<PersonType>(
  {
    name: {
        type: String,
    },
    relationship: {
         type: [{ type: Schema.Types.ObjectId, ref: "Relationship" }],
    },
    memories: {
         type: [{type: Schema.Types.ObjectId, ref: "Memory" }]
    }
  }
);

const Person = model<PersonType>("Person", personSchema);
//TODO

export default Person;