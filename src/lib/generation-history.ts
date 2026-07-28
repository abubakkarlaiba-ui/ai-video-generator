import type { VideoSettings } from "./types";

export interface GenerationRecord {
  id: string;
  prompt: string;
  settings: VideoSettings;
  status: "processing" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  createdAt: number;
  completedAt?: number;
  replicateId?: string;
}

const STORAGE_KEY = "synthai-generations";
const MAX_RECORDS = 50;

export function getGenerations(): GenerationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveGeneration(record: GenerationRecord): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getGenerations();
    const filtered = existing.filter((g) => g.id !== record.id);
    const updated = [record, ...filtered].slice(0, MAX_RECORDS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage full or unavailable
  }
}

export function updateGeneration(id: string, updates: Partial<GenerationRecord>): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getGenerations();
    const updated = existing.map((g) =>
      g.id === id ? { ...g, ...updates } : g
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function deleteGeneration(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getGenerations();
    const updated = existing.filter((g) => g.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function clearGenerations(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
