import { create } from 'zustand'

export type TAlertType = 'success' | 'destructive'

interface AppStore {
    type: TAlertType
    status: string | null
    setStatus: (status: AppStore['status'], type?: TAlertType) => void
}

export const useAppStore = create<AppStore>()((set) => ({
    type: 'success',
    status: null,
    setStatus: (status, type) => set(() => ({ status, ...(type && { type }) })),
}))
