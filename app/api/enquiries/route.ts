import { NextResponse } from "next/server";
import { getEnquiries, saveEnquiry } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const enquiries = getEnquiries();
  return NextResponse.json({ success: true, enquiries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, location, service, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a valid name" }, { status: 400 });
    }

    const cleanPhone = (phone || "").toString().replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Please provide a valid 10-digit phone number" }, { status: 400 });
    }

    const enquiry = saveEnquiry({
      name: name.trim(),
      phone: cleanPhone,
      email: email?.trim() || "",
      location: location?.trim() || "Tamil Nadu",
      service: service || "House Construction",
      message: message?.trim() || "",
    });

    return NextResponse.json({
      success: true,
      enquiryId: enquiry.id,
      message: "Enquiry submitted successfully. Our engineering office will contact you shortly.",
      enquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json({ error: "Server error processing enquiry" }, { status: 500 });
  }
}
