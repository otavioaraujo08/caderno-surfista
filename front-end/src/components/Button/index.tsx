import './styles.css';
import Button from '@mui/material/Button';
interface ButtonProps {
    label: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

export const ButtonComponent = (Props: ButtonProps) => {
    const { label, onClick, style, type } = Props;

    return (
        <Button
            variant="contained"
            onClick={onClick}
            style={style}
            type={type}
            className="button"
        >
            {label}
        </Button>
    );
};
