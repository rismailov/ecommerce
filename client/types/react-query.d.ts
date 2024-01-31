import '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'

declare module '@tanstack/react-query' {
    interface Register {
        mutationMeta: {
            setError?: UseFormSetError
        }
    }
}
