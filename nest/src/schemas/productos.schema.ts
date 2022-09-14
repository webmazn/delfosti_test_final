import { Schema } from 'mongoose';

export const ProductosSchema = new Schema({
    name:  {
        type: String,
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorias'
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Marcas'
    },
    slug: String,
    status: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
});