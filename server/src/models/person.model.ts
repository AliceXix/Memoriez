const personSchema : object = new Schema(
    {
        username: {
            type: String
        },
        mail: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        circle : {
            type: [{type : Schema.Types.ObjectId, ref: 'Relationship'}]
        }
    }
);

const Person : Object = model("Person", personSchema);

module.exports = User;