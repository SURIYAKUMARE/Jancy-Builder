import { NextResponse } from "next/server";
import { updateAppointment } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { status, staffNotes, date, time } = body;

    const validStatuses = ["pending", "approved", "rescheduled", "cancelled", "completed"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updated = await updateAppointment(id, {
      ...(status ? { status } : {}),
      ...(staffNotes !== undefined ? { staffNotes } : {}),
      ...(date ? { date } : {}),
      ...(time ? { time } : {}),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}
