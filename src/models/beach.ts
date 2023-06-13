import { Beach as IBeach } from '@src/interfaces/IBeach';
import mongoose, { Model } from 'mongoose';

// Definindo o schema do banco de dados
const schema = new mongoose.Schema<IBeach>(
    {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        name: { type: String, required: true },
        position: { type: String, required: true },
    },
    {
        // Transformando em JSON
        toJSON: {
            transform: (_, ret): void => {
                // Transformando o _id do banco em id do JSON e deletando os campos padrões do mongo do nosso JSON
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

export const Beach: Model<IBeach> = mongoose.model('Beach', schema);
