import { ROUTES } from '@/lib/routes'
import useFiltersStore from '@/store/filters.store'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export const MobileMenuItem = ({
    children,
    collection,
    close,
}: PropsWithChildren<{ collection?: string; close: () => void }>) => {
    const setCollections = useFiltersStore((s) => s.setCollections)

    const onClick = () => {
        setCollections(collection ? [collection] : [])
        close()
    }

    return (
        <Link
            href={ROUTES.SHOP.INDEX}
            onClick={onClick}
            className="w-full flex items-center justify-between space-x-4 py-1.5 text-xl font-medium [&>svg]:w-5 [&>svg]:h-5 uppercase text-muted-foreground/80"
        >
            {children}
        </Link>
    )
}
