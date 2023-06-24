import { Beach } from '@src/models/beach';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('Beaches functional tests', () => {
    const defaultUser = {
        name: 'Otavio Araujo',
        email: 'otavioaraujo@mail.com',
        password: 1234,
    };
    let token: string;
    // Antes de todos os testes, limpar o banco de praias
    beforeAll(async () => await Beach.deleteMany({}));
    // Antes de cada teste, limpar o banco de dados
    beforeEach(async () => {
        await Beach.deleteMany({});
        await User.deleteMany({});
        const user = await new User(defaultUser).save();
        token = AuthService.generateToken(user.toJSON());
    });

    describe('When creating a beach', () => {
        it('should create a beach with success', async () => {
            const newBeach = {
                lat: -1.6161877972406482,
                lng: -48.812844829117886,
                name: 'Beja',
                position: 'N',
            };

            const response = await global.testRequest
                .post('/beaches')
                .set({ 'x-access-token': token })
                .send(newBeach);

            // Esperamos que a resposta seja 201 e que o corpo da resposta seja igual ao newBeach
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(newBeach));
        });

        it('Should return 422 when there is a validation error', async () => {
            const newBeach = {
                lat: 'Invalid String',
                lng: -48.812844829117886,
                name: 'Beja',
                position: 'N',
            };

            const response = await global.testRequest
                .post('/beaches')
                .set({ 'x-access-token': token })
                .send(newBeach);

            // Esperamos que a resposta seja 422 e que seja
            expect(response.status).toBe(422);
            expect(response.body).toEqual({
                code: 422,
                error: 'Unprocessable Entity',
                message:
                    'Beach validation failed: lat: Cast to Number failed for value "Invalid String" (type string) at path "lat"',
            });
        });
    });
});
