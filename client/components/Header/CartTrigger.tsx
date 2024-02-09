import { Button } from '@/components/ui/button'
import useCartStore from '@/store/cart.store'
import { IconShoppingCart } from '@tabler/icons-react'

export const CartTrigger = () => {
    const items = useCartStore((s) => s.items)
    const toggleCart = useCartStore((s) => s.toggleIsCartOpened)

    return (
        <Button
            size="icon"
            variant="outline"
            onClick={toggleCart}
            className="relative"
            aria-label="Open cart"
        >
            <IconShoppingCart className="w-4.5 h-4.5" />

            {!!items.length && (
                <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-primary-foreground bg-primary rounded-full -top-[3px] -right-[3px]">
                    {items.reduce((prev, cur) => prev + cur.amount, 0)}
                </div>
            )}
        </Button>
    )
}
