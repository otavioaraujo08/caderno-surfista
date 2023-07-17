'use client';
import { Typography } from '@mui/material';
import { styled } from 'styled-components';

interface TitlePageProps {
    title: string;
}

const TitlePageText = styled(Typography)`
    font-size: 2rem;
    font-weight: bold;
    font-family: sans-serif;
    padding: 1rem;
    color: #000814;
    text-align: left;

    @media (max-width: 600px) {
        font-size: 1.6rem;
    }
`;

export const TitlePage = ({ title }: TitlePageProps) => {
    return <TitlePageText>{title}</TitlePageText>;
};
