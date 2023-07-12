import { Box } from '@mui/material';
import {
    StyledAvatar,
    StyledHeader,
    StyledSubtitle,
    StyledTitle,
} from './styles';

interface HeaderProps {
    name: string;
    title: string;
}

export const Header = (props: HeaderProps) => {
    const { name, title } = props;

    return (
        <StyledHeader>
            <StyledAvatar
                alt="Remy Sharp"
                src="https://i.pinimg.com/564x/c0/37/c3/c037c3126d2a9eec910a8724aed0e8fa.jpg"
            />

            <Box>
                <StyledTitle>{name}</StyledTitle>

                <StyledSubtitle>{title}</StyledSubtitle>
            </Box>
        </StyledHeader>
    );
};
