import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import { IconShoppingBagX } from '@tabler/icons-react'
import Link from 'next/link'

export const ShowProductNotFound = () => {
    return (
        <div className="h-[300px] flex flex-col items-center justify-center">
            <p className="text-muted-foreground text-center">
                Product not found.
            </p>

            <div className="w-20 h-20 border border-dashed flex items-center justify-center rounded-full mt-5 mb-7">
                <IconShoppingBagX
                    className="w-8 h-8 text-muted-foreground"
                    strokeWidth={1.5}
                />
            </div>

            <Button asChild>
                <Link href={ROUTES.SHOP.INDEX}>Continue Shopping</Link>
            </Button>
        </div>
    )
}
