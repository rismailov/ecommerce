import { PropsWithChildren } from 'react'

export default function ShopLayout({ children }: PropsWithChildren) {
    return <div className="container">{children}</div>
}
