import ChatWidget from "@/components/layout/ChatWidget";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { USPBanner } from "@/components/layout/USPBanner";
import { AwardsSection } from "@/features/home/components/AwardSection";
import { CategoryShowcase } from "@/features/home/components/CategoryShowcase";
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts";
import { HeroSection } from "@/features/home/components/HeroSection";
import { RoadToSale } from "@/features/home/components/RoadToSale";
import { TestimonialSection } from "@/features/home/components/TestimonialSection";
import { getHomeData } from "@/features/home/services/homeService";

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div className="min-h-screen bg-white font-sans text-stone-800 selection:bg-pink-200">
      <Navbar />
      <USPBanner />

      <main>
        <HeroSection />
        <RoadToSale />
        <CategoryShowcase categories={data.categories} />
        <FeaturedProducts products={data.products} />
        <TestimonialSection />
        <AwardsSection />
      </main>

      <Footer />

      <ChatWidget />
    </div>
  );
}
