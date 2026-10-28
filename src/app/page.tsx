import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ToolMarquee } from "@/components/home/ToolMarquee";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TopContributors } from "@/components/home/TopContributors";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AIMatchmaker } from "@/components/home/AIMatchmaker";
import { ShareToolNestBanner } from "@/components/common/ShareToolNestBanner";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FAQSection } from "@/components/home/FAQSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ToolMarquee />
        <FeaturedTools />
        <AIMatchmaker />
        <CategoriesSection />
        <StatsSection />
        <WhyChooseUs />
        <TopContributors />
        <TestimonialsSection />
        <ShareToolNestBanner />
        <NewsletterSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}