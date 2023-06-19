import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { DecodeUser } from '@src/interfaces/IUser';

export default class AuthService {
    // Criando uma função para incriptar a senha do usuário
    public static async hashPassword(
        password: string,
        salt = 10
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    // Criando uma função para comparar a senha dos usuário
    public static async comparePassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    // Criando uma função para gerar o token do usuário
    public static generateToken(payload: object): string {
        const key: string = config.get('App.auth.key');
        const expiresIn: number = config.get('App.auth.tokenExpiresIn');

        return jwt.sign(payload, key, {
            expiresIn: expiresIn,
        });
    }

    public static decodeToken(token: string): DecodeUser {
        return jwt.verify(token, config.get('App.auth.key')) as DecodeUser;
    }
}
