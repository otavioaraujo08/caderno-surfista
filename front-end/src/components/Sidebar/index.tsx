'use client';
import { Box } from '@mui/material';
import { Body } from './Body';
import { Header } from './Header';
import { useAppSelector } from '@/redux/store';

export const Sidebar = () => {
    const { username, title } = useAppSelector(
        (state) => state.authReducer.value
    );

    return (
        <Box>
            <Header name={username} title={title} />

            <Body />
        </Box>
    );
};
