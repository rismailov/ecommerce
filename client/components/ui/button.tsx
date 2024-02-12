import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { IconLoader2 } from '@tabler/icons-react'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary hover:bg-secondary/90',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-brand-foreground underline-offset-4 hover:underline !p-0 !h-auto font-[450] transition-none',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-4 text-[0.8rem]',
                lg: 'h-[42px] rounded-md px-6 text-base leading-none',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<
    HTMLButtonElement,
    ButtonProps & { isLoading?: boolean }
>(({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <IconLoader2 className="w-5 h-5 animate-spin" />
            ) : (
                props.children
            )}
        </Comp>
    )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
