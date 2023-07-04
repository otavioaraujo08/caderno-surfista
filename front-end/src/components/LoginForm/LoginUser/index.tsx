import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonComponent } from '@/components/Button';
import './styles.css';
import { Typography, Box, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema } from './schema';
import { authenticationService } from '@/services/authenticate';
import { UsePopup } from '@/hooks/UsePopup';

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

    const handleLogin: SubmitHandler<LoginFunctionProps> = async (data) => {
        try {
            const response = await authenticationService.login(data);

            return showAlert(
                'Sucesso ao logar usuário',
                'Usuário logado com sucesso',
                'success'
            );
        } catch (error: any) {
            if (error.message.includes('User not found!')) {
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
        <Box
            className="boxForm"
            component="form"
            onSubmit={handleSubmit(handleLogin)}
        >
            <Typography align="center" className="formTitle">
                Realizar login
            </Typography>

            <Box className="boxInput">
                <label className="label">Email</label>
                <TextField
                    type="string"
                    label="Digite seu email"
                    variant="outlined"
                    {...register('email')}
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                />
            </Box>

            <Box className="boxInput">
                <label className="label">Senha</label>
                <TextField
                    type="string"
                    label="Digite sua senha"
                    variant="outlined"
                    {...register('password')}
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
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
                className="return"
            >
                Retornar
            </Typography>

            <PopupComponent />
        </Box>
    );
};
