import { Skeleton } from '@/components/ui/skeleton'

export const FilterSkeleton = () => {
    return (
        <div className="w-full flex flex-col space-y-2">
            <Skeleton className="h-[30px]" />
            <Skeleton className="h-[20px]" />
            <Skeleton className="h-[20px]" />
        </div>
    )
}
