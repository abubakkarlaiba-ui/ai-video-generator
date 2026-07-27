"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Monitor,
  Smartphone,
  Square,
  Camera,
  ZoomIn,
  Orbit,
  Plane,
  MoveHorizontal,
  Sun,
  Dices,
  Ban,
  Hash,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  VIDEO_STYLES,
  ASPECT_RATIOS,
  RESOLUTIONS,
  DURATIONS,
  CAMERA_MOTIONS,
  LIGHTINGS,
} from "@/lib/constants";
import type {
  VideoSettings,
  Duration,
  AspectRatio,
  Resolution,
  VideoStyle,
  CameraMotion,
  Lighting,
} from "@/lib/types";

interface VideoSettingsPanelProps {
  settings: VideoSettings;
  onChange: (settings: Partial<VideoSettings>) => void;
}

const RATIO_ICONS: Record<string, LucideIcon> = {
  monitor: Monitor,
  smartphone: Smartphone,
  square: Square,
};

const CAMERA_ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  "zoom-in": ZoomIn,
  orbit: Orbit,
  plane: Plane,
  "move-horizontal": MoveHorizontal,
};

function SectionHeader({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-violet-400" />
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
      {value && (
        <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-400">
          {value}
        </span>
      )}
    </div>
  );
}

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
  renderOption,
}: {
  options: readonly { value: T; label: string; [key: string]: unknown }[];
  value: T;
  onChange: (v: T) => void;
  renderOption?: (opt: (typeof options)[number], isSelected: boolean) => React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <motion.button
            key={opt.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative rounded-xl border p-2.5 text-center transition-all duration-200",
              isSelected
                ? "border-violet-500/40 bg-violet-500/10 text-white shadow-lg shadow-violet-500/10"
                : "border-white/5 bg-white/[0.02] text-white/50 hover:border-white/10 hover:bg-white/[0.04] hover:text-white/80"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId={`setting-${opt.value}`}
                className="absolute inset-0 rounded-xl border border-violet-500/30 bg-violet-500/5"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xs font-medium">
              {renderOption ? renderOption(opt, isSelected) : opt.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  showValue = true,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  showValue?: boolean;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/70">{label}</span>
        {showValue && (
          <span className="text-sm font-medium tabular-nums text-white">
            {value}
            {unit}
          </span>
        )}
      </div>
      <div className="relative">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <motion.div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-500 bg-black shadow-lg shadow-violet-500/30"
          initial={false}
          animate={{ left: `${percent}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </div>
  );
}

export function VideoSettingsPanel({
  settings,
  onChange,
}: VideoSettingsPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["style", "aspect", "duration", "resolution"])
  );

  const toggle = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const AccordionSection = ({
    id,
    title,
    icon: Icon,
    children,
  }: {
    id: string;
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
  }) => {
    const isOpen = expandedSections.has(id);
    return (
      <div className="border-b border-white/5 last:border-b-0">
        <button
          onClick={() => toggle(id)}
          className="flex w-full items-center justify-between py-3.5 text-left"
        >
          <div className="flex items-center gap-2.5">
            <Icon className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-white">{title}</span>
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown className="h-4 w-4 text-white/30" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/5 px-5 py-4">
        <div className="rounded-lg bg-violet-500/10 p-1.5">
          <SlidersHorizontal className="h-4 w-4 text-violet-400" />
        </div>
        <span className="text-sm font-semibold text-white">Advanced Settings</span>
      </div>

      <div className="divide-y divide-white/5 px-5">
        {/* ─── Style ─── */}
        <AccordionSection id="style" title="Style" icon={Sparkles}>
          <SectionHeader
            icon={Sparkles}
            label="Visual Style"
            value={VIDEO_STYLES.find((s) => s.value === settings.style)?.label}
          />
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
            {VIDEO_STYLES.map((s) => {
              const isSelected = settings.style === s.value;
              return (
                <motion.button
                  key={s.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onChange({ style: s.value as VideoStyle })}
                  className={cn(
                    "group relative flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all duration-200",
                    isSelected
                      ? "border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  )}
                >
                  <span className="text-lg">{s.emoji}</span>
                  <span
                    className={cn(
                      "text-[10px] font-medium leading-tight",
                      isSelected ? "text-violet-400" : "text-white/50 group-hover:text-white/80"
                    )}
                  >
                    {s.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </AccordionSection>

        {/* ─── Duration ─── */}
        <AccordionSection id="duration" title="Duration" icon={Clock}>
          <SectionHeader
            icon={Clock}
            label="Video Length"
            value={`${settings.duration}s`}
          />
          <div className="grid grid-cols-6 gap-1.5">
            {DURATIONS.map((d) => {
              const isSelected = settings.duration === d;
              return (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onChange({ duration: d as Duration })}
                  className={cn(
                    "relative rounded-xl border py-2.5 text-center text-xs font-medium transition-all duration-200",
                    isSelected
                      ? "border-violet-500/40 bg-violet-500/10 text-violet-400 shadow-lg shadow-violet-500/10"
                      : "border-white/5 bg-white/[0.02] text-white/50 hover:border-white/10 hover:text-white/80"
                  )}
                >
                  {d}s
                </motion.button>
              );
            })}
          </div>
        </AccordionSection>

        {/* ─── Aspect Ratio ─── */}
        <AccordionSection id="aspect" title="Aspect Ratio" icon={Monitor}>
          <div className="grid grid-cols-3 gap-2">
            {ASPECT_RATIOS.map((r) => {
              const Icon = RATIO_ICONS[r.icon] || Monitor;
              const isSelected = settings.aspectRatio === r.value;
              return (
                <motion.button
                  key={r.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onChange({ aspectRatio: r.value as AspectRatio })}
                  className={cn(
                    "group relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200",
                    isSelected
                      ? "border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isSelected ? "text-violet-400" : "text-white/40 group-hover:text-white/70"
                    )}
                  />
                  <div className="text-center">
                    <p
                      className={cn(
                        "text-xs font-semibold",
                        isSelected ? "text-violet-400" : "text-white/70"
                      )}
                    >
                      {r.sublabel}
                    </p>
                    <p className="text-[10px] text-white/30">{r.label}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </AccordionSection>

        {/* ─── Resolution ─── */}
        <AccordionSection id="resolution" title="Resolution" icon={Sparkles}>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTIONS.map((r) => {
              const isSelected = settings.resolution === r.value;
              return (
                <motion.button
                  key={r.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onChange({ resolution: r.value as Resolution })}
                  className={cn(
                    "group relative flex flex-col items-center gap-1.5 rounded-xl border p-4 transition-all duration-200",
                    isSelected
                      ? "border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  )}
                >
                  <p
                    className={cn(
                      "text-lg font-bold",
                      isSelected ? "text-violet-400" : "text-white/60 group-hover:text-white/80"
                    )}
                  >
                    {r.label}
                  </p>
                  <p className="text-[10px] text-white/30">{r.sublabel}</p>
                </motion.button>
              );
            })}
          </div>
        </AccordionSection>

        {/* ─── Camera Motion ─── */}
        <AccordionSection id="camera" title="Camera Motion" icon={Camera}>
          <div className="grid grid-cols-5 gap-1.5">
            {CAMERA_MOTIONS.map((cm) => {
              const Icon = CAMERA_ICONS[cm.icon] || Camera;
              const isSelected = settings.cameraMotion === cm.value;
              return (
                <motion.button
                  key={cm.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onChange({ cameraMotion: cm.value as CameraMotion })}
                  className={cn(
                    "group flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all duration-200",
                    isSelected
                      ? "border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isSelected ? "text-violet-400" : "text-white/40 group-hover:text-white/70"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isSelected ? "text-violet-400" : "text-white/50"
                    )}
                  >
                    {cm.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </AccordionSection>

        {/* ─── Lighting ─── */}
        <AccordionSection id="lighting" title="Lighting" icon={Sun}>
          <div className="grid grid-cols-5 gap-1.5">
            {LIGHTINGS.map((l) => {
              const isSelected = settings.lighting === l.value;
              return (
                <motion.button
                  key={l.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onChange({ lighting: l.value as Lighting })}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-200",
                    isSelected
                      ? "border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  )}
                >
                  <div
                    className={cn(
                      "h-6 w-6 rounded-full bg-gradient-to-br shadow-md",
                      l.color,
                      isSelected ? "ring-2 ring-violet-400 ring-offset-1 ring-offset-black" : ""
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isSelected ? "text-violet-400" : "text-white/50"
                    )}
                  >
                    {l.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </AccordionSection>

        {/* ─── Creativity Slider ─── */}
        <AccordionSection id="creativity" title="Creativity" icon={Dices}>
          <SliderControl
            label="Creativity Level"
            value={settings.creativity}
            onChange={(v) => onChange({ creativity: v })}
            min={0}
            max={100}
            unit="%"
          />
          <p className="mt-2 text-[11px] text-white/30">
            Higher values produce more creative and unexpected results. Lower values stay closer to the prompt.
          </p>
        </AccordionSection>

        {/* ─── Motion Strength ─── */}
        <AccordionSection id="motion" title="Motion Strength" icon={Orbit}>
          <SliderControl
            label="Motion Intensity"
            value={settings.motionStrength}
            onChange={(v) => onChange({ motionStrength: v })}
            min={0}
            max={100}
            unit="%"
          />
          <p className="mt-2 text-[11px] text-white/30">
            Controls how much movement appears in the generated video. 0% is nearly static, 100% is highly dynamic.
          </p>
        </AccordionSection>

        {/* ─── Negative Prompt ─── */}
        <AccordionSection id="negative" title="Negative Prompt" icon={Ban}>
          <div className="space-y-2">
            <Input
              placeholder="blurry, low quality, distorted, watermark..."
              value={settings.negativePrompt}
              onChange={(e) => onChange({ negativePrompt: e.target.value })}
              className="text-sm"
            />
            <p className="text-[11px] text-white/30">
              Describe what you don&apos;t want in the video. Helps avoid common artifacts.
            </p>
          </div>
        </AccordionSection>

        {/* ─── Seed ─── */}
        <AccordionSection id="seed" title="Seed" icon={Hash}>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Random"
                value={settings.seed}
                onChange={(e) => onChange({ seed: e.target.value })}
                className="flex-1 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  onChange({ seed: Math.floor(Math.random() * 999999999).toString() })
                }
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Dices className="h-3.5 w-3.5" />
                Random
              </motion.button>
            </div>
            <p className="text-[11px] text-white/30">
              Use the same seed to reproduce identical results. Leave empty for random generation.
            </p>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}
