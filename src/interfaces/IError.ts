export interface APIError {
    message: string;
    code: number;
    codeAsString?: string;
    description?: string;
    documentation?: string;
}

export interface APIErrorResponse extends Omit<APIError, 'codeAsString'> {
    error: string;
}
