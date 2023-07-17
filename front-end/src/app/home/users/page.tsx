'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { TitlePage } from '@/components/TitlePage';
import { getUserInfosResponse, userService } from '@/services/user';
import {
    BoxUsersInfo,
    BoxDescription,
    Container,
    UsersInfoTitle,
    UsersInfoSubtitle,
    BoxIcon,
    AuxiliarText,
    AuxiliarSubtext,
    BoxSearch,
    BoxUsers,
    BoxUser,
    Username,
    UserMail,
} from './styles';
import { BiUserCircle } from 'react-icons/bi';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai';
import { UseDebounce } from '@/hooks/UseDebounce';

export default function Users() {
    const debouncedSearch = UseDebounce(handleSearch, 300);
    const [search, setSearch] = useState<string>('');
    const [userQuantity, setUserQuantity] = useState<number>(0);
    const [users, setUsers] = useState<getUserInfosResponse[]>([]);

    const getUsers = async () => {
        try {
            const response = await userService.getUsers();

            if (response) {
                setUserQuantity(response?.length);
                setUsers(response);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    const filterUsers = useCallback(() => {
        if (search) {
            const filteredUsers = users.filter((user) => {
                return (
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
                );
            });

            return filteredUsers;
        }

        return users;
    }, [search, users]);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container>
            <TitlePage title="Usuários" />

            <BoxUsersInfo>
                <BoxDescription>
                    <BoxIcon>
                        <BiUserCircle size={30} color="#0076fe" />
                    </BoxIcon>
                    <UsersInfoSubtitle>Usuários</UsersInfoSubtitle>
                </BoxDescription>

                <UsersInfoTitle>{userQuantity || 300}</UsersInfoTitle>
            </BoxUsersInfo>

            <BoxSearch>
                <Box>
                    <AuxiliarText>
                        Número de usuários cadastrados no sistema
                    </AuxiliarText>

                    <AuxiliarSubtext>
                        Aqui você pode visualizar todos os usuários cadastrados
                        no sistema
                    </AuxiliarSubtext>
                </Box>

                <OutlinedInput
                    sx={{
                        maxWidth: '40%',
                        width: '100%',
                        height: '3.5rem',
                        borderRadius: '5px',
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <AiOutlineSearch size={25} color="#0076fe" />
                        </InputAdornment>
                    }
                    placeholder="Pesquisar por nome ou e-mail"
                    onChange={debouncedSearch}
                />
            </BoxSearch>

            {users && (
                <BoxUsers>
                    {filterUsers().map((user) => (
                        <BoxUser key={user.email}>
                            <Username>{user.name}</Username>
                            <UserMail>{user.email}</UserMail>
                        </BoxUser>
                    ))}
                </BoxUsers>
            )}
        </Container>
    );
}
