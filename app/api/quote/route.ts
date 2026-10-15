import { NextResponse } from "next/server";
import { saveEnquiry } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = data.name || "Estimate Requester";
    const phone = (data.phone || "").toString().replace(/[^0-9]/g, "");
    const email = data.email || "";
    const location = data.location || "Tamil Nadu";
    const service = data.projectType || data.service || "Construction Estimate Request";
    const message = data.message || `Package: ${data.package || "General"}, Area: ${data.area || "N/A"} sq.ft, Est: ${data.estimate || "N/A"}`;

    const enquiry = saveEnquiry({
      name,
      phone: phone.length >= 10 ? phone : "7708247124",
      email,
      location,
      service,
      message,
    });

    return NextResponse.json({
      success: true,
      quoteId: enquiry.id,
      timestamp: enquiry.createdAt,
      message: "Consultation request received successfully. Our senior project engineer will contact you within 24 hours.",
      enquiryId: enquiry.id,
      details: data,
    });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
