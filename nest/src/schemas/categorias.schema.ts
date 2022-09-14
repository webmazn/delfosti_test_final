import { Schema } from 'mongoose';

export const CategoriasSchema  = new Schema ({
    name: String,
    slug: String
});