const memorySchema : object = new Schema(
    {
        title: {
            type: String
        },
        text: {
            type: String
        },
    },
    {
        author : {
            type: [{type : Schema.Types.ObjectId, ref: 'User'}]
        }
    },
    {
        person : {
            type: [{type : Schema.Types.ObjectId, ref: 'Person'}]
        }
    }
);

const Memory : Object = model("Memory", memorySchema);

module.exports = Memory;