import { UserModel } from '@src/interfaces/IUser';
import AuthService from '@src/services/auth';
import mongoose, { Model } from 'mongoose';

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

// Antes de salvar a senha do usuário, criptografar a senha
schema.pre<UserModel>('save', async function (): Promise<void> {
    // Se a senha não foi modificada, não realizar a criptografia
    if (!this.password || !this.isModified('password')) {
        return;
    }

    try {
        const hashedPassword = await AuthService.hashPassword(this.password);
        this.password = hashedPassword;
    } catch (error) {
        console.error(`Error hashing the password for the user ${this.name}`);
    }
});

export const User: Model<UserModel> = mongoose.model('User', schema);
