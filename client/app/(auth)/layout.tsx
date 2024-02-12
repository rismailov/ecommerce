'use client'

import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="container">
            <div className="flex justify-center pt-1 md:pt-4 lg:pt-6 pb-6">
                {children}
            </div>
        </div>
    )
}
