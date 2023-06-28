import './styles.css';
import Button from '@mui/material/Button';
interface ButtonProps {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

export const ButtonComponent = (Props: ButtonProps) => {
    const { label, onClick, style } = Props;

    return (
        <Button
            variant="contained"
            onClick={onClick}
            style={style}
            className="button"
        >
            {label}
        </Button>
    );
};
