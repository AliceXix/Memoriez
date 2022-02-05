import { Schema, model } from "mongoose";

interface RelationshipType {
  type: string
}

const relationshipSchema = new Schema<RelationshipType>({
  type: {
    type: String,
  },
});

const Relationship = model<RelationshipType>("Relationship", relationshipSchema);


export default Relationship;