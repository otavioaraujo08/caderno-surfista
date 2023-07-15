import { Box, IconButton } from '@mui/material';
import {
    StyledAvatar,
    StyledHeader,
    StyledSubtitle,
    StyledTitle,
} from './styles';
import { BiExit } from 'react-icons/bi';
import useAuthenticate from '@/hooks/useAuthenticate';

interface HeaderProps {
    name: string;
    title: string;
}

export const Header = (props: HeaderProps) => {
    const { name, title } = props;
    const { handleLogOut } = useAuthenticate();

    return (
        <StyledHeader>
            <StyledAvatar
                alt="Remy Sharp"
                src="https://i.pinimg.com/564x/c0/37/c3/c037c3126d2a9eec910a8724aed0e8fa.jpg"
            />

            <Box>
                <StyledTitle>{name || 'Year Zero'}</StyledTitle>

                <StyledSubtitle>{title || 'Caster VI'}</StyledSubtitle>
            </Box>

            <IconButton onClick={handleLogOut}>
                <BiExit
                    size="1.5rem"
                    style={{
                        color: '#262626',
                    }}
                />
            </IconButton>
        </StyledHeader>
    );
};
