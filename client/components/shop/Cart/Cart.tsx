'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { sleep } from '@/lib/utils'
import useCartStore from '@/store/cart.store'
import { IconBox } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CartItem } from './CartItem'

export const Cart = () => {
    const { isCartOpened, toggleCart, items } = useCartStore((s) => ({
        isCartOpened: s.isCartOpened,
        toggleCart: s.toggleIsCartOpened,
        items: s.items,
    }))

    // show loader on checkout button; purely cosmetical, safe to remove
    const [isLoading, setIsLoading] = useState(false)

    const checkout = async () => {
        setIsLoading(true)

        await sleep()

        // router.visit(route('checkout'), {
        //     preserveScroll: true,
        //     preserveState: true,
        // })

        toggleCart()
        setIsLoading(false)
    }

    return (
        <Sheet open={isCartOpened} onOpenChange={toggleCart}>
            <SheetContent className="w-full flex flex-col justify-between xs:max-w-md sm:max-w-md rounded-tl-lg rounded-bl-lg shadow-none">
                <SheetHeader className="flex flex-col space-y-5">
                    <SheetTitle>
                        <div className="flex items-center">
                            <h3>Cart</h3>

                            <Badge
                                variant="outline"
                                className="ml-3 text-base rounded-md bg-accent border-none"
                            >
                                {items.reduce(
                                    (prev, cur) => prev + cur.amount,
                                    0,
                                )}
                            </Badge>
                        </div>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 h-full overflow-y-auto">
                    <ScrollArea className="h-full">
                        <AnimatePresence mode="popLayout">
                            {!items.length ? (
                                <p className="mt-2 font-medium text-muted-foreground">
                                    Your cart is empty.
                                </p>
                            ) : (
                                <div className="flex flex-col space-y-5">
                                    {items.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                y: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -10,
                                                transition: {
                                                    duration: 0,
                                                },
                                            }}
                                        >
                                            <CartItem
                                                cartItem={item}
                                                variant="cart"
                                            />

                                            {idx !== items.length - 1 && (
                                                <Separator className="mt-5" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </ScrollArea>
                </div>

                <SheetFooter>
                    <div className="w-full flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">
                                <span>Total: $</span>
                                {items.reduce<number | string>(
                                    (prev, cur) =>
                                        (
                                            +prev +
                                            parseFloat(cur.price) * cur.amount
                                        ).toFixed(2),
                                    0.0,
                                )}
                            </p>

                            <div className="inline-flex items-center space-x-1.5 text-muted-foreground">
                                <IconBox
                                    className="w-4 h-4"
                                    strokeWidth={1.5}
                                />

                                <span className="text-sm">Free shipping</span>
                            </div>
                        </div>

                        <Button
                            onClick={checkout}
                            isLoading={isLoading}
                            size="lg"
                            className="h-11 text-[0.925rem]"
                            disabled={!items.length}
                        >
                            Checkout
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
