import { FeaturedItem } from './FeaturedItem'
import featured_01 from '@/public/images/featured/0.webp'
import featured_02 from '@/public/images/featured/1.jpeg'

export const FeaturedSection = () => {
    return (
        <section className="py-10">
            <div className="container">
                <h1>Featured</h1>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FeaturedItem
                        preTitle="New from Jordan Basketball"
                        title="Featuring the Zion 3"
                        imgSrc={featured_01}
                    />

                    <FeaturedItem
                        preTitle="Rep Your School"
                        title="Dunk Madness"
                        imgSrc={featured_02}
                    />
                </div>
            </div>
        </section>
    )
}
