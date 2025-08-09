// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const roleAccessMap: Record<string, string[]> = {
    "/pages/dahsboard": ["User", "Admin"],
    "/pages/user-management": ["Admin"],
    "/pages/reports": ["Admin"]
};

function canAccessRoute(pathname: string, role: string): boolean {
    for (const routePrefix in roleAccessMap) {
        if (pathname.startsWith(routePrefix)) {
            return roleAccessMap[routePrefix].includes(role);
        }
    }
    return true;
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get("token")?.value;
    const userStr = req.cookies.get("user")?.value;

    // Parse user cookie if it exists
    let user: { roleName: string } | null = null;
    try {
        user = userStr ? JSON.parse(decodeURIComponent(userStr)) : null;
    } catch {
        user = null;
    }

    // ✅ Redirect logged-in users away from login page
    if (pathname.startsWith("/pages/login") && token) {
        return NextResponse.redirect(new URL("/pages/dashboard", req.url));
    }

    // ✅ If not logged in and not on login page → send to login
    if (!token && !pathname.startsWith("/pages/login")) {
        return NextResponse.redirect(new URL("/pages/login", req.url));
    }

    // ✅ Role-based access check
    if (user?.roleName && !canAccessRoute(pathname, user.roleName)) {
        return NextResponse.redirect(new URL("/pages/unauthorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/pages/:path*"],
};
