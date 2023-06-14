import { UserModel } from '@src/interfaces/IUser';
import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';

export enum CUSTOM_VALIDATION {
    DUPLICATED = 'DUPLICATED',
}

const schema = new mongoose.Schema<UserModel>(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: { type: String, required: true },
    },
    {
        toJSON: {
            transform: (_, ret): void => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

// Validando se o email já existe no banco de dados
schema.path('email').validate(
    async (email: string) => {
        const emailCount = await mongoose.models.User.countDocuments({ email });
        return !emailCount;
    },
    'already exists in the database.',
    CUSTOM_VALIDATION.DUPLICATED
);

// Criando uma função para incriptar a senha do usuário
export async function hashPassword(
    password: string,
    salt = 10
): Promise<string> {
    return bcrypt.hash(password, salt);
}

// Criando uma função para comparar a senha dos usuário
export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

export const User: Model<UserModel> = mongoose.model('User', schema);
