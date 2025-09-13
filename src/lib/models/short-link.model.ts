import mongoose, { Document, Schema } from 'mongoose';

export interface IShortLink extends Document {
    shortCode: string;
    originalUrl: string;
    createdAt?: Date;
}

const shortLinkSchema: Schema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "30d",
    },
});

const ShortLink = mongoose.model<IShortLink>("ShortLink", shortLinkSchema);

export default ShortLink;
