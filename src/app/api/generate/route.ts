import { NextResponse } from "next/server";
import type { GenerateRequest, GenerateResponse } from "@/lib/types";

const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
];

export async function POST(request: Request): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.prompt?.trim()) {
      return NextResponse.json(
        { id: "", status: "failed", progress: 0 },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const id = `vid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const videoUrl = SAMPLE_VIDEOS[Math.floor(Math.random() * SAMPLE_VIDEOS.length)];

    const response: GenerateResponse = {
      id,
      status: "completed",
      videoUrl,
      thumbnailUrl: undefined,
      progress: 100,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { id: "", status: "failed", progress: 0 },
      { status: 500 }
    );
  }
}
