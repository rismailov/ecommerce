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
import { RQ_AUTH_USER_KEY } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import axios from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { FormSkeleton } from '../FormSkeleton'

const schema = z.object({
    first_name: z
        .string()
        .min(2, 'First name must have at least 2 characters.'),
    last_name: z.string().min(2, 'Last name must have at least 2 characters.'),
    email: z.string().email('Invalid e-mail address'),
})

export const UpdateProfileForm = () => {
    const queryClient = useQueryClient()

    const { user } = useAuth({ middleware: 'dashboard' })

    const form = useForm({
        defaultValues: {
            first_name: user?.first_name ?? '',
            last_name: user?.last_name ?? '',
            email: user?.email ?? '',
        },
    })

    // update form inputs with fresh data after successful request
    const { reset } = form
    useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user, reset])

    const { mutateAsync } = useMutation({
        mutationFn: (data: z.infer<typeof schema>) =>
            axios.patch('/settings/profile', data),
        meta: { setError: form.setError },
    })

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await mutateAsync(data)

            await queryClient.invalidateQueries({
                queryKey: [RQ_AUTH_USER_KEY],
            })

            toast('Profile information updated.')
        } catch (_) {
            //
        }
    }

    if (!user) {
        return <FormSkeleton />
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                data-submitting={form.formState.isSubmitting}
                className="mt-5 space-y-4 sm:max-w-sm md:max-w-md"
            >
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>

                            <FormControl>
                                <Input required placeholder="John" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>

                            <FormControl>
                                <Input required placeholder="Doe" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>

                            <FormControl>
                                <Input
                                    type="email"
                                    required
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
                        isLoading={form.formState.isSubmitting}
                    >
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    )
}
