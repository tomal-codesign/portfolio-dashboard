export interface portfolioResponse {
    message: string
    portfolios: portfolio[]
}
export interface portfolio {
    id: number
    title: string,
    description: string,
    imageUrl: string,
    link: string
    userId: number
}