'use client'

import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex-1 md:pt-4">
            <div className="flex justify-center">{children}</div>
        </div>
    )
}
