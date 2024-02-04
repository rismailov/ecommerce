export type TSortValue = 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc'

export type TOption<T = object> = T & {
    value: string
    label: string
}

export type TFilterOptions = {
    sizes: TOption<{ collection: string }>[]
    colors: TOption<{ hex: string }>[]
}
