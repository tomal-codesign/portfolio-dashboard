import api from "../lib/api";
import { RolesResponse } from "../types/role";



export const RoleService = {
    getRole: async (): Promise<RolesResponse> => {
        const res = await api.get("/roles");
        return res.data;
    }
};