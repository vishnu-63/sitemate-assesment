import { Schema, model } from 'mongoose';

const IssueSchema = new Schema({

    title: {
        type:String,
        required: [true, 'Title is required']

    },
    description: {
        type:String,
        required: [true, 'Description is required']
    }
}, {
    timestamps: true
});

export default model('Issue', IssueSchema);
