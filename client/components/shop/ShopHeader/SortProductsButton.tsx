import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useFiltersStore from '@/store/filters.store'
import { IconArrowsDownUp } from '@tabler/icons-react'
import { SORT_OPTIONS } from '../constants'

export const SortProductsButton = () => {
    const sort = useFiltersStore((s) => s.sort)
    const setSort = useFiltersStore((s) => s.setSort)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="hidden lg:flex items-center space-x-1 hover:text-muted-foreground">
                    <span>Sort By</span>

                    <IconArrowsDownUp size={15} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {SORT_OPTIONS.map((opt) => (
                    <DropdownMenuCheckboxItem
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
                        checked={opt.value === sort}
                    >
                        {opt.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
