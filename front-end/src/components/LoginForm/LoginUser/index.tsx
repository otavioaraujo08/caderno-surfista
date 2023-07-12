'use client';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonComponent } from '@/components/Button';
import { Typography, Box, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema } from './schema';
import { authenticationService } from '@/services/authenticate';
import { UsePopup } from '@/hooks/UsePopup';
import './styles.css';

interface LoginFunctionProps {
    email: string;
    password: string;
}

interface LoginUserProps {
    setUserClicked: (value: boolean) => void;
}

export const LoginUser = (props: LoginUserProps) => {
    const { showAlert, PopupComponent } = UsePopup();
    const { setUserClicked } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const router = useRouter();

    const redirectUser = () => {
        return router.push('/home/dashboard');
    };

    const handleLogin: SubmitHandler<LoginFunctionProps> = async (data) => {
        try {
            await authenticationService.login(data);

            redirectUser();

            return showAlert(
                'Sucesso ao logar usuário',
                'Usuário logado com sucesso',
                'success'
            );
        } catch (error: any) {
            if (error.message?.includes('User not found!')) {
                return showAlert(
                    'Erro ao logar usuário',
                    'Usuário não encontrado',
                    'error'
                );
            }

            return showAlert(
                'Erro ao logar usuário',
                'Email ou senha incorretos',
                'error'
            );
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(handleLogin)}>
            <Typography align="center" className="formLoginUserTitle">
                Realizar login
            </Typography>

            <Box className="boxLoginUserInput">
                <label className="labelLoginUser">Email</label>
                <TextField
                    label="Digite seu email"
                    variant="outlined"
                    {...register('email')}
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                    className="textFieldLoginUser"
                />
            </Box>

            <Box className="boxLoginUserInput">
                <label className="labelLoginUser">Senha</label>
                <TextField
                    type="password"
                    label="Digite sua senha"
                    variant="outlined"
                    {...register('password')}
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                    className="textFieldLoginUser"
                />
            </Box>

            <ButtonComponent
                label="Entrar"
                type="submit"
                style={{
                    marginTop: '20px',
                }}
            />

            <Typography
                onClick={() => setUserClicked(false)}
                className="returnLoginUser"
            >
                Retornar
            </Typography>

            <PopupComponent />
        </Box>
    );
};
