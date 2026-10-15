import { NextResponse } from "next/server";
import { getOfficeDetails, saveOfficeDetails } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const office = getOfficeDetails();
  return NextResponse.json({ success: true, office });
}

export async function PUT(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const success = saveOfficeDetails(data);
    if (!success) {
      return NextResponse.json({ error: "Failed to save office details" }, { status: 500 });
    }
    return NextResponse.json({ success: true, office: data });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }
}
