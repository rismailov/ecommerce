import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import useFiltersStore from '@/store/filters.store'
import clsx from 'clsx'
import { useMemo } from 'react'
import { TFilterOptions } from '../../../../types'
import { FilterSkeleton } from '../FilterSkeleton'

export const SizeFilter = ({
    options,
    isLoading,
}: {
    options: TFilterOptions['sizes'] | undefined
    isLoading: boolean
}) => {
    const sizes = useFiltersStore((s) => s.sizes)
    const setSizes = useFiltersStore((s) => s.setSizes)

    // filter sizes by selected collection
    // if there are 0 or 3 selected collections, it means all collections selected
    const collections = useFiltersStore((s) => s.collections)
    const sizeOptionsByCollection = useMemo(() => {
        if (!options) {
            return []
        }

        return collections.length === 0 || collections.length === 3
            ? options
            : options.filter((opt) => collections.includes(opt.collection))
    }, [collections, options])

    return (
        <AccordionItem value="size">
            <AccordionTrigger>
                <div className="flex items-center space-x-2">
                    <span>Size</span>

                    {!!sizes.length && (
                        <Badge variant="secondary">{sizes.length}</Badge>
                    )}
                </div>
            </AccordionTrigger>

            <AccordionContent>
                {isLoading && <FilterSkeleton />}

                {!isLoading && !sizeOptionsByCollection.length && (
                    <p className="text-muted-foreground">
                        No options available
                    </p>
                )}

                {!isLoading && sizeOptionsByCollection && (
                    <div className="grid grid-cols-3 gap-2">
                        {sizeOptionsByCollection.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() =>
                                    setSizes(
                                        sizes.includes(value)
                                            ? sizes.filter((s) => s !== value)
                                            : [...sizes, value],
                                    )
                                }
                                className={clsx([
                                    'p-2 border-[1.5px] rounded-md',
                                    sizes.includes(value) &&
                                        'border-accent-foreground',
                                ])}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    )
}
