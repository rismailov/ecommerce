import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import useFiltersStore from '@/store/filters.store'
import { IconCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { TOption } from '../../../../types'
import { FilterSkeleton } from '../FilterSkeleton'

export const ColorFilter = ({
    options,
    isLoading,
}: {
    options: TOption<{ hex: string }>[] | undefined
    isLoading: boolean
}) => {
    const colors = useFiltersStore((s) => s.colors)
    const setColors = useFiltersStore((s) => s.setColors)

    return (
        <AccordionItem value="color" className="border-none">
            <AccordionTrigger>
                <div className="flex items-center space-x-2">
                    <span>Color</span>

                    {!!colors.length && (
                        <Badge variant="secondary">{colors.length}</Badge>
                    )}
                </div>
            </AccordionTrigger>

            <AccordionContent>
                {isLoading && <FilterSkeleton />}

                {!isLoading && !options && (
                    <p className="text-muted-foreground">
                        No options available
                    </p>
                )}

                {!isLoading && options?.length && (
                    <div className="pt-1 grid grid-cols-3 gap-5">
                        {options!.map(({ value, label, hex }) => (
                            <button
                                key={value}
                                className="flex flex-col items-center space-y-1"
                                onClick={() =>
                                    setColors(
                                        colors.includes(value)
                                            ? colors.filter((c) => c !== value)
                                            : [...colors, value],
                                    )
                                }
                            >
                                {/* color swatch */}
                                <div
                                    className="w-6 h-6 flex items-center justify-center rounded-full border"
                                    style={{ background: hex }}
                                >
                                    {colors.includes(value) && (
                                        <IconCheck
                                            size={15}
                                            strokeWidth={2.5}
                                            className={clsx(
                                                hex === '#ffffff'
                                                    ? 'stroke-accent-foreground'
                                                    : 'stroke-white',
                                            )}
                                        />
                                    )}
                                </div>

                                {/* color name */}
                                <p className="text-center">{label}</p>
                            </button>
                        ))}
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    )
}
