import { APIError, APIErrorResponse } from '@src/interfaces/IError';
import httpStatusCode from 'http-status-codes';

export default class ApiError {
    public static format(error: APIError): APIErrorResponse {
        return {
            ...{
                message: error.message,
                code: error.code,
                error: error.codeAsString
                    ? error.codeAsString
                    : httpStatusCode.getStatusText(error.code),
            },
            ...(error.documentation && { documentation: error.documentation }),
            ...(error.description && { description: error.description }),
        };
    }
}
