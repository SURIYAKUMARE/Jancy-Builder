import { NextResponse } from "next/server";
import { getHeroConfig, saveHeroConfig } from "@/lib/config";
import { HeroConfig } from "@/types/hero";

export async function GET() {
  const config = getHeroConfig();
  return NextResponse.json(config);
}

export async function PUT(request: Request) {
  try {
    const body: HeroConfig = await request.json();
    const success = saveHeroConfig(body);
    if (success) {
      return NextResponse.json({ message: "Configuration saved successfully", config: body });
    }
    return NextResponse.json({ error: "Failed to write configuration" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid configuration payload" }, { status: 400 });
  }
}
