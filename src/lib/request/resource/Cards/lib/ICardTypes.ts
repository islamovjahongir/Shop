export interface ICards {
    id: number
    title: string
    description: string
    price: number
    category: string
    image: string
    rating: ICardRate
}

export interface ICardRate {
    rate: number
    count: number
}