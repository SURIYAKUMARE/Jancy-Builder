import { NextResponse } from "next/server";
import { recordCostEstimate } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const estimate = await recordCostEstimate({
      name: data.name || "Website Homeowner",
      phone: data.phone || "",
      location: data.location || "Tirunelveli District",
      houseType: data.houseType || "Independent Residential",
      areaSqFt: Number(data.areaSqFt || data.area || 1200),
      floors: Number(data.floors || 1),
      packageGrade: (data.packageGrade || data.grade || "premium") as "standard" | "premium" | "ultra",
      estimatedTotal: Number(data.estimatedTotal || data.estimatedCost || 3840000),
    });

    return NextResponse.json({
      success: true,
      quoteId: estimate.id,
      estimate,
      timestamp: estimate.createdAt,
      message: "Consultation & estimate request received. Er. Stalin will personally contact you with itemized BOQ.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid submission" }, { status: 400 });
  }
}
