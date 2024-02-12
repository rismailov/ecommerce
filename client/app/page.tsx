import { Footer } from '@/components/Footer'
import { FeaturedSection } from '@/components/homepage/FeaturedSection'
import { HeroSection } from '@/components/homepage/HeroSection'
import { TrendingSection } from '@/components/homepage/TrendingSection'

export default function Home() {
    return (
        <div className="flex flex-col space-y-12">
            <HeroSection />
            <FeaturedSection />
            <TrendingSection />
            <Footer />
        </div>
    )
}
