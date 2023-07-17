'use client';
import './styles.css';
import { Sidebar } from '@/components/Sidebar';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useAppSelector } from '@/redux/store';
import { Box } from '@mui/material';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { username } = useAppSelector((state) => state.authReducer.value);

    return username ? (
        <Box className="parentSidebar">
            <Box className="sidebarSideGrid">
                <Sidebar />
            </Box>

            <Box className="contentSideGrid">{children}</Box>
        </Box>
    ) : (
        <NotFoundPage />
    );
}
