import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { toTitleCase } from '@/lib/utils'
import useFiltersStore from '@/store/filters.store'
import { COLLECTIONS } from '../../../../constants'

export const CollectionFilter = () => {
    const collections = useFiltersStore((s) => s.collections)
    const setCollections = useFiltersStore((s) => s.setCollections)

    return (
        <AccordionItem value="collection">
            <AccordionTrigger className="pt-0">Collection</AccordionTrigger>

            <AccordionContent>
                <div className="flex flex-col space-y-2">
                    {COLLECTIONS.map((c) => (
                        <Checkbox
                            key={c}
                            id={c}
                            value={c}
                            label={toTitleCase(c)}
                            checked={collections.includes(c)}
                            onCheckedChange={(checked) => {
                                setCollections(
                                    checked
                                        ? [...collections, c]
                                        : collections.filter((g) => g !== c),
                                )
                            }}
                        />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
