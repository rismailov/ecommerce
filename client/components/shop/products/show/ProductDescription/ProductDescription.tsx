import { cn, toTitleCase } from '@/lib/utils'
import { ProductShowEntity } from '@/types/entities/product.entity'
import MobileSlider from '../sliders/MobileSlider'
import { AddToCartForm } from './AddToCartForm'
import { ShowProductAccordion } from './ShowProductAccordion'

export const ProductDescription = ({
    product,
}: {
    product: ProductShowEntity
}) => {
    return (
        <section className="flex-1 flex flex-col space-y-8 lg:pb-10 w-full">
            <div className="md:max-w-lg flex flex-col space-y-3">
                <h1 className="text-3xl font-bold tracking-tight leading-none">
                    {`Nike ${product.name}`}
                </h1>

                <p className="text-muted-foreground text-lg leading-none">{`${toTitleCase(product.collection)}'s Shoes`}</p>
            </div>

            <MobileSlider {...product} />

            <p className="text-2xl font-semibold flex items-center space-x-3">
                <span
                    className={cn(
                        !!product.price.discounted &&
                            'line-through text-muted-foreground',
                    )}
                >
                    ${product.price.initial}
                </span>

                {product.price.discounted && (
                    <span>${product.price.discounted}</span>
                )}
            </p>

            <AddToCartForm {...product} />

            <ShowProductAccordion product={product} />
        </section>
    )
}
