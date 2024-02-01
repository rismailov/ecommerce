import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import { IconX } from '@tabler/icons-react'
import { MobileMenuItem } from './MobileMenuItem'

export const MobileMenu = ({
    isOpen,
    close,
}: {
    isOpen: boolean
    close: () => void
}) => {
    return (
        <aside
            className="md:hidden z-30 fixed top-0 bottom-0 right-0 w-[300px] h-screen flex flex-col bg-background border-l will-change-transform transition-transform duration-300"
            style={{
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            }}
        >
            {/* header */}
            <div className="p-6 flex items-center justify-end">
                <Button
                    onClick={close}
                    size="icon"
                    variant="ghost"
                    aria-label="Close mobile menu"
                >
                    <IconX className="w-6 h-6" />
                </Button>
            </div>

            {/* body */}
            <div className="flex-1 py-4 px-6 flex flex-col">
                <nav className="flex flex-col">
                    <MobileMenuItem href={ROUTES.SHOP.MEN}>men</MobileMenuItem>
                    <MobileMenuItem href={ROUTES.SHOP.WOMEN}>
                        women
                    </MobileMenuItem>
                    <MobileMenuItem href={ROUTES.SHOP.KIDS}>
                        kids
                    </MobileMenuItem>
                </nav>
            </div>

            {/* footer */}
            <div className="p-6 flex items-center space-x-3">
                {/* <GithubLink className="w-1/2" />

                <UpworkLink className="w-1/2" /> */}
            </div>
        </aside>
    )
}
