'use client'

import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex-1 pt-12 sm:pt-16 lg:pt-20">
            <div className="container">
                <div className="flex flex-col items-center justify-center py-14">
                    {children}
                </div>
            </div>
        </div>
    )
}
