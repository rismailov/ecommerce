import { Cart } from '@/components/shop/Cart'
import { PropsWithChildren } from 'react'

export default function ShopLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Cart />

            {children}
        </>
    )
}
