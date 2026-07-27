import type { Feature, PricingPlan, Testimonial } from "./types";

export const FEATURES: readonly Feature[] = [
  {
    icon: "Sparkles",
    title: "AI-Powered Generation",
    description:
      "State-of-the-art diffusion models create stunning videos from text prompts with unparalleled quality.",
  },
  {
    icon: "Zap",
    title: "Lightning Fast",
    description:
      "Generate 4K videos in under 60 seconds with our optimized inference pipeline and GPU clusters.",
  },
  {
    icon: "Palette",
    title: "Multiple Styles",
    description:
      "Choose from cinematic, anime, realistic, 3D render, watercolor, and pixel-art styles.",
  },
  {
    icon: "Shield",
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption. Your prompts and videos remain private.",
  },
  {
    icon: "Layers",
    title: "Seamless Editing",
    description:
      "Fine-tune generated videos with built-in controls for duration, aspect ratio, and style intensity.",
  },
  {
    icon: "Globe",
    title: "API Access",
    description:
      "Integrate video generation into your applications with our RESTful API and SDKs.",
  },
] as const;

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    name: "Starter",
    price: 0,
    period: "forever",
    description: "Perfect for trying out AI video generation.",
    features: [
      "5 videos per month",
      "720p resolution",
      "15s max duration",
      "Watermark included",
      "Community support",
    ],
    highlighted: false,
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: 29,
    period: "month",
    description: "For professionals and content creators.",
    features: [
      "200 videos per month",
      "4K resolution",
      "60s max duration",
      "No watermark",
      "Priority support",
      "API access",
      "Custom styles",
    ],
    highlighted: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Enterprise",
    price: 99,
    period: "month",
    description: "For teams and organizations at scale.",
    features: [
      "Unlimited videos",
      "4K+ resolution",
      "120s max duration",
      "No watermark",
      "Dedicated support",
      "Full API access",
      "Custom models",
      "SLA guarantee",
      "Team collaboration",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
] as const;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Creative Director at Lumina",
    content:
      "SynthAI has completely transformed our production pipeline. What used to take weeks now takes minutes.",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Independent Filmmaker",
    content:
      "The quality of AI-generated videos is mind-blowing. It's like having a full VFX team at your fingertips.",
    avatar: "/avatars/marcus.jpg",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Marketing Lead at NovaTech",
    content:
      "We've cut our video production costs by 80% while increasing output 10x. SynthAI is a game changer.",
    avatar: "/avatars/aisha.jpg",
    rating: 5,
  },
] as const;

export const VIDEO_STYLES = [
  { value: "realistic", label: "Realistic", emoji: "📷" },
  { value: "cinematic", label: "Cinematic", emoji: "🎬" },
  { value: "anime", label: "Anime", emoji: "✨" },
  { value: "pixar", label: "Pixar", emoji: "🧸" },
  { value: "fantasy", label: "Fantasy", emoji: "🐉" },
  { value: "cyberpunk", label: "Cyberpunk", emoji: "🌆" },
  { value: "photorealistic", label: "Photorealistic", emoji: "🖼️" },
] as const;

export const ASPECT_RATIOS = [
  { value: "16:9", label: "Landscape", sublabel: "16:9", icon: "monitor" },
  { value: "9:16", label: "Portrait", sublabel: "9:16", icon: "smartphone" },
  { value: "1:1", label: "Square", sublabel: "1:1", icon: "square" },
] as const;

export const RESOLUTIONS = [
  { value: "720p", label: "720p", sublabel: "HD", icon: "hd" },
  { value: "1080p", label: "1080p", sublabel: "Full HD", icon: "fhd" },
  { value: "4k", label: "4K", sublabel: "Ultra HD", icon: "uhd" },
] as const;

export const DURATIONS = [5, 10, 15, 20, 30, 60] as const;

export const CAMERA_MOTIONS = [
  { value: "static", label: "Static", icon: "camera" },
  { value: "zoom", label: "Zoom", icon: "zoom-in" },
  { value: "orbit", label: "Orbit", icon: "orbit" },
  { value: "drone", label: "Drone", icon: "plane" },
  { value: "dolly", label: "Dolly", icon: "move-horizontal" },
] as const;

export const LIGHTINGS = [
  { value: "golden-hour", label: "Golden Hour", color: "from-amber-500 to-orange-600" },
  { value: "studio", label: "Studio", color: "from-slate-400 to-slate-600" },
  { value: "sunset", label: "Sunset", color: "from-orange-500 to-rose-600" },
  { value: "neon", label: "Neon", color: "from-cyan-400 to-violet-500" },
  { value: "night", label: "Night", color: "from-indigo-800 to-slate-900" },
] as const;
