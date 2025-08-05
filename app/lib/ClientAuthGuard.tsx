"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isTokenExpired } from "./isTokenExpired";

interface User {
    role: string;
    // add other fields as needed
}

interface ClientAuthGuardProps {
    children: React.ReactNode;
}

const roleAccessMap: Record<string, string[]> = {
    "/pages/dashboard/": ["user", "admin"],
    "/pages/user-management/": ["admin"],
    // add your protected routes here
};

function canAccessRoute(pathname: string, role: string): boolean {
    for (const routePrefix in roleAccessMap) {
        if (pathname.startsWith(routePrefix)) {
            return roleAccessMap[routePrefix].includes(role);
        }
    }
    return true; // no restriction on this route
}

export const ClientAuthGuard = ({ children }: ClientAuthGuardProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        const user: User | null = userStr ? JSON.parse(userStr) : null;

        if (!token && !pathname.startsWith("/pages/login")) {
            router.replace("/pages/login");
            return;
        }

        if (token && pathname.startsWith("/pages/login")) {
            router.replace("/pages/dashboard");
            return;
        }

        if (token && isTokenExpired(token)) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.replace("/pages/login");
            return;
        }

        if (token && user) {
            if (!canAccessRoute(pathname, user.role)) {
                router.replace("/pages/unauthorized");
                return;
            }
        }

        setIsAuthChecked(true);
    }, [pathname, router]);

    if (!isAuthChecked && !pathname.startsWith("/pages/login")) {
        return null; // Prevent rendering until auth check completes
    }

    return <>{children}</>;
};
