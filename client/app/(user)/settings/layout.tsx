'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ROUTES } from '@/lib/routes'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

const routes = [
    {
        href: ROUTES.DASHBOARD.SETTINGS.PROFILE,
        title: 'Profile',
        subtitle: 'Update your profile information.',
    },
    {
        href: ROUTES.DASHBOARD.SETTINGS.PASSWORD,
        title: 'Password',
        subtitle: 'Change your password.',
    },
    {
        href: ROUTES.DASHBOARD.SETTINGS.ACCOUNT,
        title: 'Account',
        subtitle: 'Update your account settings.',
    },
]

export default function ProfileLayout({ children }: PropsWithChildren) {
    const url = usePathname()

    return (
        <Card className="shadow-none md:p-2">
            <CardHeader>
                <CardTitle>Settings</CardTitle>

                <CardDescription>
                    Manage your profile settings and set account preferences.
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-10 pt-2">
                <div className="flex flex-col md:flex-row items-start space-y-10 md:space-y-0 md:space-x-10">
                    <nav className="w-full flex flex-col space-y-1 sm:w-auto sm:flex-row sm:space-y-0 md:flex-col md:space-y-1 sm:min-w-[15rem]">
                        {routes.map(({ href, title }) => (
                            <Button
                                key={href}
                                variant="ghost"
                                asChild
                                className={cn([
                                    'justify-start',
                                    url === href
                                        ? 'bg-muted hover:bg-muted'
                                        : 'hover:bg-transparent hover:underline',
                                ])}
                            >
                                <Link href={href}>{title}</Link>
                            </Button>
                        ))}
                    </nav>

                    <div className="w-full flex flex-col">
                        <h4>
                            {routes.find(({ href }) => url === href)?.title ??
                                routes[0].title}
                        </h4>

                        <p className="text-muted-foreground text-sm">
                            {routes.find(({ href }) => url === href)
                                ?.subtitle ?? routes[0].subtitle}
                        </p>

                        {children}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
