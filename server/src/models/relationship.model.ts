const relationshipSchema: object = new Schema({
  type: {
    type: String,
  },
});

const Relationship: Object = model("Relationship", relationshipSchema);

module.exports = Relationship;
