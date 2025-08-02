// components/ui/ToastProvider.tsx
'use client';

import { Toast } from 'primereact/toast';
import { useRef, createContext, useContext } from 'react';

const ToastContext = createContext<React.MutableRefObject<Toast | null> | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const toastRef = useRef<Toast | null>(null);

    return (
        <ToastContext.Provider value={toastRef}>
            <Toast ref={toastRef} position="top-right" />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
