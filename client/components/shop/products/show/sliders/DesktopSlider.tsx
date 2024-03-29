import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ProductShowEntity } from '@/types/entities/product.entity'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'

export const DesktopSlider = ({ product }: { product: ProductShowEntity }) => {
    const mainSwiperRef = useRef<SwiperCore>()
    const thumbsSwiperRef = useRef<SwiperCore>()

    // Track current slide index to highlight active thumbs and disable custom nav buttons
    const [mainActiveIndex, setMainActiveIndex] = useState(0)

    // Track whether or not thumbs slider has reached the edge to disable custom nav buttons
    const [{ isBeginning, isEnd }, setNavigationState] = useState({
        isBeginning: true,
        isEnd: true,
    })

    const [mainSwiperParams, setMainSwiperParams] = useState<SwiperProps>({
        id: 'desktop',
        modules: [Thumbs],
        thumbs: {
            swiper: thumbsSwiperRef.current,
        },
        onInit: (swiper) => (mainSwiperRef.current = swiper),
        onActiveIndexChange: (swiper) => {
            setMainActiveIndex(swiper.activeIndex)
        },
    })

    // @note this useEffect is needed because the main slider
    // gets initialised BEFORE the thumbs slider.
    // in other words: thumbsSwiperRef.current is still null when mainSwiperParams
    // got initialised
    useEffect(() => {
        if (thumbsSwiperRef.current) {
            setMainSwiperParams((prev) => ({
                ...prev,
                thumbs: {
                    swiper: thumbsSwiperRef.current,
                },
            }))
        }
    }, [thumbsSwiperRef])

    const thumbsSwiperParams: SwiperProps = {
        modules: [Thumbs, Navigation],
        allowTouchMove: false,
        navigation: true,
        watchSlidesProgress: true,
        slidesPerView: 5,
        slidesPerGroup: 5,
        slideToClickedSlide: true,
        spaceBetween: 3,
        onInit: (swiper) => {
            thumbsSwiperRef.current = swiper

            setNavigationState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
            })
        },
        onSlideChange: ({ isBeginning, isEnd }) =>
            setNavigationState({ isBeginning, isEnd }),
        style: { width: '100%' },
    }

    return (
        <section className="hidden w-full lg:sticky lg:top-8 lg:bottom-8 lg:w-[45%] lg:flex flex-col items-stretch space-y-2">
            {/* MAIN SLIDER */}
            <div className="relative w-full">
                <Button
                    size="icon"
                    variant="secondary"
                    className="w-[50px] h-[50px] absolute top-[calc(50%-25px)] left-[-22.5px] z-[5] rounded-full border disabled:shadow-none bg-white dark:border-zinc-300 dark:text-zinc-700 hover:bg-zinc-100"
                    onClick={() => mainSwiperRef.current?.slidePrev()}
                    disabled={mainActiveIndex === 0}
                    aria-label="Previous slide"
                >
                    <IconChevronLeft className="sprite sprite-lg" />
                </Button>

                <Swiper
                    {...mainSwiperParams}
                    className="h-[400px] md:h-[600px] lg:h-[calc(100vh-200px)] rounded-lg"
                >
                    {product.images.map((img, idx) => (
                        <SwiperSlide
                            key={`desktop_slide_${idx}`}
                            className="w-full h-full relative"
                        >
                            <Image
                                src={img.url}
                                alt={product.name}
                                fill
                                className="w-full h-full object-center object-cover select-none"
                                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                                {...(idx === 0 && { priority: true })}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Button
                    size="icon"
                    variant="secondary"
                    className="w-[50px] h-[50px] absolute top-[calc(50%-25px)] right-[-22.5px] z-[5] rounded-full border disabled:shadow-none bg-white dark:border-zinc-300 dark:text-zinc-700 hover:bg-zinc-100"
                    onClick={() => mainSwiperRef.current?.slideNext()}
                    disabled={mainActiveIndex === product.images.length - 1}
                    aria-label="Next slide"
                >
                    <IconChevronRight className="sprite sprite-lg" />
                </Button>
            </div>

            {/* THUMBS SLIDER */}
            <div className="w-full h-[100px] flex flex-nowrap items-stretch space-x-2">
                <Button
                    size="icon"
                    variant="secondary"
                    className="h-[calc(100%-2px)] max-w-[30px] mt-px select-none bg-muted"
                    onClick={() => thumbsSwiperRef.current?.slidePrev()}
                    disabled={isBeginning}
                    aria-label="Previous slides"
                >
                    <IconChevronLeft className="sprite sprite-lg" />
                </Button>

                <Swiper {...thumbsSwiperParams}>
                    {product.images.map((img, idx) => (
                        <SwiperSlide key={img.id}>
                            <button
                                className={cn([
                                    'relative select-none w-full h-full rounded-md overflow-hidden border-2',
                                    mainActiveIndex === idx
                                        ? 'border-primary'
                                        : 'border-transparent',
                                ])}
                            >
                                <Image
                                    src={img.url}
                                    alt={product.name}
                                    fill
                                    className="w-full h-full pointer-events-none object-center object-cover"
                                    sizes="(max-width: 768px) 7vw, (max-width: 1200px) 7vw, 7vw"
                                    {...(idx < 5 && { priority: true })}
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Button
                    size="icon"
                    variant="secondary"
                    className="h-[calc(100%-2px)] max-w-[30px] mt-px select-none bg-muted"
                    onClick={() => thumbsSwiperRef.current?.slideNext()}
                    disabled={isEnd}
                    aria-label="Next slides"
                >
                    <IconChevronRight className="sprite sprite-lg" />
                </Button>
            </div>
        </section>
    )
}
