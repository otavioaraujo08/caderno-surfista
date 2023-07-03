import './styles.css';
import { Box, Typography } from '@mui/material';
import { BiErrorAlt, BiCheck } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

interface PopupProps {
    title: string;
    message: string;
    type: 'error' | 'success';
    onClose: () => void;
}

const typeIcon = {
    error: (
        <BiErrorAlt
            className="icon"
            style={{
                color: '#f44336',
            }}
        />
    ),
    success: (
        <BiCheck
            className="icon"
            style={{
                color: '#4caf50',
            }}
        />
    ),
};

export const Popup = (props: PopupProps) => {
    const { title, message, type, onClose } = props;

    return (
        <Box
            className="boxPopup"
            style={{
                border: `5px solid ${
                    type === 'success' ? '#4caf50' : '#f44336'
                }`,
            }}
        >
            <Box className="boxIcon">{typeIcon[type]}</Box>

            <Box>
                <Typography className="popupTitle">{title}</Typography>
                <Typography className="popupSubtitle">{message}</Typography>
            </Box>

            <IoClose
                onClick={onClose}
                style={{
                    color: '#000000',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                }}
            />
        </Box>
    );
};
