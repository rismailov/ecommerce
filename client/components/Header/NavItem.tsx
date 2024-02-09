import { ROUTES } from '@/lib/routes'
import useFiltersStore from '@/store/filters.store'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Button } from '../ui/button'

export const NavItem = ({
    children,
    collection,
}: PropsWithChildren<{ collection?: string }>) => {
    const setCollections = useFiltersStore((s) => s.setCollections)

    return (
        <Button
            asChild
            variant="link"
            className="text-base text-muted-foreground hover:text-foreground"
            onClick={() => setCollections(collection ? [collection] : [])}
        >
            <Link href={ROUTES.SHOP.INDEX}>{children}</Link>
        </Button>
    )
}
