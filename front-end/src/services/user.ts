import { UserRegister } from '@/interfaces/IUser';

import { api as apiService, ApiService, defaultUrl } from './api';

export interface getUserInfosResponse {
    name: string;
    email: string;
}

class UserService {
    constructor(private readonly api: ApiService) {}

    public getUsers = async (): Promise<getUserInfosResponse[]> => {
        return this.api.get(`${defaultUrl}/users`);
    };

    public getUserInfos = async (
        email: string
    ): Promise<getUserInfosResponse> => {
        const config = {
            params: { email },
        };

        return this.api.get(`${defaultUrl}/users`, config);
    };

    public register = async (register: UserRegister): Promise<void> => {
        return this.api.post(`${defaultUrl}/users`, register);
    };
}
export const userService = new UserService(apiService);
