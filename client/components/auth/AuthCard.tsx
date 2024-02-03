'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { Button } from '../ui/button'

export const AuthCard = ({
    children,
    title,
    description,
}: PropsWithChildren<{ title: string; description?: string }>) => {
    const url = usePathname()

    const isLoginPage = url === ROUTES.AUTH.LOGIN
    const isRegisterPage = url === ROUTES.AUTH.REGISTER

    return (
        <Card className="w-full max-w-[450px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>

                {description && (
                    <CardDescription className="text-base">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent>{children}</CardContent>

            {/* show this footer only on login and register pages */}
            {(isLoginPage || isRegisterPage) && (
                <CardFooter className="flex items-center justify-center space-x-1">
                    <span className="text-muted-foreground">
                        {isLoginPage
                            ? "Don't have an account?"
                            : 'Already have an account?'}
                    </span>

                    <Button
                        variant="link"
                        asChild
                        className="text-base text-primary-text font-medium no-underline hover:underline"
                    >
                        <Link
                            href={
                                isLoginPage
                                    ? ROUTES.AUTH.REGISTER
                                    : ROUTES.AUTH.LOGIN
                            }
                        >
                            {isLoginPage ? 'Sign up' : 'Sign in'}
                        </Link>
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
