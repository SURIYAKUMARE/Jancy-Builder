import { NextResponse } from "next/server";
import { getAppointments, saveAppointment } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const appointments = getAppointments();
  return NextResponse.json({ success: true, appointments });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, preferredDate, preferredTime, purpose, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your full name" }, { status: 400 });
    }

    const cleanPhone = (phone || "").toString().replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Please provide a valid 10-digit phone number" }, { status: 400 });
    }

    if (!preferredDate) {
      return NextResponse.json({ error: "Please select a preferred visit date" }, { status: 400 });
    }

    if (!preferredTime) {
      return NextResponse.json({ error: "Please select a preferred time slot" }, { status: 400 });
    }

    const validPurposes = [
      "house_construction",
      "house_planning",
      "cost_estimation",
      "renovation",
      "approval_guidance",
      "other",
    ];

    const cleanPurpose = validPurposes.includes(purpose) ? purpose : "house_construction";

    const appointment = saveAppointment({
      name: name.trim(),
      phone: cleanPhone,
      preferredDate,
      preferredTime,
      purpose: cleanPurpose as any,
      message: message?.trim() || "",
    });

    const purposeLabels: Record<string, string> = {
      house_construction: "New House Construction / புதிய வீடு கட்டுமானம்",
      house_planning: "House Planning & Vastu / வீட்டுத் திட்டம் & வரைபடம்",
      cost_estimation: "Cost Estimation / செலவு மதிப்பீடு",
      renovation: "Renovation / வீடு புதுப்பித்தல்",
      approval_guidance: "Building Approval / கட்டிட அனுமதி",
      other: "General Consultation / இதர ஆலோசனை",
    };

    const purposeText = purposeLabels[cleanPurpose] || cleanPurpose;

    const whatsappMessage = encodeURIComponent(
      `வணக்கம் Er. Sahaya Antony Stalin, நான் ஜான்சி பில்டர்ஸ் அலுவலகத்தில் சந்திக்க முன்பதிவு செய்துள்ளேன்.\n\n` +
      `📌 குறிப்பு எண்: ${appointment.id}\n` +
      `👤 பெயர்: ${appointment.name}\n` +
      `📞 தொலைபேசி: ${appointment.phone}\n` +
      `📅 விரும்பும் தேதி: ${appointment.preferredDate}\n` +
      `⏰ நேரம்: ${appointment.preferredTime}\n` +
      `🎯 நோக்கம்: ${purposeText}\n` +
      `📍 இடம்: Jancy Home, Samugarengapuram`
    );

    const whatsappUrl = `https://wa.me/917708247124?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      appointmentId: appointment.id,
      status: "pending",
      message:
        "Your appointment request has been recorded. Our office team will review and confirm your slot via phone or WhatsApp.",
      messageTa:
        "உங்கள் அலுவலக சந்திப்பு கோரிக்கை பதிவாகியுள்ளது. எங்கள் அலுவலகக் குழு உங்கள் நேரத்தை உறுதிசெய்து தொலைபேசி அல்லது வாட்ஸ்அப் மூலம் தொடர்புகொள்ளும்.",
      whatsappUrl,
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Server error processing appointment" }, { status: 500 });
  }
}
