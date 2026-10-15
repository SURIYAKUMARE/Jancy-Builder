import { NextResponse } from "next/server";
import { getPackagePricing, savePackagePricing } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const packages = getPackagePricing();
  return NextResponse.json({ success: true, packages });
}

export async function PUT(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const success = savePackagePricing(data);
    if (!success) {
      return NextResponse.json({ error: "Failed to update package pricing" }, { status: 500 });
    }
    return NextResponse.json({ success: true, packages: data });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }
}
