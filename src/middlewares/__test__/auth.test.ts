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

    it('Should return UNAUTHORIZED if there is a problem on the token verification', () => {
        const requestFake = {
            headers: {
                'x-access-token': 'invalid token',
            },
        };
        const sendMock = jest.fn();
        const responseFake = {
            status: jest.fn(() => ({
                send: sendMock,
            })),
        };
        const nextFake = jest.fn();

        authMiddleware(requestFake, responseFake as object, nextFake);
        expect(responseFake.status).toHaveBeenCalledWith(401);
        expect(sendMock).toHaveBeenCalledWith({
            code: 401,
            error: 'jwt malformed',
        });
    });
});
