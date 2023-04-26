import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequetsConfig extends AxiosRequestConfig {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Response<T = any> extends AxiosResponse<T> {}

export class Requets {
    constructor(private request = axios) {}

    public get<T>(
        url: string,
        config: RequetsConfig = {}
    ): Promise<Response<T>> {
        return this.request.get<T, Response<T>>(url, config);
    }
}
