import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

export const FeaturedItem = ({
    preTitle,
    title,
    imgSrc,
}: {
    preTitle: string
    title: string
    imgSrc: StaticImageData
}) => {
    return (
        <div className="flex flex-col relative overflow-hidden rounded-2xl group">
            <div className="relative h-[400px]">
                <Image
                    src={imgSrc}
                    fill
                    className="object-center object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    alt="Featured product image"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent p-5 sm:p-8 flex flex-col justify-end">
                <p className="text-xl text-white/70 pointer-events-none">
                    {preTitle}
                </p>

                <p className="text-xl lg:text-2xl font-semibold text-white pointer-events-none">
                    {title}
                </p>

                <Button
                    size="lg"
                    className="self-start mt-3 rounded-full bg-white hover:bg-white/80 text-black font-semibold"
                    asChild
                >
                    <Link href={ROUTES.SHOP.INDEX}>Shop</Link>
                </Button>
            </div>
        </div>
    )
}
