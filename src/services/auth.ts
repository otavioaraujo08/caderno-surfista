import bcrypt from 'bcrypt';

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
}
