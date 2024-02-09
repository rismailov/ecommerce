'use client'

import { ProductDescription } from '@/components/shop/products/show/ProductDescription'
import { ShowProductNotFound } from '@/components/shop/products/show/ShowProductNotFound'
import { ShowProductSkeleton } from '@/components/shop/products/show/ShowProductSkeleton'
import { DesktopSlider } from '@/components/shop/products/show/sliders/DesktopSlider'
import axios from '@/lib/axios'
import { sleep } from '@/lib/utils'
import { TPaginatedData } from '@/types'
import { ProductShowEntity } from '@/types/entities/product.entity'
import { ReviewEntity } from '@/types/entities/review.entity'
import '@smastrom/react-rating/style.css'
import { useQuery } from '@tanstack/react-query'
import 'swiper/css'

export default function ShowProduct({ params }: { params: { id: string } }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', params.id],
        queryFn: async (): Promise<{
            product: ProductShowEntity
            reviews: TPaginatedData<ReviewEntity[]>
        }> => {
            await sleep(200)

            return axios.get(`/products/${params.id}`)
        },
    })

    if (isLoading) {
        return <ShowProductSkeleton />
    }

    if (isError || !data) {
        return <ShowProductNotFound />
    }

    return (
        <div className="flex flex-col lg:flex-row items-start lg:space-x-[50px]">
            <DesktopSlider product={data.product} />

            <ProductDescription product={data.product} reviews={data.reviews} />
        </div>
    )
}
