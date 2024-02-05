'use client'

import { Accordion } from '@/components/ui/accordion'
import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { TFilterOptions } from '../../../types'
import {
    CollectionFilter,
    ColorFilter,
    PriceFilter,
    SizeFilter,
    SortByFilter,
} from './filters'

export const FiltersBase = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['filter-options'],
        queryFn: (): Promise<TFilterOptions> => axios.get('/filter-options'),
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
    })

    return (
        <Accordion
            type="multiple"
            defaultValue={['sort', 'collection', 'price', 'size', 'color']}
            className="w-full"
        >
            <SortByFilter />
            <CollectionFilter />
            <PriceFilter />
            <SizeFilter isLoading={isLoading} options={data?.sizes} />
            <ColorFilter isLoading={isLoading} options={data?.colors} />
        </Accordion>
    )
}
