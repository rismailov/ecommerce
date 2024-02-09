import { ProductShowEntity } from '@/types/entities/product.entity'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function MobileSlider({ images, name }: ProductShowEntity) {
    return (
        <Swiper
            className="lg:!hidden rounded-lg w-full"
            id="mobile"
            slidesPerView={1}
            scrollbar={{ hide: true }}
        >
            {images.map((img, idx) => (
                <SwiperSlide
                    key={`mobile_slide_${idx}`}
                    className="relative w-full !h-[400px]"
                >
                    <Image
                        src={img.url}
                        alt={name}
                        fill
                        className="object-center object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
