import api from "../lib/api";
import { userResponse } from "../types/user";

export const UserService = {
    getUser: async (): Promise<userResponse> => {
        const res = await api.get("/users");
        return res.data;
    }
}