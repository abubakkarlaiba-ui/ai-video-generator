import { NextResponse } from "next/server";
import type { GenerateRequest, GenerateResponse } from "@/lib/types";

export async function POST(request: Request): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.prompt?.trim()) {
      return NextResponse.json(
        { id: "", status: "failed", progress: 0 },
        { status: 400 }
      );
    }

    const id = `vid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const response: GenerateResponse = {
      id,
      status: "completed",
      videoUrl: undefined,
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
