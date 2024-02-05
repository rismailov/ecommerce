import { TSortValue } from '@/components/shop/types'
import { LOAD_MORE_PRODUCTS_AMOUNT } from '@/constants'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type TPriceProductFilter = {
    min: number | string
    max: number | string
    onSale: boolean
}

type FiltersStore = {
    collections: string[]
    setCollections: (collections: string[]) => void

    sizes: string[]
    setSizes: (sizes: string[]) => void

    colors: string[]
    setColors: (colors: string[]) => void

    price: TPriceProductFilter
    setPrice: (price: TPriceProductFilter) => void

    sort: TSortValue
    setSort: (v: TSortValue) => void

    limit: number
    setLimit: (v: number) => void
}

const useFiltersStore = createWithEqualityFn<FiltersStore>(
    (set) => ({
        collections: [],
        setCollections: (collections) => set({ collections: collections }),

        sizes: [],
        setSizes: (sizes) => set({ sizes }),

        colors: [],
        setColors: (colors) => set({ colors }),

        price: { min: '', max: '', onSale: false },
        setPrice: (price) => set({ price }),

        sort: 'date-desc',
        setSort: (value) => set({ sort: value }),

        limit: LOAD_MORE_PRODUCTS_AMOUNT,
        setLimit: (limit) => set({ limit }),
    }),
    shallow,
)

export default useFiltersStore
