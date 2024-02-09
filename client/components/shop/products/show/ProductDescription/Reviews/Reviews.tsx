import { Pagination } from '@/components/common/Pagination'
import { Button } from '@/components/ui/button'
import { TPaginatedData } from '@/types'
import { ReviewEntity } from '@/types/entities/review.entity'
import { useState } from 'react'
import { Review } from './Review'
import { WriteReviewModal } from './WriteReviewModal'

export const Reviews = ({
    reviews,
    productID,
}: {
    reviews: TPaginatedData<ReviewEntity[]>
    productID: number
}) => {
    const [isReviewModalOpened, setReviewModalOpened] = useState(false)

    const onPageChange = (page: number) => {
        console.log(page)
    }

    return (
        <>
            <Button
                onClick={() => setReviewModalOpened(true)}
                variant="link"
                className="mt-4 mb-8 text-primary-text font-medium underline hover:no-underline text-base"
            >
                Write a Review
            </Button>

            <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-8">
                    {reviews.data.map((review) => (
                        <Review key={review.id} {...review} />
                    ))}
                </div>

                <Pagination
                    page={reviews.meta.current_page}
                    total={reviews.meta.last_page}
                    onPageChange={onPageChange}
                />
            </div>

            <WriteReviewModal
                open={isReviewModalOpened}
                setOpen={setReviewModalOpened}
                productID={productID}
            />
        </>
    )
}
