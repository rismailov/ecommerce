'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { useAuthStore } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
    email: z.string().email('Invalid e-mail address'),
    password: z.string().min(8, 'Password must have at least 8 characters'),
    remember: z.boolean(),
})

export const LoginForm = () => {
    const { login, invalidate } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: ROUTES.DASHBOARD.SETTINGS.PROFILE,
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const { setFocus } = form
    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    const { mutateAsync } = useMutation({
        mutationFn: login<z.infer<typeof schema>>,
        onSuccess: () => {
            invalidate()
        },
        meta: { setError: form.setError },
    })

    const setStatus = useAuthStore((s) => s.setStatus)
    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await mutateAsync(data)

            setStatus(null)
        } catch (_e) {
            //
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <div className="flex items-center justify-between">
                    <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                            <FormItem>
                                <div className="pt-1 flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            id="remember"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>

                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        variant="link"
                        asChild
                        className="text-primary-text no-underline hover:underline"
                    >
                        <Link href={ROUTES.AUTH.FORGOT_PASSWORD}>
                            Forgot password?
                        </Link>
                    </Button>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={form.formState.isSubmitting}
                >
                    Login
                </Button>
            </form>
        </Form>
    )
}
