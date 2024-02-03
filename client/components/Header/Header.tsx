'use client'

import { ROUTES } from '@/lib/routes'
import { IconMenu2 } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { AuthDropdown } from './AuthDropdown'
import { MobileMenu } from './MobileMenu'
import { NavItem } from './NavItem'
import { ThemeSwitcher } from './ThemeSwitcher'
import Link from 'next/link'
import { CartTrigger } from './CartTrigger'
import { Logo } from '../common/Logo'

export const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="h-[80px]">
                <div className="container">
                    <div className="h-full flex items-center justify-between">
                        {/* left side */}
                        <div className="flex items-center space-x-10">
                            <Link href={ROUTES.APP.INDEX}>
                                <Logo />
                            </Link>

                            <nav className="hidden sm:flex items-center justify-center space-x-4">
                                <NavItem href={ROUTES.SHOP.INDEX}>All</NavItem>
                                <NavItem href={ROUTES.SHOP.MEN}>Men</NavItem>
                                <NavItem href={ROUTES.SHOP.WOMEN}>
                                    Women
                                </NavItem>
                                <NavItem href={ROUTES.SHOP.KIDS}>Kids</NavItem>
                            </nav>
                        </div>

                        {/* right side */}
                        <div className="flex items-center justify-end space-x-2">
                            <ThemeSwitcher />

                            <Button
                                onClick={() => setMobileMenuOpen(true)}
                                size="icon"
                                variant="ghost"
                                className="sm:hidden"
                                aria-label="Open mobile menu"
                            >
                                <IconMenu2 className="w-[1.4rem] h-[1.4rem] stroke-foreground" />
                            </Button>

                            <AuthDropdown />

                            <CartTrigger />
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
