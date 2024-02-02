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

export const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="h-[60px] border-b">
                <div className="container">
                    <div className="h-full flex items-center justify-between">
                        {/* left side */}
                        <div className="w-1/2 sm:w-1/4 flex items-center">
                            <Link href={ROUTES.APP.INDEX}>Logo</Link>
                        </div>

                        {/* center */}
                        <nav className="w-1/2 hidden sm:flex items-center justify-center space-x-5">
                            <NavItem href={ROUTES.SHOP.MEN}>men</NavItem>
                            <NavItem href={ROUTES.SHOP.WOMEN}>women</NavItem>
                            <NavItem href={ROUTES.SHOP.KIDS}>kids</NavItem>
                        </nav>

                        {/* right side */}
                        <div className="w-1/2 sm:w-1/4 flex items-center justify-end space-x-2">
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
