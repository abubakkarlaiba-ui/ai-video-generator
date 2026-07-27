"use client";

import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn("relative py-12", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center gap-6">
          {/* Left line */}
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/5" />

          {/* Center diamond */}
          <div className="relative">
            <div className="h-2 w-2 rotate-45 bg-violet-500/40" />
            <div className="absolute inset-0 h-2 w-2 rotate-45 bg-violet-500/20 blur-sm" />
          </div>

          {/* Right line */}
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/5" />
        </div>
      </div>
    </div>
  );
}
