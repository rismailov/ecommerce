import { cn } from '@/lib/utils'
import { SVGProps } from 'react'

export const Logo = (props: SVGProps<SVGSVGElement>) => {
    return (
        <div className="flex items-center space-x-3 hover:opacity-75">
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className={cn(
                    'fill-foreground w-6 h-6 sm:w-5 sm:h-5',
                    props.className,
                )}
            >
                <path d="M128,24A104,104,0,1,0,232,128,104.11791,104.11791,0,0,0,128,24ZM40,128a88.11715,88.11715,0,0,1,80-87.63257V215.63257A88.11715,88.11715,0,0,1,40,128Z" />
            </svg>

            <span className="hidden sm:inline-block uppercase text-[0.91rem] font-semibold leading-none mt-px">
                wave store
            </span>
        </div>
    )
}
