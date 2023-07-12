'use client';
import { Sidebar } from '@/components/Sidebar';
import { Box } from '@mui/material';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box>
            <Box>
                <Sidebar />
            </Box>

            <Box>{children}</Box>
        </Box>
    );
}
