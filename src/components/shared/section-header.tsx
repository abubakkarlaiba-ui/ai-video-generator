"use client";

import { Badge } from "@/components/ui/badge";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleGradient?: string;
  description: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  titleGradient,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedWrapper className={className}>
      <div className="mx-auto max-w-3xl text-center">
        {badge && (
          <Badge variant="default" className="mb-8 gap-1.5">
            <Sparkles className="h-3 w-3" />
            {badge}
          </Badge>
        )}
        <h2 className="heading-section text-white">
          {title}{" "}
          {titleGradient && (
            <span className="text-gradient">{titleGradient}</span>
          )}
        </h2>
        <p className="body-large mt-8 text-white/50 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </AnimatedWrapper>
  );
}
