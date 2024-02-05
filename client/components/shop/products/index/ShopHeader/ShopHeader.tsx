import { Dispatch, SetStateAction } from 'react'
import { SortProductsButton } from './SortProductsButton'
import { ToggleFiltersButton } from './ToggleFiltersButton'

export const ShopHeader = ({
    totalProducts,
    showFilters,
    setShowFilters,
}: {
    totalProducts: number
    showFilters: boolean
    setShowFilters: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <section className="w-full sticky top-[-1px] h-[40px] z-10 bg-background flex items-center justify-end space-x-5">
            <p className="text-muted-foreground">
                {`${totalProducts} ${
                    totalProducts === 1 ? 'result' : 'results'
                }`}
            </p>

            <SortProductsButton />

            <ToggleFiltersButton
                showFilters={showFilters}
                setShowFilters={setShowFilters}
            />
        </section>
    )
}
