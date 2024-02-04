import { Accordion } from '@/components/ui/accordion'
import { TFilterOptions } from '../types'
import {
    CollectionFilter,
    ColourFilter,
    PriceFilter,
    SizeFilter,
    SortByFilter,
} from './filters'

export const FiltersBase = ({ options }: { options: TFilterOptions }) => {
    return (
        <Accordion
            type="multiple"
            defaultValue={['sort', 'gender', 'price', 'size', 'colour']}
            className="w-full"
        >
            <SortByFilter />

            <CollectionFilter />

            <PriceFilter />

            <SizeFilter options={options.sizes} />

            <ColourFilter options={options.colors} />
        </Accordion>
    )
}
