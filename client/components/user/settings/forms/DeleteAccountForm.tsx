'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { RQ_AUTH_USER_KEY } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import axios from '@/lib/axios'
import { ROUTES } from '@/lib/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export const DeleteAccountForm = () => {
    const queryClient = useQueryClient()

    const router = useRouter()

    const { user } = useAuth({ middleware: 'dashboard' })

    const { mutateAsync } = useMutation({
        mutationFn: () => axios.delete('/settings/account'),
    })

    const form = useForm()

    const onSubmit = async () => {
        try {
            await mutateAsync()
            await queryClient.resetQueries({
                queryKey: [RQ_AUTH_USER_KEY],
            })

            router.push(ROUTES.AUTH.LOGIN)
        } catch (_) {
            //
        }
    }

    if (!user) {
        return <></>
    }

    return (
        <div className="mt-6 flex flex-col items-start p-4 border rounded-lg bg-destructive/5 border-destructive/10">
            <h5 className="font-semibold">Delete Account</h5>

            <p className="text-sm text-muted-foreground">
                Please be certain. This action is irreversible.
            </p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    data-submitting={form.formState.isSubmitting}
                >
                    <Button
                        type="submit"
                        variant="destructive"
                        className="mt-4 h-8"
                        size="sm"
                    >
                        Delete
                    </Button>
                </form>
            </Form>
        </div>
    )
}
