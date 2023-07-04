import { UserLogin } from '@/interfaces/IUser';

import { api as apiService, ApiService, defaultUrl } from './api';

class AuthenticationService {
    constructor(private readonly api: ApiService) {}

    public login = async (login: UserLogin): Promise<void> => {
        return this.api.post(`${defaultUrl}/users/authenticate`, login);
    };
}
export const authenticationService = new AuthenticationService(apiService);
