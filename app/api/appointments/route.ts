import { NextResponse } from "next/server";
import { createAppointment, getAppointments } from "@/lib/db";

export async function GET() {
  try {
    const appointments = await getAppointments();
    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, date, time, purpose, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (at least 2 characters)." },
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

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Please select a preferred visit date." },
        { status: 400 }
      );
    }

    if (!time) {
      return NextResponse.json(
        { success: false, error: "Please select a preferred visit time slot." },
        { status: 400 }
      );
    }

    const validPurposes = [
      "House Construction",
      "House Planning",
      "Cost Estimation",
      "Renovation",
      "Building Approval Guidance",
      "Other Consultation",
    ];

    const finalPurpose = validPurposes.includes(purpose) ? purpose : "House Construction";

    const appointment = await createAppointment({
      name: name.trim(),
      phone: cleanPhone,
      date,
      time,
      purpose: finalPurpose,
      message: message ? message.trim() : "",
    });

    // Formatted WhatsApp message that customer or staff can use
    const whatsappText = encodeURIComponent(
      `Vanakkam Jancy Builders, I have requested an office appointment.\n\nBooking ID: ${appointment.id}\nName: ${appointment.name}\nDate: ${appointment.date}\nTime: ${appointment.time}\nPurpose: ${appointment.purpose}\nLocation: Jancy Home, Samugarengapuram.`
    );
    const whatsappUrl = `https://wa.me/917708247124?text=${whatsappText}`;

    return NextResponse.json({
      success: true,
      appointment,
      whatsappUrl,
      message: "Appointment request received. Our office staff will review and confirm your visit time.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process appointment request" },
      { status: 500 }
    );
  }
}
