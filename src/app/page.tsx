import ChatWidget from "@/components/layout/ChatWidget";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { USPBanner } from "@/components/layout/USPBanner";
import { AwardsSection } from "@/features/home/components/AwardSection";
import { CategoryShowcase } from "@/features/home/components/CategoryShowcase";
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts";
import { HeroSection } from "@/features/home/components/HeroSection";
import NewsletterPopup from "@/features/home/components/NewsletterPopup";
import { RoadToSale } from "@/features/home/components/RoadToSale";
import { TestimonialSection } from "@/features/home/components/TestimonialSection";
import { getHomeData } from "@/features/home/services/homeService";

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div className="min-h-screen bg-white text-[var(--mama-brown)] selection:bg-pink-200">
      <Navbar />

      <main>
        <HeroSection />
        <RoadToSale />
        <CategoryShowcase />
        <FeaturedProducts products={data} />
        <USPBanner />
        <TestimonialSection />
        <AwardsSection />
      </main>

      <Footer />

      <ChatWidget />
      <NewsletterPopup />
    </div>
  );
}
