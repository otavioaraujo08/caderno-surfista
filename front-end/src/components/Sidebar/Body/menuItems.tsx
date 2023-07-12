import { FiActivity, FiLoader } from 'react-icons/fi';

interface MenuChildren {
    title: string;
    path: string;
    icon: JSX.Element;
}

interface MenuItem {
    title: string;
    children: MenuChildren[];
}

export const menuItems: MenuItem[] = [
    {
        title: 'Módulos',
        children: [
            {
                title: 'Dashboard',
                path: '/dashboard',
                icon: <FiActivity />,
            },
            {
                title: 'Praia',
                path: '/beach',
                icon: <FiLoader />,
            },
        ],
    },
];
