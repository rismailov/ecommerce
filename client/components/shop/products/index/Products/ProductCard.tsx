import { cn } from '@/lib/utils'
import { ProductIndexEntity } from '@/types/entities/product.entity'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMedia } from 'react-use'
import { screens } from 'tailwindcss/defaultTheme'

export const ProductCard = ({
    product,
    showFilters,
}: {
    product: ProductIndexEntity
    showFilters: boolean
}) => {
    const minWidthLG = useMedia(`(min-width: ${screens.lg})`)

    return (
        <Link
            href={`/shop/${product.nanoid}`}
            className="w-full inline-flex flex-col"
        >
            {/* Image */}
            <motion.img
                layout
                src={product.imgUrl}
                alt={product.name}
                className="w-full rounded-xl object-center object-cover"
                loading="lazy"
                style={{
                    height: minWidthLG && !showFilters ? 450 : 350,
                }}
            />

            {/* Description */}
            <motion.div
                layout="position"
                className="flex flex-col items-start space-y-0.5 py-3"
            >
                {/* name */}
                <p className="text-lg font-medium leading-tight">{`Nike ${product.name}`}</p>

                {/* collection, colors count */}
                <p className="text-muted-foreground leading-tight">
                    {product.collection}
                </p>

                {/* price */}
                <div className="flex items-center space-x-2">
                    <p
                        className={cn([
                            'text-lg font-medium leading-tight',
                            product.price.discounted &&
                                'line-through text-muted-foreground',
                        ])}
                    >
                        ${product.price.initial}
                    </p>

                    {product.price.discounted && (
                        <p className="text-lg font-medium leading-tight">
                            ${product.price.discounted}
                        </p>
                    )}
                </div>
            </motion.div>
        </Link>
    )
}
