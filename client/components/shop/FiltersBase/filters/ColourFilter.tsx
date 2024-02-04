import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import useFiltersStore from '@/store/filters.store'
import { IconCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { TOption } from '../../types'

export const ColourFilter = ({
    options,
}: {
    options: TOption<{ hex: string }>[]
}) => {
    const colours = useFiltersStore((s) => s.colours)
    const setColours = useFiltersStore((s) => s.setColours)

    return (
        <AccordionItem value="colour" className="border-none">
            <AccordionTrigger className="text-base">
                <div className="flex items-center space-x-2">
                    <span>Colour</span>

                    {!!colours.length && (
                        <Badge variant="secondary">{colours.length}</Badge>
                    )}
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <div className="pt-1 grid grid-cols-3 gap-5">
                    {options.map(({ value, label, hex }) => (
                        <button
                            key={value}
                            className="flex flex-col items-center space-y-1"
                            onClick={() =>
                                setColours(
                                    colours.includes(value)
                                        ? colours.filter((c) => c !== value)
                                        : [...colours, value],
                                )
                            }
                        >
                            {/* color swatch */}
                            <div
                                className="w-6 h-6 flex items-center justify-center rounded-full border"
                                style={{ background: hex }}
                            >
                                {colours.includes(value) && (
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
            </AccordionContent>
        </AccordionItem>
    )
}
