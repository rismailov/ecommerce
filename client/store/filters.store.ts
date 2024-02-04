import { TSortValue } from '@/components/shop/types'
import { LOAD_MORE_PRODUCTS_AMOUNT } from '@/constants'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type TPriceProductFilter = {
    min: number | string | null
    max: number | string | null
    onSale: boolean
}

type FiltersStore = {
    collections: string[]
    setCollections: (genders: string[]) => void

    sizes: string[]
    setSizes: (sizes: string[]) => void

    colours: string[]
    setColours: (colours: string[]) => void

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
        setCollections: (genders) => set({ collections: genders }),

        sizes: [],
        setSizes: (sizes) => set({ sizes }),

        colours: [],
        setColours: (colours) => set({ colours }),

        price: { min: null, max: null, onSale: false },
        setPrice: (price) => set({ price }),

        sort: 'date-desc',
        setSort: (value) => set({ sort: value }),

        limit: LOAD_MORE_PRODUCTS_AMOUNT,
        setLimit: (limit) => set({ limit }),
    }),
    shallow,
)

export default useFiltersStore