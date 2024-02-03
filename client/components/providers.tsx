'use client'

import {
    MutationCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'
import { Header } from './Header'

type TLaravelValidationErrorPayload = {
    message: string
    errors: Record<string, Array<string>>
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },

        mutations: {
            retry: false,
        },
    },

    mutationCache: new MutationCache({
        onError: (error: unknown, _vars, _ctx, { meta }) => {
            // automatically set Laravel validation errors
            if (
                isAxiosError<TLaravelValidationErrorPayload>(error) &&
                error.response?.status === 422 &&
                meta !== undefined &&
                'setError' in meta
            ) {
                const errors = error.response?.data?.errors

                for (const prop in errors) {
                    meta.setError(prop, {
                        message: errors[prop],
                    })
                }
            }

            // show toast for unhandled server errors
            if (
                isAxiosError(error) &&
                error.response?.status &&
                error.response.status >= 500
            ) {
                toast('Something went wrong.')
            }
        },
    }),
})

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Header />

            <main className="flex-1 pt-2">
                <div className="container">{children}</div>
            </main>
        </QueryClientProvider>
    )
}
