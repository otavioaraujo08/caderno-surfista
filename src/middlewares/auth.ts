import AuthService from '@src/services/auth';
import { NextFunction, Request, Response } from 'express';

export function authMiddleware(
    request: Partial<Request>,
    response: Partial<Response>,
    next: NextFunction
): void {
    try {
        const token = request.headers?.['x-access-token'];
        const decoded = AuthService.decodeToken(token as string);

        request.decoded = decoded;
        next();
    } catch (error) {
        if (error instanceof Error) {
            response.status?.(401).send({ code: 401, error: error.message });
        }
    }
}
