import { Rating } from '@/components/common/Rating'
import { Button } from '@/components/ui/button'
import { ReviewEntity } from '@/types/entities/review.entity'
import { useState } from 'react'

export const Review = (review: ReviewEntity) => {
    const { excerpt, full } = review.text

    const [showFullText, setShowFullText] = useState(false)

    return (
        <div className="flex flex-col">
            <p className="text-base font-medium">{review.title}</p>

            <div className="mt-1 flex items-center space-x-2">
                <Rating
                    readOnly
                    value={review.stars}
                    style={{ maxWidth: 80 }}
                />

                <p className="text-sm text-muted-foreground">{`${review.credentials}, ${review.date}`}</p>
            </div>

            <p className="mt-2 max-w-xl text-base">
                {showFullText ? full : excerpt}
                {excerpt.length !== full.length && !showFullText && (
                    <Button
                        onClick={() => setShowFullText(true)}
                        variant="link"
                        className="inline-flex ml-2 text-primary-text underline hover:no-underline"
                    >
                        More
                    </Button>
                )}
            </p>
        </div>
    )
}
