// app/(dashboard)/layout.tsx
'use client';
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar } from "primereact/avatar";
import Link from "next/link";
import { Menu } from "primereact/menu";
import Cookies from "js-cookie";
import { UserService } from "@/app/services/userService";
import { useToast } from "@/app/component/reusable-component/ToastProvider";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [userData, setUserData] = useState<any>({ name: '', email: '', profileImg: '' });
    const toast = useToast();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const userData = user ? JSON.parse(user) : null;
        (async () => {
            try {
                const data = await UserService.getUserById(userData.id.toString());
                setUserData(data.user);
            } catch (error: any) {
                console.error('Failed to fetch user:', error);
                toast.current?.show({ severity: "error", summary: "Failed to fetch user", detail: error.response.data.error, life: 3000 });
            }
        })();
        if (!token) {
            router.replace("/login");
        }
    }, [pathname]);

    const navItems = [
        { label: "Dashboard", href: "/pages/dashboard", roles: ["Admin", "User"] },
        { label: "User Management", href: "/pages/user-management", roles: ["Admin"] },
        { label: "Portfolio", href: "/pages/portfolio", roles: ["Admin", "User"] },
    ];
    const menuRight = useRef<Menu>(null);
    const items = [
        {
            template: () => {
                return (
                    <div className="inline-flex items-center gap-4 px-2 py-2">
                        <img
                            alt="logo"
                            src={userData.profileImg}
                            height="40"
                            className="rounded-full w-10 h-10"
                        />
                        <div className="flex flex-col">
                            <p className="text-md font-bold">
                                {userData.name || 'User Name'}
                            </p><p className="font-medium text-sm">
                                {userData.email || 'User Email'}
                            </p>
                        </div>
                    </div>
                );
            }
        },
        {
            separator: true
        },
        {
            label: 'Profile',
            icon: 'pi pi-user-edit',
            command: () => console.log('Profile')
        },
        {
            label: 'Log Out',
            icon: 'pi pi-sign-out',
            command: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                Cookies.remove("token");
                Cookies.remove("user");

                router.replace("/pages/login");
            }
        }
    ];

    return (
        <div className="bg-linear-to-r from-[#98B2E2] to-[#D2E2BF]  p-4 min-h-screen">
            <div className=" flex justify-between items-center bg-white/50 p-2 rounded-[30px] shadow-lg border border-[#fff]/80">
                <div className="flex items-center gap-2">
                    <Avatar icon="pi pi-objects-column" className="!w-[40px] !h-[40px]" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                    <span className="font-semibold text-gray-900">Portfolio</span>
                </div>
                <div>
                    <nav>
                        <ul className="flex items-center gap-2">
                            {userData && navItems.filter((item) => item.roles.includes(userData.roleName)).map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href} key={index} className={`px-5 py-3 rounded-full text-[15px] text-gray-900  ${pathname === item.href ? 'bg-[#3E84DE] text-white' : 'hover:bg-white/40'}`}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))
                            }
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                    <button
                        type="button"
                        className="transition-colors cursor-pointer"
                        onClick={(event) => menuRight.current?.toggle(event)}
                        aria-controls="popup_menu"
                        aria-haspopup
                    >
                        <img
                            alt="logo"
                            src={userData.profileImg || 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                            height="40"
                            className="rounded-full w-10 h-10"
                        />
                    </button>
                    {/* <Button label="Show Right" icon="pi pi-align-right" className="mr-2" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup /> */}
                </div>
            </div>
            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}
