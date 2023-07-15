import styled from 'styled-components';
import { Box, Avatar, Typography } from '@mui/material';

export const StyledHeader = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: left;
    margin: 1.5rem 2rem;
    gap: 1rem;
`;

export const StyledAvatar = styled(Avatar)`
    width: 3rem;
    height: 3rem;
    border: 0.2rem solid #262626;
    box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.25);
`;

export const StyledTitle = styled(Typography)`
    font-size: 1.1rem;
    font-weight: 600;
    font-family: Roboto, sans-serif;
    color: #262626;
    letter-spacing: 0.1rem;
    max-width: 7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const StyledSubtitle = styled(Typography)`
    font-size: 0.9rem;
    font-weight: 500;
    font-family: Inter, sans-se;
    color: #262626;
    letter-spacing: 0.1rem;
`;
