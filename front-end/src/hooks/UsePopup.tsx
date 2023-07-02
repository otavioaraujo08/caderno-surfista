import { Alert } from '@mui/material';
import React, { useState } from 'react';

type AlertType = 'error' | 'warning' | 'info' | 'success';

interface Popup {
    message: string;
    type: AlertType;
}

export const UsePopup = () => {
    const [popup, setPopup] = useState<Popup | null>(null);

    const showAlert = (message: string, type: AlertType = 'info') => {
        setPopup({ message, type });
    };

    const hideAlert = () => {
        setPopup(null);
    };

    const PopupComponent = () => {
        if (!popup) return null;

        return (
            <Alert severity={popup.type} onClose={hideAlert}>
                {popup.message}
            </Alert>
        );
    };

    return { showAlert, hideAlert, PopupComponent };
};
