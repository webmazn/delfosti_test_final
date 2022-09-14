import { Schema } from 'mongoose';

export const MarcasSchema = new Schema ({
    name: String,
    slug: String
});