import { Button } from '@/components/ui/button'
import { cn, toTitleCase } from '@/lib/utils'
import useCartStore, { TCartItem } from '@/store/cart.store'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import Image from 'next/image'

const MAX_AMOUNT = 5
const MIN_AMOUNT = 1

export const CartItem = ({
    cartItem,
    variant,
}: {
    cartItem: TCartItem
    variant: 'cart' | 'checkout'
}) => {
    const updateItemAmount = useCartStore((state) => state.updateItemAmount)
    const removeItem = useCartStore((state) => state.removeItem)

    const changeAmount = (action: 'inc' | 'dec') => {
        if (
            (action === 'inc' && cartItem.amount === MAX_AMOUNT) ||
            (action === 'dec' && cartItem.amount === MIN_AMOUNT)
        ) {
            return
        }

        updateItemAmount({
            itemID: `${cartItem.id}-${cartItem.size.value}`,
            amount:
                action === 'inc' ? cartItem.amount + 1 : cartItem.amount - 1,
        })
    }

    return (
        <div className="flex items-stretch overflow-hidden space-x-4">
            {/* product image */}
            <div className="relative w-24 h-28">
                <Image
                    alt={cartItem.name}
                    src={cartItem.imageUrl}
                    fill
                    className="object-center object-cover rounded-lg"
                    sizes="(max-width: 768px) 7vw, (max-width: 1200px) 7vw, 7vw"
                />
            </div>

            <div className="flex-1 flex flex-col items-start justify-between">
                <div className="w-full flex flex-col">
                    {/* name & price */}
                    <div className="flex items-center justify-between font-semibold">
                        <p className="font-semibold">{`Nike ${cartItem.name}`}</p>

                        <p className="font-semibold">${cartItem.price}</p>
                    </div>

                    {/* collection */}
                    <p className="text-sm text-muted-foreground">
                        {toTitleCase(cartItem.collection)}
                    </p>

                    {/* size */}
                    <p className="mt-0.5 text-sm text-muted-foreground">{`Size: ${cartItem.size.label}`}</p>
                </div>

                {variant === 'cart' && (
                    <div className="mt-2 w-full flex items-center justify-between">
                        {/* counter */}
                        <div className="flex items-center space-x-3">
                            <Button
                                onClick={() => changeAmount('dec')}
                                size="sm"
                                variant="ghost"
                                className={cn(
                                    'py-1 px-1.5',
                                    cartItem.amount === MIN_AMOUNT &&
                                        'pointer-events-none opacity-30',
                                )}
                            >
                                <IconMinus className="sprite" size={15} />
                            </Button>

                            <span className="select-none text-sm font-medium">
                                {cartItem.amount}
                            </span>

                            <Button
                                onClick={() => changeAmount('inc')}
                                size="sm"
                                variant="ghost"
                                className={cn(
                                    'py-1 px-1.5',
                                    cartItem.amount === MAX_AMOUNT &&
                                        'pointer-events-none opacity-30',
                                )}
                            >
                                <IconPlus className="sprite" size={15} />
                            </Button>
                        </div>

                        {/* remove button */}
                        <Button
                            onClick={() => removeItem(cartItem.id)}
                            variant="link"
                            size="sm"
                            className="text-sm font-medium"
                        >
                            Remove
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
