'use client'

import { RQ_AUTH_USER_KEY } from '@/constants'
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
    middleware?: 'dashboard' | 'guest'
    redirectIfAuthenticated?: string
}) => {
    const router = useRouter()

    const queryClient = useQueryClient()

    const { data: user, error } = useQuery({
        queryKey: [RQ_AUTH_USER_KEY],
        queryFn: (): Promise<UserEntity> => axios.get('/user'),
    })

    /**
     * We're not invalidating queries locally (in this file) and exporting it instead
     * because we're using react-query mutations and it's impossible to "await" the response
     * to invalidate queries, because request itself must be returned for mutations to work.
     */
    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: [RQ_AUTH_USER_KEY] })

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
        await queryClient.resetQueries({ queryKey: [RQ_AUTH_USER_KEY] })

        router.push(ROUTES.AUTH.LOGIN)
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'dashboard' && error) {
            router.push(ROUTES.AUTH.LOGIN)
        }
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
