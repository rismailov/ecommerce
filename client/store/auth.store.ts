// This store is only responsible for displaying "status"-es that come from backend on auth pages
import { create } from 'zustand'

export type TAlertType = 'success' | 'destructive'

interface AuthStore {
    type: TAlertType
    status: string | null
    setStatus: (status: AuthStore['status'], type?: TAlertType) => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
    type: 'success',
    status: null,
    setStatus: (status, type) => set(() => ({ status, ...(type && { type }) })),
}))
