'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import useCartStore from '@/store/cart.store'
import { CartItem } from '../Cart/CartItem'

export const CheckoutItems = () => {
    const items = useCartStore((s) => s.items)

    return (
        <Card className="md:max-w-xl w-full p-0">
            <CardHeader>
                <div className="flex items-center space-x-3 justify-between">
                    <h3>Products</h3>

                    <p className="text-lg font-medium">
                        Total: $
                        {items.reduce<number | string>(
                            (prev, cur) =>
                                (
                                    +prev +
                                    parseFloat(cur.price) * cur.amount
                                ).toFixed(2),
                            0.0,
                        )}
                    </p>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-8">
                <ScrollArea className="h-[520px] pr-8" type="always">
                    <div className="flex flex-col space-y-4">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                cartItem={item}
                                variant="checkout"
                            />
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
