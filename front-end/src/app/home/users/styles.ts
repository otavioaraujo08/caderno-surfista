import { Box, Typography } from '@mui/material';
import { styled } from 'styled-components';

export const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 1rem;
    gap: 1rem;
`;

export const BoxUsersInfo = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #e0e0e0;
    margin: 1rem;
    gap: 0.7rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    height: 8rem;
    max-width: 15rem;
    width: 100%;
`;

export const BoxDescription = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 1rem;
    text-align: center;
    width: 100%;
`;

export const BoxIcon = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    border: 1px solid #a5b1eb;
    background-color: #dff1ff;
`;

export const UsersInfoTitle = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 600;
    color: #000000;
    font-family: sans-serif;
    letter-spacing: 1px;
    margin-left: 0.5rem;
`;

export const UsersInfoSubtitle = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 600;
    color: #343434;
    font-family: sans-serif;
`;

export const BoxSearch = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

export const AuxiliarText = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 600;
    color: #000000;
    font-family: sans-serif;
`;

export const AuxiliarSubtext = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 600;
    color: #837777;
    font-family: 'Roboto';
`;

export const BoxUsers = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 1rem;
    gap: 2rem;
`;

export const BoxUser = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 15rem;
    height: 7rem;
    background: #ffffff;
    color: #000000;
    border-radius: 0.5rem;
    border: 1px solid #e0e0e0;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
`;

export const Username = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 600;
    color: #000000;
    font-family: sans-serif;
`;

export const UserMail = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 600;
    color: #837777;
    font-family: sans-serif;
`;
