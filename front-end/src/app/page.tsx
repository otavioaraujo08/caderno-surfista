import Image from 'next/image';
import './styles.css';
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

                    <div
                        style={{
                            marginBottom: '1rem',
                        }}
                    >
                        <h1 className="logoTitle">Go Surf</h1>
                        <h3 className="logoSubtitle">Surfaremos juntos</h3>
                    </div>
                </div>

                <div>
                    <h1 className="title">Bem vindo de volta 😎</h1>
                    <p className="subTitle">
                        Como você gostaria de fazer login ?
                    </p>

                    <LoginForm />
                </div>
            </div>
            <div className="gridTwo"></div>
        </div>
    );
}
