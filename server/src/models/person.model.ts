import { Schema, model } from "mongoose";
import { RelationshipType } from "./relationship.model";

export interface PersonType {
  name: string;
  relationship: RelationshipType;
}

const personSchema = new Schema<PersonType>(
  {
    name: {
      type: String,
    },
    relationship: {
      type: [{ type: Schema.Types.ObjectId, ref: "Relationship" }],
    },
  }
);

const Person = model<PersonType>("Person", personSchema);

export default Person;