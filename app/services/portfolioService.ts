import api from "../lib/api";
import { portfolioResponse } from "../types/portfolio";

export const PortfolioService = {
    getPortfolio: async ({ userId }: { userId: number }): Promise<portfolioResponse> => {
        const res = await api.get(`/portfolios/${userId}`);
        return res.data;
    }
};