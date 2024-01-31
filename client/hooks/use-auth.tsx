'use client'

import axios from '@/lib/axios'
import { ROUTES } from '@/lib/routes'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export interface UserEntity {
    id: number
    first_name: string
    last_name: string
    email: string
    email_verified_at?: Date
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: {
    middleware?: string
    redirectIfAuthenticated?: string
}) => {
    const router = useRouter()

    const queryClient = useQueryClient()

    const { data: user, error } = useQuery({
        queryKey: ['authUser'],
        queryFn: (): Promise<UserEntity> =>
            axios
                .get('/user')
                .then((res) => res.data)
                .catch((error) => {
                    if (error.response?.status === 409) {
                        router.push('/verify-email')
                    }

                    return null
                }),
    })

    /**
     * We're not invalidating queries locally (in this file) and exporting it instead
     * because we're using react-query mutations and it's impossible to "await" the response
     * to invalidate queries, because request itself must be returned for mutations to work.
     */
    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ['authUser'] })

    /**
     * Local Requests.
     */
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    /**
     * Exported Requests.
     */
    const register = async <T,>(data: T) => {
        await csrf()

        return axios.post('/auth/register', data)
    }

    const login = async <T,>(data: T) => {
        await csrf()

        return axios.post('/auth/login', data)
    }

    const forgotPassword = async <T,>(data: T) => {
        await csrf()

        return axios.post('/auth/forgot-password', data)
    }

    const resetPassword = async <T,>(data: T) => {
        await csrf()

        return axios.post('/auth/reset-password', data)
    }

    // We're awaiting axios.post() here because this request won't be used in mutation.
    const logout = async () => {
        if (error) {
            return
        }

        await axios.post('/auth/logout')

        // after logout, we need to rerender all components that depend on this hook
        // invalidateQuery() will refetch the user but won't reset the user back to "null"
        // in case of error (401) and components won't rerender because of that.
        // that's why we're explicitly resetting query here
        await queryClient.resetQueries({ queryKey: ['authUser'] })

        router.push(ROUTES.AUTH.LOGIN)
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at &&
            redirectIfAuthenticated
        ) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && error) logout()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, error, middleware, redirectIfAuthenticated])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        logout,
        invalidate,
    }
}
