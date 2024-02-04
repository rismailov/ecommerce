'use client'

import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex-1 pt-1 md:pt-4 lg:pt-6">
            <div className="flex justify-center">{children}</div>
        </div>
    )
}
