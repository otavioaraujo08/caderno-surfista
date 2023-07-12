import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 0 0 2rem;
    gap: 0.7rem;
`;

export const PatternBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 90%;
    margin-top: 0.5rem;
`;

export const TitleBody = styled(Typography)`
    font-size: 1.3rem;
    font-weight: 600;
    color: #1c1a1a;
    font-family: Roboto, sans-serif;
    letter-spacing: 0.1rem;
`;

export const BoxBody = styled(Box)`
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: center;
    width: 90%;
    gap: 0.7rem;
    cursor: pointer;

    &:hover {
        background-color: #a59f9f8c;
        border-radius: 0.5rem;
    }
`;

export const BoxIcon = styled(Box)`
    font-size: 2rem;
    color: #ffb703;
`;

export const SubtitleBody = styled(Typography)`
    font-size: 1.1rem;
    font-weight: 600;
    color: #424141a8;
    font-family: Inter, sans-serif;
    letter-spacing: 0.1rem;
`;
