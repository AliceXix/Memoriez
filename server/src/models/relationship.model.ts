import { Schema, model } from "mongoose";

export interface RelationshipType {
  type: string
}

const relationshipSchema = new Schema<RelationshipType>({
  type: {
    type: String,
  },
});

const Relationship = model<RelationshipType>("Relationship", relationshipSchema);


export default Relationship;