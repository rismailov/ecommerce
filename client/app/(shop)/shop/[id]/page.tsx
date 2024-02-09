'use client'

import { ProductDescription } from '@/components/shop/products/show/ProductDescription'
import { ShowProductNotFound } from '@/components/shop/products/show/ShowProductNotFound'
import { DesktopSlider } from '@/components/shop/products/show/sliders/DesktopSlider'
import axios from '@/lib/axios'
import { ProductShowEntity } from '@/types/entities/product.entity'
import '@smastrom/react-rating/style.css'
import { useQuery } from '@tanstack/react-query'
import 'swiper/css'

export default function ShowProduct({ params }: { params: { id: string } }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', params.id],
        queryFn: (): Promise<ProductShowEntity> =>
            axios.get(`/products/${params.id}`),
    })

    if (isLoading) {
        return <></>
    }

    if (isError || !data) {
        return <ShowProductNotFound />
    }

    return (
        <div className="flex flex-col lg:flex-row items-start lg:space-x-[50px]">
            <DesktopSlider product={data} />

            <ProductDescription product={data} />
        </div>
    )
}
