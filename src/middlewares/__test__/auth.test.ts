import AuthService from '@src/services/auth';
import { authMiddleware } from '../auth';

describe('AuthMiddleware', () => {
    it('Should verify a JWT token and call the next middleware', () => {
        const jwtToken = AuthService.generateToken({ data: 'fake' });
        const requestFake = {
            headers: {
                'x-access-token': jwtToken,
            },
        };
        const responseFake = {};
        const nextFake = jest.fn();

        authMiddleware(requestFake, responseFake, nextFake);
        expect(nextFake).toHaveBeenCalled();
    });
});
