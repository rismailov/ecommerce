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
import { useAuthStore } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ForgotPasswordForm = () => {
    const { forgotPassword, invalidate } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: ROUTES.DASHBOARD.SETTINGS.PROFILE,
    })

    const schema = z.object({
        email: z.string().email('Invalid e-mail address'),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        },
    })

    const { setFocus } = form
    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    const { mutateAsync } = useMutation({
        mutationFn: forgotPassword<z.infer<typeof schema>>,
        onSuccess: () => invalidate(),
        meta: { setError: form.setError },
    })

    const setStatus = useAuthStore((s) => s.setStatus)
    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            const response = await mutateAsync(data)

            setStatus(response.data.status)
        } catch (_e) {
            setStatus(null)
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

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full h-11"
                        size="lg"
                        isLoading={form.formState.isSubmitting}
                    >
                        Send E-mail
                    </Button>
                </div>
            </form>
        </Form>
    )
}
