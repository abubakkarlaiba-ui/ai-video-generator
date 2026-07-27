import { NextResponse } from "next/server";
import type { GenerateRequest, GenerateResponse } from "@/lib/types";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// Replicate model for text-to-video (CogVideoX)
const MODEL_VERSION = "wavespeedai/wavespeed-ai-cogvideox-5b-t2v:8235453c30e2dfe848f725b3f98bcd63f8e5d810e53c035a9f11366f45b74016";

// Fallback sample videos if no API key
const SAMPLE_VIDEOS = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
];

async function createReplicatePrediction(prompt: string, settings: Partial<import("@/lib/types").VideoSettings> = {}) {
  const duration = settings.duration || 10;
  const numFrames = duration <= 5 ? 49 : duration <= 10 ? 81 : 121;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "wavespeedai/wavespeed-ai-cogvideox-5b-t2v",
      input: {
        prompt: prompt,
        num_frames: numFrames,
        guidance_scale: 6.0,
        num_inference_steps: 50,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Replicate API error: ${err}`);
  }

  return response.json();
}

async function pollPrediction(predictionUrl: string): Promise<{ status: string; output?: string; error?: string }> {
  const maxAttempts = 120; // 2 minutes max
  const interval = 2000; // 2 seconds

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(predictionUrl, {
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to poll prediction status");
    }

    const data = await response.json();

    if (data.status === "succeeded") {
      // Output can be a URL string or an object with video property
      const output = Array.isArray(data.output) ? data.output[0] : data.output;
      return { status: "succeeded", output: typeof output === "string" ? output : output?.video || output };
    }

    if (data.status === "failed" || data.status === "canceled") {
      return { status: data.status, error: data.error || "Generation failed" };
    }

    // Still processing, wait and retry
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  return { status: "timeout", error: "Generation timed out" };
}

export async function POST(request: Request): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.prompt?.trim()) {
      return NextResponse.json(
        { id: "", status: "failed", progress: 0 },
        { status: 400 }
      );
    }

    // If no Replicate API key, return sample video
    if (!REPLICATE_API_TOKEN) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const id = `vid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const videoUrl = SAMPLE_VIDEOS[Math.floor(Math.random() * SAMPLE_VIDEOS.length)];
      return NextResponse.json({
        id,
        status: "completed",
        videoUrl,
        progress: 100,
      });
    }

    // Create Replicate prediction
    const prediction = await createReplicatePrediction(body.prompt, body.settings || {});

    // Poll for completion
    const result = await pollPrediction(prediction.urls?.get || prediction.url);

    if (result.status === "succeeded" && result.output) {
      return NextResponse.json({
        id: prediction.id,
        status: "completed",
        videoUrl: result.output,
        progress: 100,
      });
    }

    return NextResponse.json({
      id: prediction.id || "",
      status: "failed",
      progress: 0,
      error: result.error || "Generation failed",
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { id: "", status: "failed", progress: 0, error: String(error) },
      { status: 500 }
    );
  }
}
