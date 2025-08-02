// app/ClientAuthGuard.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ClientAuthGuardProps {
    children: React.ReactNode;
}

export const ClientAuthGuard = ({ children }: ClientAuthGuardProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token && !pathname.startsWith("/pages/login")) {
            router.replace("/pages/login");
        } else if (token && pathname.startsWith("/pages/login")) {
            router.replace("/pages/dashboard");
        } else {
            setIsAuthChecked(true);
        }
    }, [pathname]);

    if (!isAuthChecked && !pathname.startsWith("/pages/login")) {
        return null; // Prevent rendering until auth check
    }

    return <>{children}</>;
};
