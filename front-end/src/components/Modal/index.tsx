import './styles.css';
import { Box, IconButton, Typography, Modal as MuiModal } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
    const { open, onClose, title, children } = props;

    return (
        <MuiModal open={open} onClose={onClose} className="boxModal">
            <Box className="modalContent">
                <Box className="modalHeader">
                    <Typography className="modalTitle">{title}</Typography>

                    <IconButton onClick={onClose}>
                        <AiOutlineClose />
                    </IconButton>
                </Box>

                <Box className="modalBody">{children}</Box>
            </Box>
        </MuiModal>
    );
};
