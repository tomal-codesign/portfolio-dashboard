import api from "../lib/api";
import { portfolioData, portfolioResponse } from "../types/portfolioData";

export const PortfolioService = {
    getPortfolio: async ({ userId }: { userId: number }): Promise<portfolioResponse> => {
        const res = await api.get(`/portfolios/${userId}`);
        return res.data;
    },
    createPortfolio: async (payload: portfolioData): Promise<portfolioResponse> => {
        const res = await api.post("/portfolio/create", payload);
        return res.data;
    },
    updatePortfolio: async (id: number, payload: portfolioData): Promise<portfolioResponse> => {
        const res = await api.put(`/portfolio/${id}`, payload);
        return res.data;
    },
    deletePortfolio: async (id: number): Promise<portfolioResponse> => {
        const res = await api.delete(`/portfolio/${id}`);
        return res.data;
    },
};