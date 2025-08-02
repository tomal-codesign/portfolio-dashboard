interface LoginForm {
    email: string;
    password: string;
}
interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        profileImg: string;
    }
}