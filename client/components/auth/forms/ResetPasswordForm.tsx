'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { ROUTES } from '@/lib/routes'
import { useAppStore } from '@/store/app.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthSessionStatus } from '../AuthSessionStatus'

type TFormData = {
    token: string
    email: string
    password: string
    password_confirmation: string
}

export const ResetPasswordForm = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    // initial e-mail and token taken from query string
    const [{ email, token }, setEmailAndToken] = useState<{
        email: null | string
        token: null | string
    }>({
        email: null,
        token: null,
    })

    const schema = z
        .object({
            email: z.string().email('Invalid e-mail address'),
            password: z
                .string()
                .min(8, 'Password must have at least 8 characters'),
            password_confirmation: z.string(),
        })
        // make sure password confirmation matches with password
        .refine((data) => data.password === data.password_confirmation, {
            message: "Password confirmation doesn't match password.",
            path: ['password_confirmation'],
        })

    const form = useForm<TFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            token: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    })

    // update e-mail input with e-mail from query string
    useEffect(() => {
        if (email) {
            form.setValue('email', email)
        }
    }, [email, form])

    const { setFocus } = form
    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    const { mutateAsync } = useMutation({
        mutationFn: resetPassword<TFormData>,
        meta: { setError: form.setError },
    })

    const setStatus = useAppStore((s) => s.setStatus)
    const onSubmit = async (data: TFormData) => {
        // as there's no token input field, set error as a status
        if (!token) {
            setStatus('Token is required.', 'destructive')

            return
        }

        try {
            const resp = await mutateAsync({ ...data, token })

            router.push(`${ROUTES.AUTH.LOGIN}?status=${btoa(resp.data.status)}`)
        } catch (_e) {
            //
        }
    }

    return (
        <>
            <Suspense fallback={<></>}>
                <AuthSessionStatus
                    page="reset-password"
                    setEmailAndToken={setEmailAndToken}
                />
            </Suspense>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>

                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="johndoe@gmail.com"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>

                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="********"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password_confirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password Confirmation</FormLabel>

                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="********"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="pt-2">
                        <Button
                            type="submit"
                            className="w-full h-11"
                            size="lg"
                            isLoading={form.formState.isSubmitting}
                        >
                            Update Password
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
