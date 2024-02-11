'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { RQ_AUTH_USER_KEY } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import axios from '@/lib/axios'
import { ROUTES } from '@/lib/routes'
import { sleep } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SettingsAccount() {
    const { user } = useAuth({ middleware: 'dashboard' })

    const queryClient = useQueryClient()
    const router = useRouter()

    const { mutateAsync } = useMutation({
        mutationFn: () => axios.delete('/settings/account'),
    })

    // confirmation input value
    const [inputValue, setInputValue] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const deleteAccount = async () => {
        if (inputValue !== 'delete') {
            return
        }

        setIsLoading(true)

        try {
            await mutateAsync()

            await sleep(350)

            await queryClient.resetQueries({
                queryKey: [RQ_AUTH_USER_KEY],
            })

            setIsLoading(false)

            router.push(ROUTES.AUTH.LOGIN)
        } catch (_) {
            //
        }
    }

    if (!user) {
        return <></>
    }

    return (
        <section className="mt-6 flex flex-col items-start">
            <h5 className="font-semibold">Delete Account</h5>

            <p className="text-sm text-muted-foreground">
                Please be certain. This action is irreversible.
            </p>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive" className="mt-4 h-8">
                        Delete
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <p className="font-semibold">Confirm</p>
                    </DialogHeader>

                    <div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-muted-foreground">
                                Type <b className="text-foreground">delete</b>{' '}
                                to confirm account cancellation.
                            </p>

                            <Input
                                value={inputValue}
                                onChange={(e) =>
                                    setInputValue(e.currentTarget.value)
                                }
                            />
                        </div>

                        <Button
                            className="w-full mt-4"
                            size="lg"
                            disabled={inputValue !== 'delete' || isLoading}
                            onClick={deleteAccount}
                            isLoading={isLoading}
                        >
                            Delete Account
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
