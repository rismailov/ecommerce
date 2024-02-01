import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

export const MobileMenuItem = ({
    href,
    children,
}: PropsWithChildren<LinkProps>) => {
    const url = usePathname()

    return (
        <Link
            href={href}
            className={cn(
                'w-full flex items-center justify-between space-x-4 py-1.5 text-xl font-medium [&>svg]:w-5 [&>svg]:h-5 uppercase',
                url === href ? 'text-foreground' : 'text-muted-foreground/80',
            )}
        >
            {children}
        </Link>
    )
}
