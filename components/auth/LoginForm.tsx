'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

export const LoginForm = () => {
    const schema = z.object({
        email: z.string().email('Invalid e-mail address'),
        password: z.string().min(8, 'Password must have at least 8 characters'),
        remember: z.boolean(),
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

    const onSubmit = () => {}

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
                        className="text-brand no-underline hover:underline"
                    >
                        <Link href="/">Forgot password?</Link>
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
