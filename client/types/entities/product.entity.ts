interface ProductEntityBase {
    id: number
    nanoid: string
    name: string
    collection: string
    price: {
        initial: string
        discounted: string | null // null means no discount
    }
    avgStars: number
}

/**
 * Slightly modified interfaces for each route action.
 */
export interface ProductIndexEntity extends ProductEntityBase {
    reviewsCount: number
    imgUrl: string
}

export interface ProductShowEntity extends ProductEntityBase {
    availableColors: {
        nanoid: string
        image: string
    }[]
    color: string
    availableSizes: { value: string; label: number }[]
    images: {
        id: number
        url: string
        order: number
    }[]
}
