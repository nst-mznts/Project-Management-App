import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
        },
        column: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Column',
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Task', TaskSchema);
