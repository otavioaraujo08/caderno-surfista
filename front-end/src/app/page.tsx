'use client';
import './styles.css';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { LoginForm } from '@/components/LoginForm';

export default function Page() {
    return (
        <div className="grid">
            <div className="gridOne">
                <div className="boxLogo">
                    <Image
                        src="/beachIcon.png"
                        alt="Beach Logo"
                        width={160}
                        height={160}
                        className="logo"
                    />
                </div>

                <div>
                    <Typography align="center" className="title">
                        Bem vindo de volta 😎
                    </Typography>
                    <Typography align="center" className="subTitle">
                        Como você gostaria de fazer prosseguir ?
                    </Typography>

                    <LoginForm />
                </div>
            </div>

            <div className="gridTwo"></div>
        </div>
    );
}
