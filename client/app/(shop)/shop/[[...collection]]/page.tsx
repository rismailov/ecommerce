'use client'

import { DesktopFilters } from '@/components/shop/DesktopFilters'
import { ShopHeader } from '@/components/shop/ShopHeader'
import { TFilterOptions } from '@/components/shop/types'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const options: TFilterOptions = {
    sizes: [{ value: 'foo', label: 'bar', collection: 'baz' }],
    colors: [{ value: 'foo', label: 'bar', hex: 'baz' }],
}

export default function Shop() {
    const [showFilters, setShowFilters] = useState<boolean>(true)

    // total products count
    const [totalProducts] = useState<number>(0)

    return (
        <div className="flex flex-nowrap">
            <AnimatePresence initial={false} mode="wait">
                {showFilters && <DesktopFilters options={options} />}
            </AnimatePresence>

            <div className="flex-1 flex flex-col space-y-5">
                <ShopHeader
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    totalProducts={totalProducts}
                />

                <p>Products</p>
            </div>
        </div>
    )
}
