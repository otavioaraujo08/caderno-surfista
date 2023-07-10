import { UserLogin } from '@/interfaces/IUser';

import { api as apiService, ApiService, defaultUrl } from './api';
import { LoginResponse } from '@/interfaces/ILogin';

class AuthenticationService {
    constructor(private readonly api: ApiService) {}

    public login = async (login: UserLogin): Promise<LoginResponse> => {
        return this.api.post(`${defaultUrl}/users/authenticate`, login);
    };
}
export const authenticationService = new AuthenticationService(apiService);
