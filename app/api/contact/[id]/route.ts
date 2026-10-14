import { NextResponse } from "next/server";
import { updateEnquiry } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { status, staffNotes } = body;

    const validStatuses = [
      "new",
      "contacted",
      "follow_up",
      "consultation_scheduled",
      "converted",
      "closed",
    ];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updated = await updateEnquiry(id, {
      ...(status ? { status } : {}),
      ...(staffNotes !== undefined ? { staffNotes } : {}),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}
