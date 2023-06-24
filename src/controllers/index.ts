import { Response } from 'express';
import mongoose from 'mongoose';
import { CUSTOM_VALIDATION } from '@src/models/user';
import logger from '@src/logger';
import ApiError from '@src/utils/errors/api-error';
import { APIError } from '@src/interfaces/IError';

export abstract class BaseController {
    protected sendCreatedUpdateErrorResponse(
        response: Response,
        error: unknown
    ): void {
        if (error instanceof mongoose.Error.ValidationError) {
            const clientErrors = this.handleClientErrors(error);
            response.status(clientErrors.code).send(
                ApiError.format({
                    code: clientErrors.code,
                    message: clientErrors.error,
                })
            );
        } else {
            logger.error(error);
            response.status(500).send(
                ApiError.format({
                    code: 500,
                    message: 'Something went wrong!',
                })
            );
        }
    }

    private handleClientErrors(error: mongoose.Error.ValidationError): {
        code: number;
        error: string;
    } {
        const duplicatedKindErrors = Object.values(error.errors).filter(
            (err) =>
                err.name === 'ValidatorError' &&
                err.kind === CUSTOM_VALIDATION.DUPLICATED
        );
        if (duplicatedKindErrors.length) {
            return { code: 409, error: error.message };
        }
        return { code: 422, error: error.message };
    }
}
