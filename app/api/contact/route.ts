import { NextResponse } from "next/server";
import { createEnquiry, getEnquiries } from "@/lib/db";

export async function GET() {
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, location, service, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").toString().replace(/[\s\-\+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry({
      name: name.trim(),
      phone: cleanPhone,
      location: location ? location.trim() : "",
      service: service ? service.trim() : "General Construction Consultation",
      message: message ? message.trim() : "",
    });

    return NextResponse.json({
      success: true,
      enquiry,
      message: "Enquiry submitted successfully. Er. Stalin will personally contact you.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
