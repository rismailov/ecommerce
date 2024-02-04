/**
 * Paginated data from Laravel.
 */
type Link = {
    url: Nullable<string>
    label: string
    active: boolean
}

export type TPagination = {
    meta: {
        current_page: number
        from: number
        last_page: number
        links: Link[]
        path: string
        per_page: number
        to: number
        total: number
    }
    links: {
        first: string
        last: string
        prev: string
        next: string
    }
}

export type TPaginatedData<T> = TPagination & { data: T }
