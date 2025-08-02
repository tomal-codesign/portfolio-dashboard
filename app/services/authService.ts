import api from "../lib/api";


export const authService = {
    login: async (payload: LoginForm): Promise<LoginResponse> => {
        const res = await api.post("/login", payload);
        return res.data;
    },
}