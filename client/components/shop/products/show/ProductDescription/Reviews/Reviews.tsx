'use client'

import { Pagination } from '@/components/common/Pagination'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { RQ_REVIEWS_KEY } from '@/constants'
import axios from '@/lib/axios'
import { TPaginatedData } from '@/types'
import { ReviewEntity } from '@/types/entities/review.entity'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Review } from './Review'
import { WriteReviewModal } from './WriteReviewModal'

export const Reviews = ({ productID }: { productID: number }) => {
    // pagination page
    const [page, setPage] = useState<number>(1)

    const { data, isLoading } = useQuery({
        queryKey: [RQ_REVIEWS_KEY, productID, page],
        queryFn: (): Promise<TPaginatedData<ReviewEntity[]>> =>
            axios.get(`/reviews/${productID}`, {
                params: {
                    page,
                },
            }),
        placeholderData: keepPreviousData,
    })

    const [isReviewModalOpened, setReviewModalOpened] = useState(false)

    const onPageChange = (page: number) => setPage(page)

    return (
        <>
            <Button
                onClick={() => setReviewModalOpened(true)}
                variant="link"
                className="mt-4 mb-8 text-primary-text font-medium underline hover:no-underline text-base"
            >
                Write a Review
            </Button>

            {isLoading && (
                <div className="w-full flex flex-col space-y-4">
                    <div className="w-full flex flex-col space-y-2">
                        <Skeleton className="h-10" />
                        <Skeleton className="h-6" />
                        <Skeleton className="h-6" />
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                        <Skeleton className="h-10" />
                        <Skeleton className="h-6" />
                        <Skeleton className="h-6" />
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                        <Skeleton className="h-10" />
                        <Skeleton className="h-6" />
                        <Skeleton className="h-6" />
                    </div>
                </div>
            )}

            {!isLoading && !data && (
                <p className="-mt-3 text-base text-destructive-text">
                    Something went wrong fetching reviews.
                </p>
            )}

            {!isLoading && !!data && (
                <div className="flex flex-col space-y-10">
                    <div className="flex flex-col space-y-8">
                        {data.data.map((review) => (
                            <Review key={review.id} {...review} />
                        ))}
                    </div>

                    <Pagination
                        page={data.meta.current_page}
                        total={data.meta.last_page}
                        onPageChange={onPageChange}
                    />
                </div>
            )}

            <WriteReviewModal
                open={isReviewModalOpened}
                setOpen={setReviewModalOpened}
                productID={productID}
            />
        </>
    )
}
