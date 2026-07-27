"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "What is SynthAI and how does it work?",
    answer:
      "SynthAI is an AI-powered video generation platform that transforms text prompts into high-quality videos. Using our proprietary neural engine, we interpret your text description and generate coherent, cinematic video content in seconds. Our models are trained on millions of professional videos to ensure studio-quality output.",
  },
  {
    question: "How fast is video generation?",
    answer:
      "Most videos are generated in under 60 seconds, depending on the duration and complexity. Our distributed GPU infrastructure ensures minimal wait times. Premium users get access to our priority queue for even faster generation.",
  },
  {
    question: "What video formats and resolutions are supported?",
    answer:
      "We support 720p, 1080p, and 4K resolution outputs. Videos are exported in MP4 (H.264/H.265) format. Pro and Enterprise users have access to 4K resolution and higher frame rates up to 60fps.",
  },
  {
    question: "Can I use generated videos commercially?",
    answer:
      "Yes! All videos generated on paid plans come with a full commercial license. You own the rights to your generated content and can use it for marketing, social media, films, advertisements, and any other commercial purpose.",
  },
  {
    question: "Is there a free tier available?",
    answer:
      "Yes, our Starter plan is completely free and includes 5 video generations per month at 720p resolution. No credit card required to get started. You can upgrade to Pro or Enterprise at any time for higher resolution, more generations, and advanced features.",
  },
  {
    question: "How does the API work for developers?",
    answer:
      "Our RESTful API accepts text prompts and generation parameters via simple HTTP requests. We provide SDKs for Python, JavaScript, and Go. The API returns a job ID that you can poll for completion, or use webhooks for real-time notifications. Full documentation is available at docs.synthai.dev.",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "glass-card overflow-hidden rounded-2xl transition-all duration-300",
        isOpen && "bg-white/[0.04]"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-[15px] font-semibold text-white">
          {item.question}
        </span>
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300",
            isOpen && "rotate-180 border-violet-500/30 bg-violet-500/10"
          )}
        >
          {isOpen ? (
            <Minus className="h-4 w-4 text-violet-400" />
          ) : (
            <Plus className="h-4 w-4 text-white/40" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6">
              <p className="text-sm leading-relaxed text-white/50">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently asked"
          titleGradient="questions"
          description="Everything you need to know about SynthAI. Can't find what you're looking for? Contact our support team."
        />

        <div className="mt-16 space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <AnimatedWrapper key={item.question} delay={index * 0.05}>
              <FAQItem
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
