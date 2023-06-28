import { ButtonComponent } from '@/components/Button';
import './styles.css';
import { Typography, Box, TextField } from '@mui/material';

export const LoginUser: React.FC = () => {
    const handleLogin = () => {
        alert('Login');
    };

    return (
        <Box className="boxForm">
            <Typography align="center" className="formTitle">
                Realizar login
            </Typography>

            <Box className="boxInput">
                <label className="label">Email</label>
                <TextField label="Digite seu email" variant="outlined" />
            </Box>

            <Box className="boxInput">
                <label className="label">Senha</label>
                <TextField label="Digite sua senha" variant="outlined" />
            </Box>

            <ButtonComponent
                label="Entrar"
                onClick={handleLogin}
                style={{
                    marginTop: '20px',
                }}
            />
        </Box>
    );
};
