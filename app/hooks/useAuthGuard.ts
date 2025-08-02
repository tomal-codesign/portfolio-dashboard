// hooks/useAuthGuard.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthGuard = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (token) {
            router.replace("/pages/dashboard");
        } else {
            router.replace("/pages/login");
        }
    }, [router]);
};
