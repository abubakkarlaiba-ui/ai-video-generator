export const siteConfig = {
  name: "SynthAI",
  title: "SynthAI - AI Video Generator",
  description:
    "Generate stunning videos in seconds with the power of AI. Transform text prompts into cinematic masterpieces using next-generation AI models.",
  url: "https://synthai.dev",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/synthai",
    github: "https://github.com/synthai",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Gallery", href: "/generator" },
    { label: "Dashboard", href: "/generator" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/about" },
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;
