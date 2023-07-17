import Image from 'next/image';
import {
    Container,
    BoxText,
    ImageIcon,
    ErrorBoxSubtitle,
    Title,
    Subtitle,
    ReturnButton,
} from './styles';
import useAuthenticate from '@/hooks/useAuthenticate';

export const NotFoundPage = () => {
    const { redirectUserToLogin } = useAuthenticate();

    const handleReturn = () => {
        redirectUserToLogin();
    };

    return (
        <Container>
            <ImageIcon src="/ghost.png" alt="404" width={500} height={400} />

            <ErrorBoxSubtitle>Erro 404</ErrorBoxSubtitle>

            <BoxText>
                <Title>Nós perdemos essa página</Title>
                <Subtitle>
                    Desculpe, essa página que você está procurando não existe ou
                    foi alterada.
                </Subtitle>
            </BoxText>

            <ReturnButton onClick={handleReturn}>Retornar </ReturnButton>
        </Container>
    );
};
