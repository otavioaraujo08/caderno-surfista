'use client';
import './styles.css';
import { Box } from '@mui/material';
import { useState } from 'react';
import { ButtonComponent } from '../Button';
import { LoginUser } from './LoginUser';
import { CreateUser } from './CreateUser';

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
                    {createUser ? (
                        <LoginUser setUserClicked={setUserClicked} />
                    ) : (
                        <CreateUser setUserClicked={setUserClicked} />
                    )}
                </>
            )}
        </Box>
    );
};
