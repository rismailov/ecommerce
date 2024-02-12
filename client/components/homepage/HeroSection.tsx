import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export const HeroSection = () => {
    return (
        <section className="flex flex-col space-y-10">
            <Image
                src="/images/hero.webp"
                width="0"
                height="0"
                className="w-full h-auto object-contain object-top md:object-cover md:object-center md:h-[350px]"
                alt="Hero image"
                priority
                sizes="100vw"
            />

            <div className="container">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold uppercase">
                        new arrivals
                    </h1>

                    <p className="max-w-xl text-center text-lg text-muted-foreground mt-2 sm:mt-3 mb-3 sm:mb-5">
                        Nothing as fly, nothing as comfortable, nothing as
                        proven. Now featuring the Air Force 1 Pro Tech.
                    </p>

                    <Button size="lg" className="rounded-full" asChild>
                        <Link href={ROUTES.SHOP.INDEX}>Shop Now</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
