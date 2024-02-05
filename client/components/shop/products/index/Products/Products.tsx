import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import axios from '@/lib/axios'
import { cn, sleep } from '@/lib/utils'
import useFiltersStore from '@/store/filters.store'
import { TPaginatedData } from '@/types'
import { ProductIndexEntity } from '@/types/entities/product.entity'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { ProductCard } from './ProductCard'

export const Products = ({
    setTotalProducts,
    showFilters,
}: {
    setTotalProducts: Dispatch<SetStateAction<number>>
    showFilters: boolean
}) => {
    const { ref, inView } = useInView({ threshold: 1, rootMargin: '0px' })

    const filters = useFiltersStore((state) => ({
        collections: state.collections,
        sizes: state.sizes,
        colors: state.colors,
        price: state.price,
        sort: state.sort,
        limit: state.limit,
    }))

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['products', filters],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            await sleep(250)

            return axios.get<unknown, TPaginatedData<ProductIndexEntity[]>>(
                '/products',
                { params: { ...filters, page: pageParam } },
            )
        },
        getNextPageParam: (lastPage) =>
            lastPage.meta.current_page < lastPage.meta.last_page
                ? lastPage.meta.current_page + 1
                : undefined,
        refetchOnWindowFocus: false,
    })

    // update total records count
    useEffect(() => {
        if (data && data.pages[0].meta.total) {
            setTotalProducts(data.pages[0].meta.total)
        }
    }, [data, setTotalProducts])

    // infinite scroll functionality
    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    if (!isLoading && (isError || !data?.pages[0].meta.total)) {
        return (
            <div className="flex-1 h-[300px] flex items-center justify-center text-lg">
                {isError && (
                    <p className="text-destructive">
                        Something went wrong fetching products...
                    </p>
                )}

                {!data?.pages[0].meta.total && (
                    <p className="text-muted-foreground">No results found.</p>
                )}
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col pb-16">
            <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading &&
                    Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="flex flex-col space-y-3 mb-5">
                            <Skeleton className="w-full h-[350px] rounded-xl" />

                            <Skeleton className="w-full h-[22px]" />
                            <Skeleton className="w-full h-[22px]" />
                            <Skeleton className="w-full h-[22px]" />
                        </div>
                    ))}

                {!isLoading &&
                    data!.pages.map((page) => (
                        <Fragment key={page.meta.current_page}>
                            {page.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    showFilters={showFilters}
                                />
                            ))}
                        </Fragment>
                    ))}
            </div>

            <div ref={ref} className="flex items-center justify-center">
                {isFetchingNextPage ? (
                    <p className="mt-10 text-muted-foreground">Loading...</p>
                ) : (
                    <Button
                        onClick={() => fetchNextPage()}
                        className={cn(
                            'mt-10 self-center',
                            !hasNextPage && 'hidden',
                        )}
                        variant="secondary"
                    >
                        Load More
                    </Button>
                )}
            </div>
        </div>
    )
}
