//let { Schema, model} = require("mongoose")

const personSchema : object = new Schema(
    {
        name: {
            type: String
        },
    },
    {
        relationship : {
            type: [{type : Schema.Types.ObjectId, ref: 'Relationship'}]
        }
    }
);

const Person : Object = model("Person", personSchema);

module.exports = Person;