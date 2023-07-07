interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
    const { open, onClose, title, children } = props;

    return (
        <Modal open={open} onClose={onClose} title={title}>
            {children}
        </Modal>
    );
};
