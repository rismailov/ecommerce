'use client'

import { DesktopFilters } from '@/components/shop/products/index/DesktopFilters'
import { Products } from '@/components/shop/products/index/Products'
import { ShopHeader } from '@/components/shop/products/index/ShopHeader'
import useFiltersStore from '@/store/filters.store'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Shop() {
    const url = usePathname()
    const setCollections = useFiltersStore((s) => s.setCollections)

    // update collections state when users clicks header links
    useEffect(() => {
        const segments = url.split('/')

        // link without collection clicked
        if (segments.length === 2) {
            setCollections([])
        }

        // link with collection clicked and it's a valid segment
        if (
            segments.length === 3 &&
            ['men', 'women', 'kids'].includes(segments[2])
        ) {
            setCollections([segments[2]])
        }
    }, [url, setCollections])

    const [showFilters, setShowFilters] = useState<boolean>(true)
    const [totalProducts, setTotalProducts] = useState<number>(0)

    return (
        <div className="flex flex-nowrap">
            <AnimatePresence initial={false} mode="wait">
                {showFilters && <DesktopFilters />}
            </AnimatePresence>

            <div className="flex-1 flex flex-col space-y-5">
                <ShopHeader
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    totalProducts={totalProducts}
                />

                <Products
                    showFilters={showFilters}
                    setTotalProducts={setTotalProducts}
                />
            </div>
        </div>
    )
}
