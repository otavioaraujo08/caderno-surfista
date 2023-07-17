import { useRouter } from 'next/navigation';
import { authReducer, logIn } from '@/redux/features/auth';
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

    const redirectUserToDashboard = () => {
        return router.push('/home/dashboard');
    };

    const redirectUserToLogin = () => {
        return router.push('../');
    };

    const setupUser = ({ username, token }: SetupUserProps) => {
        dispatch(
            logIn({
                username,
                token,
            })
        );

        return redirectUserToDashboard();
    };

    const getUserByEmail = async ({ token, email }: GetUserByEmailProps) => {
        const { name } = await userService.getUserInfos(email);

        return setupUser({
            username: name,
            token,
        });
    };

    const handleLogOut = () => {
        dispatch(authReducer.actions.logOut());

        return redirectUserToLogin();
    };

    return {
        redirectUserToLogin,
        getUserByEmail,
        handleLogOut,
    };
}
