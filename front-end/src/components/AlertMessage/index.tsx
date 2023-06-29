import { Alert } from '@mui/material';

interface AlertProps {
    type: 'success' | 'info' | 'warning' | 'error';
    text: string;
}

export const AlertMessage = (props: AlertProps) => {
    const { type, text } = props;

    return (
        <Alert variant="outlined" severity={type}>
            {text}
        </Alert>
    );
};
