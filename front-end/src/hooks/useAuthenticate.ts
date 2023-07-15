import { useRouter } from 'next/navigation';
import { logIn } from '@/redux/features/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { userService } from '@/services/user';

interface GetUserByEmailProps {
    token: string;
    email: string;
}

interface SetupUserProps extends Pick<GetUserByEmailProps, 'token'> {
    username: string;
}

export default function useAuthenticate() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const redirectUser = () => {
        return router.push('/home/dashboard');
    };

    const setupUser = ({ username, token }: SetupUserProps) => {
        dispatch(
            logIn({
                username,
                token,
            })
        );

        return redirectUser();
    };

    const getUserByEmail = async ({ token, email }: GetUserByEmailProps) => {
        const { name } = await userService.getUserInfos(email);

        return setupUser({
            username: name,
            token,
        });
    };

    return {
        getUserByEmail,
    };
}
