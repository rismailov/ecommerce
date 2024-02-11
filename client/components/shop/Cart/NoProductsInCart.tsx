import { IconShoppingCart } from '@tabler/icons-react'

export const NoProductsInCart = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center pb-8">
            <p className="mb-4 text-muted-foreground text-center">
                Nothing here.
                <br />
                Visit store to add some products.
            </p>

            <div className="w-20 h-20 border border-dashed flex items-center justify-center rounded-full">
                <IconShoppingCart
                    className="w-8 h-8 text-muted-foreground"
                    strokeWidth={1.5}
                />
            </div>
        </div>
    )
}
