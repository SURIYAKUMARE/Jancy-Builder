import { NextResponse } from "next/server";
import { updateEnquiryStatus } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const id = params.id;
    const body = await request.json();
    const { status, note, followUpDate } = body;

    const validStatuses = [
      "new",
      "contacted",
      "follow_up",
      "consultation_scheduled",
      "converted",
      "closed",
    ];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = updateEnquiryStatus(id, status, note, followUpDate);
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json({ error: "Server error updating enquiry" }, { status: 500 });
  }
}
