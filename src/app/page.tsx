import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Features } from "@/components/sections/features";
import { AICapabilities } from "@/components/sections/ai-capabilities";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingPreview } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { SectionDivider } from "@/components/shared/section-divider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <AICapabilities />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <PricingPreview />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <CTA />
    </>
  );
}
