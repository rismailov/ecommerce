import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { toTitleCase } from '@/lib/utils'
import useFiltersStore from '@/store/filters.store'
import { COLLECTIONS } from '../../constants'

export const CollectionFilter = () => {
    const genders = useFiltersStore((s) => s.collections)
    const setGenders = useFiltersStore((s) => s.setCollections)

    return (
        <AccordionItem value="gender">
            <AccordionTrigger className="text-base">Gender</AccordionTrigger>

            <AccordionContent>
                <div className="flex flex-col space-y-2">
                    {COLLECTIONS.map((c) => (
                        <Checkbox
                            key={c}
                            id={c}
                            value={c}
                            label={toTitleCase(c)}
                            checked={genders.includes(c)}
                            onCheckedChange={(checked) => {
                                setGenders(
                                    checked
                                        ? [...genders, c]
                                        : genders.filter((g) => g !== c),
                                )
                            }}
                        />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
