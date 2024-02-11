'use client'

import { NoProductsInCart } from '@/components/shop/Cart/NoProductsInCart'
import { CheckoutForm } from '@/components/shop/checkout/CheckoutForm'
import { CheckoutItems } from '@/components/shop/checkout/CheckoutItems'
import useCartStore from '@/store/cart.store'

export default function CheckoutPage() {
    const items = useCartStore((s) => s.items)

    if (!items.length) {
        return (
            <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center">
                <NoProductsInCart />
            </div>
        )
    }

    return (
        <div className="flex flex-col-reverse md:flex-row items-start gap-5 lg:gap-8">
            <CheckoutForm />

            <CheckoutItems />
        </div>
    )
}
