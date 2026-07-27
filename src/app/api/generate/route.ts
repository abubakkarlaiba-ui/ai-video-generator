import { NextResponse } from "next/server";
import type { GenerateRequest, GenerateResponse } from "@/lib/types";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

const SAMPLE_VIDEOS = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
];

async function createReplicatePrediction(prompt: string) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "6c9b40fbd25e77ef163080dd7f540f79017c32405a18216760a0831f9c7c9aed",
      input: {
        prompt: prompt,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.error || `Replicate API error: ${response.status}`);
  }

  return data;
}

async function pollPrediction(predictionId: string): Promise<{ status: string; output?: string; error?: string }> {
  const maxAttempts = 180; // 6 minutes max
  const interval = 3000; // 3 seconds

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to poll prediction status");
    }

    const data = await response.json();

    if (data.status === "succeeded") {
      const output = Array.isArray(data.output) ? data.output[0] : data.output;
      return { status: "succeeded", output: typeof output === "string" ? output : output?.video || output };
    }

    if (data.status === "failed" || data.status === "canceled") {
      return { status: data.status, error: data.error || "Generation failed" };
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  return { status: "timeout", error: "Generation timed out after 6 minutes" };
}

export async function POST(request: Request): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.prompt?.trim()) {
      return NextResponse.json(
        { id: "", status: "failed", progress: 0, error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Fallback to sample videos if no API key
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

    const prediction = await createReplicatePrediction(body.prompt.trim());

    const result = await pollPrediction(prediction.id);

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
