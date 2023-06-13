import { User } from '@src/models/user';

describe('Users functional test', () => {
    // Apagando todos os usuários antes de cada teste
    beforeAll(async () => {
        await User.deleteMany({});
    });

    describe('When creating a new User', () => {
        it('should successsfully create a new user', async () => {
            const newUser = {
                name: 'Otavio Araujo',
                email: 'otavioaraujo@mail.com',
                password: '1234',
            };

            const response = await global.testRequest
                .post('/users')
                .send(newUser);

            // Esperamos que o status retornado seja 201 (Created), e que o body seja um objeto contendo os campos de newUser
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(newUser));
        });
    });
});
