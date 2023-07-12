'use client';
import './styles.css';
import { Sidebar } from '@/components/Sidebar';
import { Box } from '@mui/material';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box className="parentSidebar">
            <Box className="sidebarSideGrid">
                <Sidebar />
            </Box>

            <Box className="contentSideGrid">{children}</Box>
        </Box>
    );
}
