import { usePathname } from 'next/navigation'
import { ElementType } from 'react'

type TRoute = {
    href: string
    label: string
    isActive: boolean
    Icon?: ElementType
}

/*
 * This simple hook serves as a single source of routes for the entire app.
 * Reason is to avoid duplicating same routes for "mobile" and "desktop" menus.
 */
export const useRoutes = (): TRoute[] => {
    const url = usePathname()

    // user dashboard routes
    // if (component.startsWith('dashboard/')) {
    //     return [
    //     ]
    // }

    return [
        {
            href: '/',
            label: 'Home',
            isActive: url === '/',
        },
        {
            href: '/about',
            label: 'About',
            isActive: url === '/about',
        },
    ]
}
