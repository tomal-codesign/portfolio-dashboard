// pages/404.tsx

import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
            <Icon icon="mdi:file-search-outline" className="w-24 h-24 text-gray-400 mb-6" />
            <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
            <p className="max-w-md text-gray-500 mb-8">
                Oops! The page you're looking for doesn’t exist or has been moved.
            </p>
            <Link href="/">
                <a className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
                    Go to Homepage
                </a>
            </Link>
        </div>
    );
}
