import { Dialog } from 'primereact/dialog';
import React from 'react';

type Props = {
    isvisible: boolean;
    header?: string;
    onHide: () => void;
    children: React.ReactNode;
};

const DynamicModal = ({ children, isvisible, header, onHide }: Props) => {
    return (
        <Dialog
            header={header}
            visible={isvisible}
            position="top"
            style={{ width: '50vw' }}
            onHide={onHide}
        >
            {children}
        </Dialog>
    );
};

export default DynamicModal;
