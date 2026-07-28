import type { VideoSettings } from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validatePrompt(prompt: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = prompt.trim();

  if (!trimmed) {
    errors.push("Please enter a prompt to generate a video.");
  } else if (trimmed.length < 3) {
    errors.push("Prompt must be at least 3 characters long.");
  } else if (trimmed.length > 2000) {
    errors.push("Prompt must be under 2000 characters.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateSettings(settings: VideoSettings): ValidationResult {
  const errors: string[] = [];

  if (![5, 10, 15, 20, 30, 60].includes(settings.duration)) {
    errors.push("Invalid duration selected.");
  }

  if (!["16:9", "9:16", "1:1"].includes(settings.aspectRatio)) {
    errors.push("Invalid aspect ratio selected.");
  }

  if (!["720p", "1080p", "4k"].includes(settings.resolution)) {
    errors.push("Invalid resolution selected.");
  }

  if (settings.creativity < 0 || settings.creativity > 100) {
    errors.push("Creativity must be between 0 and 100.");
  }

  if (settings.motionStrength < 0 || settings.motionStrength > 100) {
    errors.push("Motion strength must be between 0 and 100.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateGenerationRequest(
  prompt: string,
  settings: VideoSettings
): ValidationResult {
  const promptResult = validatePrompt(prompt);
  const settingsResult = validateSettings(settings);

  return {
    valid: promptResult.valid && settingsResult.valid,
    errors: [...promptResult.errors, ...settingsResult.errors],
  };
}
