import { SORT_OPTIONS } from '@/components/shop/constants'
import { TSortValue } from '@/components/shop/types'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useFiltersStore from '@/store/filters.store'

export const SortByFilter = () => {
    const sort = useFiltersStore((s) => s.sort)
    const setSort = useFiltersStore((s) => s.setSort)

    return (
        <AccordionItem value="sort" className="lg:hidden">
            <AccordionTrigger>
                <div className="flex items-center space-x-2">
                    <span>{'Sort By'}</span>
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <RadioGroup
                    value={sort}
                    onValueChange={(value: TSortValue) => setSort(value)}
                >
                    {SORT_OPTIONS.map((opt) => (
                        <div
                            key={opt.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem value={opt.value} id={opt.value} />

                            <Label htmlFor={opt.value} className="text-base">
                                {opt.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </AccordionContent>
        </AccordionItem>
    )
}
