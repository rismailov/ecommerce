import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

type Props = LinkProps &
    PropsWithChildren<{
        isActive: boolean
    }>

export const MobileMenuItem = ({ isActive, children, ...props }: Props) => {
    return (
        <Link
            {...props}
            className={cn(
                'w-full flex items-center justify-between space-x-4 py-1.5 text-xl font-medium [&>svg]:w-5 [&>svg]:h-5',
                isActive ? 'text-foreground' : 'text-muted-foreground/80',
            )}
        >
            {children}
        </Link>
    )
}