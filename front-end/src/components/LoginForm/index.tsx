'use client';
import { useState } from 'react';
import { Button } from '../Button';

export const LoginForm = () => {
    const [createUser, setCreateUser] = useState(false);
    const [userClicked, setUserClicked] = useState(false);

    const handleChangeStatus = (userOption: boolean) => {
        setCreateUser(userOption);
        setUserClicked(true);
    };

    return (
        <div>
            <h1>LoginForm</h1>

            <Button
                onClick={() => handleChangeStatus(true)}
                label="Criar usuário"
            />

            <Button
                onClick={() => handleChangeStatus(false)}
                label="Cadastrar"
            />

            {userClicked && (
                <div>
                    {createUser ? <h1>Criar User</h1> : <h1>Cadastrar</h1>}
                </div>
            )}
        </div>
    );
};
