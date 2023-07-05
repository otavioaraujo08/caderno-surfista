import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonComponent } from '@/components/Button';
import './styles.css';
import { Typography, Box, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUserSchema } from './schema';
import { UsePopup } from '@/hooks/UsePopup';
import { userService } from '@/services/user';

interface CreateUserFunctionProps {
    name: string;
    email: string;
    password: string;
}

interface CreateUserProps {
    setUserClicked: (value: boolean) => void;
}

export const CreateUser = (props: CreateUserProps) => {
    const { showAlert, PopupComponent } = UsePopup();
    const { setUserClicked } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createUserSchema),
    });

    const handleCreateUser: SubmitHandler<CreateUserFunctionProps> = async (
        data
    ) => {
        try {
            await userService.register(data);

            return showAlert(
                'Sucesso ao criar usuário',
                'Usuário criado com sucesso',
                'success'
            );
        } catch (error: any) {
            if (error.message.includes('already exists')) {
                return showAlert(
                    'Erro ao criar usuário',
                    'Email já cadastrado',
                    'error'
                );
            }

            return showAlert(
                'Erro ao criar usuário',
                'Contate o administrador do sistema',
                'error'
            );
        }
    };

    return (
        <Box
            className="boxForm"
            component="form"
            onSubmit={handleSubmit(handleCreateUser)}
        >
            <Typography align="center" className="formTitle">
                Cadastrar usuário
            </Typography>

            <Box className="boxInput">
                <label className="label">Nome</label>
                <TextField
                    type="string"
                    label="Digite seu nome"
                    variant="outlined"
                    {...register('name')}
                    error={!!errors?.name}
                    helperText={errors?.name?.message}
                />
            </Box>

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
                label="Cadastrar"
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
