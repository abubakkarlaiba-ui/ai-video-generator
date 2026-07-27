import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Features } from "@/components/sections/features";
import { AICapabilities } from "@/components/sections/ai-capabilities";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingPreview } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <div className="section-divider" />
      <Features />
      <div className="section-divider" />
      <AICapabilities />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <PricingPreview />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <FAQ />
      <div className="section-divider" />
      <CTA />
    </>
  );
}
