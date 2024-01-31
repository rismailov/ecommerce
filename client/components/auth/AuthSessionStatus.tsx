'use client'

import { TAlertType, useAppStore } from '@/store/app.store'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Alert, AlertDescription } from '../ui/alert'

// This component (abstraction) is needed purely because of the nextJS "useSearchParams" hook nuance.
// read more at: https://nextjs.org/docs/messages/deopted-into-client-rendering
// and: https://nextjs.org/docs/app/api-reference/functions/use-search-params
// NOTE: this component must be wrapped in <Suspense/> tag
export const AuthSessionStatus = ({
    page,
    setEmailAndToken,
}: {
    page: 'login' | 'forgot-password' | 'reset-password'
    setEmailAndToken?: Dispatch<
        SetStateAction<{ email: string | null; token: string | null }>
    >
}) => {
    const searchParams = useSearchParams()

    const type = useAppStore((s) => s.type)
    const status = useAppStore((s) => s.status)
    const setStatus = useAppStore((s) => s.setStatus)

    useEffect(() => {
        // A little explanation:
        // When user resets his password he gets redirected to "login" page
        // with a status (message) saying that reset was successful.
        if (page === 'login') {
            const resetPasswordStatus = searchParams.get('status')

            setStatus(resetPasswordStatus ? atob(resetPasswordStatus) : '')
        }

        if (page === 'reset-password' && setEmailAndToken) {
            setEmailAndToken({
                email: searchParams.get('email'),
                token: searchParams.get('token'),
            })
        }
    }, [page, searchParams, setEmailAndToken, setStatus])

    if (!status) {
        return null
    }

    return (
        <Alert variant={type as TAlertType} className="mb-6">
            <AlertDescription>{status}</AlertDescription>
        </Alert>
    )
}
