// pages/unauthorized.tsx

import Link from "next/link";
import { Icon } from "@iconify/react";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                    <Icon icon="mdi:shield-alert" className="h-12 w-12 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    You do not have permission to view this page.
                </p>
                <Link href="/pages/dashboard">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full transition duration-300 cursor-pointer">
                        Go Back to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}
