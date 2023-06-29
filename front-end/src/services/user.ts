import { UserLogin } from '@/interfaces/IUser';
import axios from 'axios';

class UserService {
    async LoginUser(params: UserLogin) {
        const url = `localhost:3000/auth/login`;

        axios
            .get(url, { params })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const userService = new UserService();
