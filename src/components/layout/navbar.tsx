"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: 0,
        }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500 ease-out",
          scrolled
            ? "py-2"
            : "py-3"
        )}
      >
        {/* Background layer */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            scrolled
              ? "bg-black/60 backdrop-blur-2xl saturate-[180%] border-b border-white/[0.06]"
              : "bg-transparent"
          )}
        />

        {/* Glow effect on scroll */}
        <div
          className={cn(
            "absolute inset-x-0 -bottom-px h-px transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        </div>

        <nav className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="relative z-10 flex-shrink-0"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center lg:flex">
            <div className="relative flex items-center">
              {/* Hover highlight */}
              <motion.div
                className="absolute rounded-xl bg-white/[0.06]"
                initial={false}
                animate={{
                  x: hoveredIndex !== null ? hoveredIndex * 88 : -1000,
                  opacity: hoveredIndex !== null ? 1 : 0,
                  width: 88,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />

              {/* Active page pill */}
              {siteConfig.navItems.map((item, index) =>
                isActive(item.href) ? (
                  <motion.div
                    key={`active-${item.href}`}
                    layoutId="nav-active-pill"
                    className="absolute rounded-xl bg-white/[0.08] border border-white/[0.06]"
                    style={{
                      left: index * 88 + 0,
                      width: 88,
                      height: 36,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                ) : null
              )}

              {siteConfig.navItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={cn(
                      "relative z-10 flex h-9 w-[88px] items-center justify-center rounded-xl text-[13px] font-medium transition-colors duration-200",
                      active
                        ? "text-white"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="relative z-10 text-white/60 hover:text-white"
            >
              <Link href="/generator">Sign In</Link>
            </Button>

            <Button
              size="sm"
              asChild
              className="group relative z-10 overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30"
            >
              <Link href="/generator">
                <Sparkles className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
                Get Started
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="relative z-10 flex items-center justify-center rounded-xl p-2.5 text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="relative h-5 w-5">
              <Menu
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-300",
                  mobileOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-300",
                  mobileOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                )}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm lg:hidden"
            >
              <div className="flex h-full flex-col border-l border-white/[0.06] bg-black/95 backdrop-blur-3xl">
                {/* Mobile header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                  <Logo size="sm" />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl p-2 text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav links */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <div className="space-y-1">
                    {siteConfig.navItems.map((item, index) => {
                      const active = isActive(item.href);
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              "group flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
                              active
                                ? "bg-white/[0.06] text-white"
                                : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                            )}
                          >
                            <span className="flex items-center gap-3">
                              {active && (
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                              )}
                              {item.label}
                            </span>
                            <ArrowUpRight
                              className={cn(
                                "h-4 w-4 transition-all duration-200",
                                active
                                  ? "opacity-100 text-violet-400"
                                  : "opacity-0 group-hover:opacity-50"
                              )}
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="border-t border-white/[0.06] px-6 py-5">
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="w-full"
                    >
                      <Link href="/generator">Sign In</Link>
                    </Button>
                    <Button size="lg" asChild className="w-full group">
                      <Link href="/generator">
                        <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                        Get Started Free
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                  <p className="mt-4 text-center text-[11px] text-white/25">
                    No credit card required
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
