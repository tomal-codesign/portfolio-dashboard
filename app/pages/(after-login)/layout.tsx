// app/(dashboard)/layout.tsx
'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [userData, setUserData] = useState<any>({ name: '', email: '', profileImg: '' });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        setUserData(user ? JSON.parse(user) : null);
        if (!token) {
            router.replace("/login");
        }

    }, [pathname]);

    const navItems = [
        { label: "Dashboard", href: "/pages/dashboard" },
        { label: "User Management", href: "/pages/user-management" },
    ];


    return (
        <div className="bg-linear-to-r from-[#98B2E2] to-[#D2E2BF] p-4 min-h-screen">
            <div className="rounded-full flex justify-between items-center bg-white/50 p-2 rounded-[30px] shadow-lg">
                <div className="flex items-center gap-2">
                    <img alt="logo" src={userData.profileImg} height="40" className="rounded-full w-10 h-10"></img>
                    <span className="font-semibold text-gray-900">{userData.name}</span>
                </div>
                <div>
                    <nav>
                        <ul>
                            <li>
                                {navItems.map((item, index) => (
                                    <Link href={item.href} key={index} className={`px-5 py-2 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-50`}>
                                        <span className="text-gray-900 font-semibold">{item.label}</span>
                                    </Link>
                                ))
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <img alt="logo" src={userData.profileImg} height="40" className="rounded-full w-10 h-10"></img>
                </div>
            </div>
            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}
