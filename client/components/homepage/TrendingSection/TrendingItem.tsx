import { ROUTES } from '@/lib/routes'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

export const TrendingItem = ({
    src,
    title,
}: {
    src: StaticImageData
    title: string
}) => {
    return (
        <Link href={ROUTES.SHOP.INDEX} className="flex flex-col space-y-3">
            <div className="relative overflow-hidden rounded-xl h-[400px]">
                <Image
                    src={src}
                    fill
                    className="object-center object-cover hover:scale-105 transition-transform duration-300 ease-out"
                    alt="Trending product image"
                />
            </div>

            <p className="text-xl tracking-tight font-medium">{title}</p>
        </Link>
    )
}
