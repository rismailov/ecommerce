import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { Button } from '../ui/button'

export const NavItem = ({ href, children }: PropsWithChildren<LinkProps>) => {
    return (
        <Button
            asChild
            variant="link"
            className="hover:no-underline uppercase text-foregorund text-[0.925rem]"
        >
            <Link href={href}>{children}</Link>
        </Button>
    )
}
