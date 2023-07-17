import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { styled } from 'styled-components';

export const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ededed91;
    min-height: 100vh;
    height: auto;
    gap: 1.5rem;
`;

export const ImageIcon = styled(Image)`
    transition: 0.2s;

    @media (max-width: 600px) {
        width: 20rem;
        height: 20rem;
    }

    @media (max-width: 330px) {
        width: 10rem;
        height: 10rem;
    }
`;

export const BoxText = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

export const ErrorBoxSubtitle = styled(Typography)`
    font-size: 1.1rem;
    font-weight: 600;
    color: #0738b1;
    text-align: center;
    font-family: Inter, sans-serif;
    width: 7rem;
    height: 2.5rem;
    background-color: #e5f3ff;
    border-radius: 0.5rem;
    border: 0.2rem solid #0738b1;
    box-shadow: 0 0 0.5rem #0738b1;
    padding: 0.3rem;
`;

export const Title = styled(Typography)`
    font-size: 2.5rem;
    font-weight: 600;
    color: #060006;
    text-align: center;
    font-family: sans-serif;

    @media (max-width: 600px) {
        font-size: 2rem;
    }

    @media (max-width: 330px) {
        font-size: 1.7rem;
    }
`;

export const Subtitle = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 500;
    max-width: 50rem;
    color: #767576;
    text-align: center;
    font-family: sans-serif;

    @media (max-width: 600px) {
        font-size: 1rem;
    }

    @media (max-width: 330px) {
        font-size: 0.7rem;
    }
`;

export const ReturnButton = styled(Button)`
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    text-align: center;
    font-family: sans-serif;
    background-color: #0738b1;
    border-radius: 0.5rem;
    border: 0.2rem solid #0738b1;
    box-shadow: 0 0 0.5rem #0738b1;
    padding: 0.3rem;
    width: 10rem;
    height: 3rem;
    transition: 0.2s;
    margin-bottom: 2rem;

    &:hover {
        background-color: #fff;
        color: #0738b1;
        border: 0.2rem solid #0738b1;
        box-shadow: 0 0 0.5rem #0738b1;
    }

    @media (max-width: 600px) {
        font-size: 1rem;
        width: 8rem;
        height: 2.5rem;
    }

    @media (max-width: 330px) {
        font-size: 0.7rem;
        width: 6rem;
        height: 2rem;
    }
`;
