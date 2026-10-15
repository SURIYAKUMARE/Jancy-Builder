import { NextResponse } from "next/server";
import { verifyAdminPassword, getAuthCookieHeader } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid office passcode" }, { status: 401 });
    }

    const cookieHeader = getAuthCookieHeader();
    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully to Jancy Builders Office Portal",
    });

    response.cookies.set(cookieHeader.name, cookieHeader.value, cookieHeader.options);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error processing authentication" }, { status: 500 });
  }
}
