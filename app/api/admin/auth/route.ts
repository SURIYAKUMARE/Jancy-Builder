import { NextResponse } from "next/server";

const VALID_PASSCODES = ["stalin2016", "jancy7708", "admin2016"];

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();

    if (!passcode || !VALID_PASSCODES.includes(passcode.trim().toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "Invalid office passcode. Please enter authorized staff credentials." },
        { status: 401 }
      );
    }

    const token = `jb_office_${Buffer.from(Date.now().toString()).toString("base64")}`;

    const response = NextResponse.json({
      success: true,
      token,
      staff: "Jancy Builders Office Staff",
    });

    response.cookies.set("jb_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 });
  }
}
