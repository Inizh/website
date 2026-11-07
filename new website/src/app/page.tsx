import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FeaturedGames } from "@/components/sections/FeaturedGames";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <FeaturedProducts />
      <FeaturedGames />
      <ProcessSteps />
      <Testimonials />
      <ClientLogos />
      <LatestPosts />
      <FinalCta />
    </>
  );
}
