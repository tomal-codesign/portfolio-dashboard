"use client";

import { useAuthGuard } from "./hooks/useAuthGuard";

export default function Home() {
    useAuthGuard();
    return null;
}
