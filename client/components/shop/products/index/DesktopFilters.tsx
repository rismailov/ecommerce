import { ScrollArea } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'
import { useWindowScroll } from 'react-use'
import { FiltersBase } from './FiltersBase'

const variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 0.4,
        },
    },
    exit: { opacity: 0 },
}

export const DesktopFilters = () => {
    const { y } = useWindowScroll()

    return (
        <motion.aside
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="hidden lg:block sticky overflow-y-auto w-1/5 mr-10 h-screen top-24"
            transition={{ duration: 0 }} // set duration 0 so height change below won't be animated
            style={{
                height: 'calc(100vh - 35px)',
                top: y > 80 ? 20 : 100 - y,
            }}
        >
            <ScrollArea className="w-full h-full pr-8" type="always">
                <FiltersBase />
            </ScrollArea>
        </motion.aside>
    )
}
