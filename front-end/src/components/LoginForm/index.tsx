'use client';
import './styles.css';
import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import { ButtonComponent } from '../Button';
import { LoginUser } from './LoginUser';

export const LoginForm = () => {
    const [createUser, setCreateUser] = useState(false);
    const [userClicked, setUserClicked] = useState(false);

    const handleChangeStatus = (userOption: boolean) => {
        setCreateUser(userOption);
        setUserClicked(true);
    };

    return (
        <Box className="boxForm">
            {!userClicked && (
                <>
                    <ButtonComponent
                        onClick={() => handleChangeStatus(true)}
                        label="Login"
                    />

                    <ButtonComponent
                        onClick={() => handleChangeStatus(false)}
                        label="Cadastrar"
                    />
                </>
            )}

            {userClicked && (
                <>
                    {createUser ? <LoginUser /> : <h1>Cadastrar</h1>}

                    <Typography
                        onClick={() => setUserClicked(false)}
                        className="return"
                    >
                        Retornar
                    </Typography>
                </>
            )}
        </Box>
    );
};
