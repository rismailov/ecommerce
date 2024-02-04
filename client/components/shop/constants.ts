import { TSortValue } from './types'

export const SORT_OPTIONS: { value: TSortValue; label: string }[] = [
    { value: 'date-desc', label: 'Date: New to old' },
    { value: 'date-asc', label: 'Date: Old to new' },
    { value: 'price-desc', label: 'Price: High to low' },
    { value: 'price-asc', label: 'Price: Low to high' },
]

export const COLLECTIONS = ['men', 'women', 'kids']
