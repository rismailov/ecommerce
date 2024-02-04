import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import useFiltersStore from '@/store/filters.store'
import clsx from 'clsx'
import { useMemo } from 'react'
import { TFilterOptions } from '../../types'

export const SizeFilter = ({
    options,
}: {
    options: TFilterOptions['sizes']
}) => {
    const sizes = useFiltersStore((s) => s.sizes)
    const setSizes = useFiltersStore((s) => s.setSizes)

    // Filter sizes by selected gender
    // if there are 0 or 3 selected collections, it means all collections selected
    const collections = useFiltersStore((s) => s.collections)
    const sizeOptionsByCollection = useMemo(() => {
        return collections.length === 0 || collections.length === 3
            ? options
            : options.filter((opt) => collections.includes(opt.collection))
    }, [collections, options])

    return (
        <AccordionItem value="size">
            <AccordionTrigger className="text-base">
                <div className="flex items-center space-x-2">
                    <span>Size</span>

                    {!!sizes.length && (
                        <Badge variant="secondary">{sizes.length}</Badge>
                    )}
                </div>
            </AccordionTrigger>

            <AccordionContent>
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
            </AccordionContent>
        </AccordionItem>
    )
}
