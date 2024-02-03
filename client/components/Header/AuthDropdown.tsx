'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { ROUTES } from '@/lib/routes'
import { getNameInitialsForAvatar } from '@/lib/utils'
import { IconSettings } from '@tabler/icons-react'
import { LogOutIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export const AuthDropdown = () => {
    const { user, logout } = useAuth({})
    const [isOpen, setIsOpen] = useState(false)

    return (
        <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" aria-label="Open user menu">
                    <UserIcon className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                sideOffset={20}
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="min-w-[17rem]"
            >
                {user ? (
                    <div className="flex items-center space-x-3 pt-4 pb-6 px-4 pr-5">
                        <Avatar>
                            <AvatarFallback>
                                {getNameInitialsForAvatar(
                                    `${user!.first_name} ${user!.last_name}`,
                                )}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{`${
                                user!.first_name
                            } ${user!.last_name}`}</span>

                            <span className="text-sm text-muted-foreground leading-tight">
                                {user!.email}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 px-4 py-3">
                        <Button
                            className="w-1/2"
                            asChild
                            onClick={() => setIsOpen(false)}
                        >
                            <Link href={ROUTES.AUTH.LOGIN}>Sign In</Link>
                        </Button>

                        <Button
                            variant="secondary"
                            className="w-1/2"
                            asChild
                            onClick={() => setIsOpen(false)}
                        >
                            <Link href={ROUTES.AUTH.REGISTER}>Sign Up</Link>
                        </Button>
                    </div>
                )}

                <Separator className="mb-1" />

                <DropdownMenuItem asChild className="hover:bg-[#1d202a]">
                    <Link
                        href={
                            user
                                ? ROUTES.DASHBOARD.SETTINGS.PROFILE
                                : ROUTES.AUTH.LOGIN
                        }
                        className="flex items-center justify-between"
                    >
                        <span>Settings</span>

                        <IconSettings className="w-4 h-4" />
                    </Link>
                </DropdownMenuItem>

                {user && (
                    <>
                        <Separator className="my-1" />

                        <DropdownMenuItem asChild>
                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-between"
                            >
                                <span>Logout</span>

                                <LogOutIcon className="w-4 h-4" />
                            </button>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
