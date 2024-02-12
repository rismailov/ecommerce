import trending_01 from '@/public/images/trending/0.webp'
import trending_02 from '@/public/images/trending/1.webp'
import trending_03 from '@/public/images/trending/2.webp'
import { TrendingItem } from './TrendingItem'

export const TrendingSection = () => {
    return (
        <section className="py-10">
            <div className="container">
                <h1>Trending</h1>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5">
                    <TrendingItem title="Nike Style" src={trending_02} />

                    <TrendingItem
                        title="HBCU Varsity Collection"
                        src={trending_03}
                    />

                    <TrendingItem
                        title="Kicks, Essentials & More"
                        src={trending_01}
                    />
                </div>
            </div>
        </section>
    )
}
