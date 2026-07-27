"use client";

import { motion } from "framer-motion";

const TRUSTED_COMPANIES = [
  { name: "Netflix", className: "text-2xl font-bold tracking-tighter" },
  { name: "Adobe", className: "text-2xl font-bold" },
  { name: "Spotify", className: "text-2xl font-bold" },
  { name: "Notion", className: "text-2xl font-bold tracking-tight" },
  { name: "Figma", className: "text-2xl font-bold" },
  { name: "Vercel", className: "text-2xl font-bold tracking-tight" },
  { name: "Stripe", className: "text-2xl font-bold tracking-tight" },
  { name: "Linear", className: "text-2xl font-bold" },
] as const;

export function TrustedBy() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/25">
          Trusted by leading creative teams worldwide
        </p>

        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, i) => (
              <motion.div
                key={`${company.name}-${i}`}
                className="flex items-center justify-center px-14 py-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className={`${company.className} text-white/[0.15] transition-colors duration-300 hover:text-white/30`}>
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
