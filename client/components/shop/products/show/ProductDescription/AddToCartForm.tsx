import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useCartStore from '@/store/cart.store'
import { ProductShowEntity } from '@/types/entities/product.entity'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const AddToCartForm = (product: ProductShowEntity) => {
    const addItem = useCartStore((state) => state.addItem)
    const toggleCart = useCartStore((state) => state.toggleIsCartOpened)

    const [selectedSize, setSelectedSize] = useState(product.availableSizes[0])

    const onAddItem = () => {
        addItem({
            id: `${product.id}-${selectedSize.value}`,
            imageUrl: product.images[0].url,
            name: product.name,
            size: selectedSize,
            price: product.price.discounted ?? product.price.initial,
            amount: 1,
            collection: product.collection,
        })

        toggleCart()
    }

    return (
        <div className="flex flex-col space-y-8">
            {/* choose size */}
            <div className="flex flex-col space-y-3">
                <p className="font-medium">{`Size: ${selectedSize.label}`}</p>

                <div className="grid grid-cols-6 gap-2">
                    {product.availableSizes.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setSelectedSize({ value, label })}
                            className={cn([
                                'p-2 border-2 rounded-md',
                                selectedSize.value === value &&
                                    'border-primary',
                            ])}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* choose color */}
            <div className="flex flex-col space-y-3">
                <p className="font-medium">{`Color: ${product.color}`}</p>

                <div className="w-fit flex flex-nowrap gap-1.5 overflow-x-auto">
                    {product.availableColors.map(({ nanoid, image, color }) => (
                        <Link key={nanoid} href={`/shop/${nanoid}`}>
                            <Image
                                src={image}
                                alt={`${product.name} ${color}`}
                                width={90}
                                height={80}
                                className={cn([
                                    'overflow-hidden rounded-lg border-2 object-center object-cover',
                                    nanoid === product.nanoid
                                        ? 'border-primary'
                                        : 'border-transparent',
                                ])}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            {/* add to cart */}
            <div className="pt-1">
                <Button
                    onClick={onAddItem}
                    size="lg"
                    className="rounded-full h-12 md:h-14 w-full md:w-2/4 lg:w-3/4 text-sm md:text-base"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}
