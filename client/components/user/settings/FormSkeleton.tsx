import { Skeleton } from '@/components/ui/skeleton'

export const FormSkeleton = () => {
    return (
        <div className="mt-6 flex flex-col space-y-4 max-w-md">
            <div className="flex flex-col space-y-2">
                <Skeleton className="h-[20px] max-w-xs" />
                <Skeleton className="h-[40px]" />
            </div>
            <div className="flex flex-col space-y-2">
                <Skeleton className="h-[20px] max-w-xs" />
                <Skeleton className="h-[40px]" />
            </div>
            <div className="flex flex-col space-y-2">
                <Skeleton className="h-[20px] max-w-xs" />
                <Skeleton className="h-[40px]" />
            </div>

            <div className="flex flex-col space-y-2">
                <Skeleton className="w-[120px] h-[40px]" />
            </div>
        </div>
    )
}
