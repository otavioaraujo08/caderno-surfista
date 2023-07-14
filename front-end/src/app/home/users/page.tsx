'use client';
import { userService } from '@/services/user';
import { useEffect } from 'react';

export default function Users() {
    const getUsers = async () => {
        try {
            const response = await userService.getUsers();

            console.log(response);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <h1>Users</h1>
            <p>uSER </p>
        </>
    );
}
