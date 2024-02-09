import { Rating } from '@/components/common/Rating'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { TPaginatedData } from '@/types'
import { ProductShowEntity } from '@/types/entities/product.entity'
import { ReviewEntity } from '@/types/entities/review.entity'
import { Reviews } from './Reviews'

export const ShowProductAccordion = ({
    product,
    reviews,
}: {
    product: ProductShowEntity
    reviews: TPaginatedData<ReviewEntity[]>
}) => {
    return (
        <Accordion type="multiple" className="pt-5">
            <AccordionItem value="sar" className="py-4 border-t">
                <AccordionTrigger className="font-semibold text-xl hover:no-underline [&_svg]:w-5 [&_svg]:h-5">
                    Shipping & Returns
                </AccordionTrigger>

                <AccordionContent>
                    <p className="text-base text-muted-foreground">
                        Free standard shipping on orders $50+ and free 60-day
                        returns for Nike Members.
                    </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem
                value="reviews"
                className="py-4 border-b-transparent"
            >
                <AccordionTrigger className="font-semibold text-xl hover:no-underline [&_svg]:w-5 [&_svg]:h-5">
                    {`Reviews (${reviews.meta.total})`}
                </AccordionTrigger>

                <AccordionContent>
                    <div className="flex flex-col items-start">
                        {/* Review stars and average stars count */}
                        <div className="flex items-center space-x-2">
                            <Rating
                                readOnly
                                style={{ maxWidth: 100 }}
                                value={product.avgStars}
                            />

                            <p className="text-base leading-none text-muted-foreground">{`${product.avgStars
                                .toString()
                                .replace('.', ',')} stars`}</p>
                        </div>

                        <Reviews productID={product.id} reviews={reviews} />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
