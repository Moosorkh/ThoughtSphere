import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

// Reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleString(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

export default reactionSchema;