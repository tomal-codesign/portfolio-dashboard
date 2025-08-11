export interface portfolioResponse {
    message: string
    portfolios: portfolioData[]
}
export interface portfolioData {
    id: number
    title: string,
    description: string,
    imageUrl: string,
    link: string
    userId: number
}