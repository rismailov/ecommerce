'use client'

import { useRoutes } from '@/hooks/use-routes'
import { cn } from '@/lib/utils'
import { IconMenu2 } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { MobileMenu } from './MobileMenu'
import { ThemeSwitcher } from './ThemeSwitcher'

export const Header = () => {
    const routes = useRoutes()

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="fixed h-[70px] top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm border-b">
                <div className="container">
                    <div className="h-full flex items-center justify-between">
                        {/* left side */}
                        <div className="flex items-center">
                            <nav className="hidden sm:flex items-center space-x-5">
                                {routes.map(({ label, isActive, href }) => (
                                    <Button
                                        key={href}
                                        asChild
                                        variant="link"
                                        className={cn(
                                            'text-base hover:no-underline',
                                            isActive
                                                ? 'text-foreground'
                                                : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        <Link href={href}>{label}</Link>
                                    </Button>
                                ))}
                            </nav>
                        </div>

                        {/* right side */}
                        <div className="flex items-center space-x-4">
                            <ThemeSwitcher />

                            <Button
                                onClick={() => setMobileMenuOpen(true)}
                                size="icon"
                                className="sm:hidden"
                                aria-label="Open mobile menu"
                            >
                                <IconMenu2 className="w-6 h-6 stroke-foreground" />
                            </Button>

                            {/* auth */}
                            <div className="flex items-center space-x-3">
                                <Button asChild>
                                    <Link href="/auth/login">Sign In</Link>
                                </Button>
                                <Button variant="secondary">Get Started</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* page layer */}
            <div
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden z-[21] fixed inset-0 w-full h-full bg-foreground/20 dark:bg-background/50 transition-all cursor-pointer"
                style={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    pointerEvents: isMobileMenuOpen ? 'all' : 'none',
                }}
            ></div>

            {/* mobile menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                close={() => setMobileMenuOpen(false)}
            />
        </>
    )
}
