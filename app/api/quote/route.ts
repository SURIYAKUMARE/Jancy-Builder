import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Simulate quote generation
    const quoteId = `JB-${Math.floor(100000 + Math.random() * 900000)}`;
    
    return NextResponse.json({
      success: true,
      quoteId,
      timestamp: new Date().toISOString(),
      message: "Consultation request received successfully. Our senior project engineer will contact you within 24 hours.",
      details: data,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
