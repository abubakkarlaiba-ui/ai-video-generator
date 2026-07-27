export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface Feature {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface PricingPlan {
  readonly name: string;
  readonly price: number;
  readonly period: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly highlighted: boolean;
  readonly cta: string;
}

export interface Testimonial {
  readonly name: string;
  readonly role: string;
  readonly content: string;
  readonly avatar: string;
  readonly rating: number;
}

export type VideoStyle =
  | "realistic"
  | "cinematic"
  | "anime"
  | "pixar"
  | "fantasy"
  | "cyberpunk"
  | "photorealistic";

export type AspectRatio = "16:9" | "9:16" | "1:1";

export type Resolution = "720p" | "1080p" | "4k";

export type CameraMotion = "static" | "zoom" | "orbit" | "drone" | "dolly";

export type Lighting = "golden-hour" | "studio" | "sunset" | "neon" | "night";

export type Duration = 5 | 10 | 15 | 20 | 30 | 60;

export interface VideoSettings {
  duration: Duration;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  style: VideoStyle;
  cameraMotion: CameraMotion;
  lighting: Lighting;
  creativity: number;
  motionStrength: number;
  negativePrompt: string;
  seed: string;
}

export interface GenerateRequest {
  prompt: string;
  settings: VideoSettings;
}

export interface GenerateResponse {
  id: string;
  status: "processing" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
  progress: number;
  error?: string;
}
