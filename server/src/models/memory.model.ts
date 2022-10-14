import { Schema, model, Model } from 'mongoose';
import { PersonType } from './person.model';

export interface MemoryType {
    title: string;
    text: string;
    author: string;
    person: PersonType;
    _id: string
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
            type: String,
        },
        person: {
            type:  Schema.Types.ObjectId, ref: 'Person',
        },
    }
);

const Memory = model<MemoryType>('Memory', memorySchema);

export default Memory;
