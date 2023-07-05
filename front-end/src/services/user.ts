import { UserRegister } from '@/interfaces/IUser';

import { api as apiService, ApiService, defaultUrl } from './api';

class UserService {
    constructor(private readonly api: ApiService) {}

    public register = async (register: UserRegister): Promise<void> => {
        return this.api.post(`${defaultUrl}/users`, register);
    };
}
export const userService = new UserService(apiService);
