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
        try {
            dispatch(
                logIn({
                    username,
                    token,
                })
            );

            return redirectUserToDashboard();
        } catch (error) {
            console.log(error);
        }
    };

    const getUserByEmail = async ({ token, email }: GetUserByEmailProps) => {
        try {
            const { name } = await userService.getUserInfos(email);

            return setupUser({
                username: name,
                token,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogOut = () => {
        try {
            dispatch(authReducer.actions.logOut());

            return redirectUserToLogin();
        } catch (error) {
            console.log(error);
        }
    };

    return {
        redirectUserToLogin,
        getUserByEmail,
        handleLogOut,
    };
}
