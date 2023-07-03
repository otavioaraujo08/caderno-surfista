import { Popup } from '@/components/Popup';
import React, { useEffect, useState } from 'react';

type AlertType = 'error' | 'success';

interface Popup {
    title: string;
    message: string;
    type: AlertType;
}

export const UsePopup = () => {
    const [popup, setPopup] = useState<Popup | null>(null);

    const showAlert = (
        title = 'Erro ao criar usuário',
        message: string,
        type: AlertType = 'success'
    ) => {
        setPopup({ title, message, type });
    };

    const hideAlert = () => {
        setPopup(null);
    };

    useEffect(() => {
        if (!popup) return;

        setTimeout(() => {
            hideAlert();
        }, 6000);
    }, [popup]);

    const PopupComponent = () => {
        if (!popup) return null;

        return (
            <Popup
                title={popup.title}
                message={popup.message}
                type={popup.type}
                onClose={hideAlert}
            />
        );
    };

    return { showAlert, PopupComponent };
};
