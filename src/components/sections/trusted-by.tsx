"use client";

import { motion } from "framer-motion";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";

const TRUSTED_COMPANIES = [
  { name: "Netflix", className: "text-2xl font-bold tracking-tighter" },
  { name: "Adobe", className: "text-2xl font-bold" },
  { name: "Spotify", className: "text-2xl font-bold" },
  { name: "Notion", className: "text-2xl font-bold tracking-tight" },
  { name: "Figma", className: "text-2xl font-bold" },
  { name: "Vercel", className: "text-2xl font-bold tracking-tight" },
] as const;

export function TrustedBy() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-white/30">
            Trusted by leading creative teams worldwide
          </p>
        </AnimatedWrapper>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, i) => (
              <motion.div
                key={`${company.name}-${i}`}
                className="flex items-center justify-center px-12 py-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className={`${company.className} text-white/20 transition-colors hover:text-white/40`}>
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
