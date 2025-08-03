import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000; // in seconds
        return decoded.exp < currentTime;
    } catch (err) {
        return true; // treat invalid token as expired
    }
};
