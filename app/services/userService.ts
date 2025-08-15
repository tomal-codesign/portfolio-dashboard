import api from "../lib/api";
import { userByIdResponse, userResponse } from "../types/user";

export const UserService = {
    getUser: async (): Promise<userResponse> => {
        const res = await api.get("/users");
        return res.data;
    },
    postUser: async (payload: any): Promise<userResponse> => {
        const res = await api.post("/user/create", payload);
        return res.data;
    },
    updateUser: async (id: number, payload: any): Promise<userResponse> => {
        const res = await api.put(`/user/${id}`, payload);
        return res.data;
    },
    deleteUser: async (id: string): Promise<userResponse> => {
        const res = await api.delete(`/user/${id}`);
        return res.data;
    },
    getUserById: async (id: string): Promise<userByIdResponse> => {
        const res = await api.get(`/user/${id}`);
        return res.data;
    },
}