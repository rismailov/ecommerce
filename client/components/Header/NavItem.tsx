import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { Button } from '../ui/button'

export const NavItem = ({ href, children }: PropsWithChildren<LinkProps>) => {
    return (
        <Button
            asChild
            variant="link"
            className="text-base text-muted-foreground hover:text-foreground"
        >
            <Link href={href}>{children}</Link>
        </Button>
    )
}
