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
            className='lg:w-[650px] w-[80%] !rounded-[26px] common-modal'
            onHide={onHide}
        >
            {children}
        </Dialog>
    );
};

export default DynamicModal;
