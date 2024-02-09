import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const SliderSkeleton = ({ className }: { className: string }) => {
    return (
        <section
            className={cn(
                'w-full lg:sticky lg:top-8 lg:bottom-8 lg:w-[45%] flex flex-col items-stretch space-y-5',
                className,
            )}
        >
            <div className="relative w-full">
                <Skeleton className="h-[400px] md:h-[600px] lg:h-[calc(100vh-200px)] rounded-lg" />
            </div>

            <div className="w-full h-[100px] flex flex-nowrap items-stretch space-x-2">
                <Skeleton className="w-1/5 rounded-md h-full" />
                <Skeleton className="w-1/5 rounded-md h-full" />
                <Skeleton className="w-1/5 rounded-md h-full" />
                <Skeleton className="w-1/5 rounded-md h-full" />
                <Skeleton className="w-1/5 rounded-md h-full" />
            </div>
        </section>
    )
}

export const ShowProductSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-5 lg:gap-[50px] lg:flex-row items-start">
            {/* product images */}
            <SliderSkeleton className="hidden lg:flex" />

            {/* product description */}
            <section className="w-full flex-1 flex flex-col space-y-8 lg:pb-10">
                {/* name & collection */}
                <div className="md:max-w-lg flex flex-col space-y-3">
                    <Skeleton className="h-9" />
                    <Skeleton className="h-6 w-1/2" />
                </div>

                <SliderSkeleton className="flex lg:hidden" />

                <div className="md:max-w-lg flex flex-col space-y-8">
                    {/* price */}
                    <Skeleton className="h-7 w-24" />

                    {/* add product to cart */}
                    <div className="flex flex-col space-y-8">
                        {/* size */}
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-7 w-32" />

                            <div className="grid grid-cols-6 gap-2">
                                <Skeleton className="h-9" />
                                <Skeleton className="h-9" />
                                <Skeleton className="h-9" />
                                <Skeleton className="h-9" />
                                <Skeleton className="h-9" />
                            </div>
                        </div>

                        {/* color */}
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-7 w-32" />

                            <div className="w-full flex items-center space-x-2.5">
                                <Skeleton className="w-full h-28" />
                                <Skeleton className="w-full h-28" />
                                <Skeleton className="w-full h-28" />
                                <Skeleton className="w-full h-28" />
                                <Skeleton className="w-full h-28" />
                            </div>
                        </div>

                        {/* add to cart */}
                        <div className="pt-1">
                            <Skeleton className="h-14 w-3/4 rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <Skeleton className="w-1/2 h-9" />

                        <div className="w-full flex flex-col space-y-1.5">
                            <Skeleton className="w-full h-5" />
                            <Skeleton className="w-full h-5" />
                            <Skeleton className="w-1/2 h-5" />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <Skeleton className="w-1/2 h-9" />

                        <div className="w-full flex flex-col space-y-1.5">
                            <Skeleton className="w-full h-5" />
                            <Skeleton className="w-full h-5" />
                            <Skeleton className="w-1/2 h-5" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
