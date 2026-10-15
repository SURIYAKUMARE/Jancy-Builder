import { NextResponse } from "next/server";
import { updateAppointmentStatus } from "@/lib/db";
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
    const { status, staffNotes } = body;

    const validStatuses = ["pending", "approved", "rescheduled", "rejected", "completed"];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid appointment status" }, { status: 400 });
    }

    const updated = updateAppointmentStatus(id, status, staffNotes);
    if (!updated) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ error: "Server error updating appointment" }, { status: 500 });
  }
}
