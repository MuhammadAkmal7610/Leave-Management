import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
    userId: string;
    message: string;
    createdAt?: Date;
}

const ChatSchema = new Schema(
    {
        userId: { type: String, required: true },
        message: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const Chat = mongoose.model<IChat>('Chat', ChatSchema);
