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
import axios from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { FormSkeleton } from '../FormSkeleton'

const schema = z
    .object({
        current_password: z.string(),
        new_password: z
            .string()
            .min(8, 'Password must have at least 8 characters'),
        new_password_confirmation: z.string(),
    })
    // make sure password confirmation matches password
    .refine((data) => data.new_password === data.new_password_confirmation, {
        message: "New password doesn't match confirmation.",
        path: ['new_password_confirmation'],
    })

export const UpdatePasswordForm = () => {
    const { user } = useAuth({ middleware: 'dashboard' })

    const form = useForm({
        defaultValues: {
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        },
    })

    const { mutateAsync } = useMutation({
        mutationFn: (data: z.infer<typeof schema>) =>
            axios.patch('/settings/password', data),
        meta: { setError: form.setError },
    })

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await mutateAsync(data)

            form.reset()

            toast('Password successfully changed.')
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
                    name="current_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>

                            <FormControl>
                                <Input
                                    required
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
                    name="new_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>

                            <FormControl>
                                <Input
                                    required
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
                    name="new_password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm new password</FormLabel>

                            <FormControl>
                                <Input
                                    type="password"
                                    required
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
                        isLoading={form.formState.isSubmitting}
                    >
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    )
}
