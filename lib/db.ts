import fs from "fs";
import path from "path";

export interface CustomerEnquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  service: string;
  message: string;
  status: "new" | "contacted" | "follow_up" | "consultation_scheduled" | "converted" | "closed";
  notes?: { text: string; createdAt: string; author: string }[];
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OfficeAppointment {
  id: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  purpose:
    | "house_construction"
    | "house_planning"
    | "cost_estimation"
    | "renovation"
    | "approval_guidance"
    | "other";
  message?: string;
  status: "pending" | "approved" | "rescheduled" | "rejected" | "completed";
  staffNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OfficeDetails {
  name: string;
  branch: string;
  addressLine1: string;
  addressLine2: string;
  locality: string;
  city: string;
  district: string;
  pincode: string;
  state: string;
  phone: string;
  whatsapp: string;
  workingHours: {
    weekdays: string;
    weekdaysTa: string;
    sunday: string;
    sundayTa: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl: string;
}

export interface PackagePricing {
  standard: {
    name: string;
    nameTa: string;
    ratePerSqFt: number;
    description: string;
    descriptionTa: string;
  };
  premium: {
    name: string;
    nameTa: string;
    ratePerSqFt: number;
    description: string;
    descriptionTa: string;
  };
  ultra: {
    name: string;
    nameTa: string;
    ratePerSqFt: number;
    description: string;
    descriptionTa: string;
  };
}

// File paths with fallback support for serverless read-only filesystems
const DATA_DIR = path.join(process.cwd(), "data");

function getFilePath(filename: string): string {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    return path.join(DATA_DIR, filename);
  } catch {
    const tmpDir = path.join("/tmp", "jancy_data");
    if (!fs.existsSync(tmpDir)) {
      try {
        fs.mkdirSync(tmpDir, { recursive: true });
      } catch {}
    }
    return path.join(tmpDir, filename);
  }
}

function safeReadJSON<T>(filename: string, fallback: T): T {
  try {
    const filePath = getFilePath(filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
  }
  return fallback;
}

function safeWriteJSON<T>(filename: string, data: T): boolean {
  try {
    const filePath = getFilePath(filename);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// Default verified office information (confirmed Jancy Home in Samugarengapuram)
const DEFAULT_OFFICE: OfficeDetails = {
  name: "Jancy Home",
  branch: "Headquarters & Registered Office",
  addressLine1: "Perumal Kovil Street",
  addressLine2: "Samugarengapuram",
  locality: "Samugarengapuram",
  city: "Radhapuram Taluk",
  district: "Tirunelveli",
  pincode: "627112",
  state: "Tamil Nadu",
  phone: "+91 77082 47124",
  whatsapp: "+917708247124",
  workingHours: {
    weekdays: "Monday – Saturday: 9:00 AM – 7:30 PM",
    weekdaysTa: "திங்கள் – சனி: காலை 9:00 – இரவு 7:30",
    sunday: "Sunday: By Prior Appointment",
    sundayTa: "ஞாயிறு: முன் அனுமதி மூலம் மட்டுமே",
  },
  coordinates: {
    latitude: 8.337495,
    longitude: 77.698087,
  },
  googleMapsUrl: "https://maps.google.com/?q=8.337495,77.698087",
};

const DEFAULT_PACKAGES: PackagePricing = {
  standard: {
    name: "Standard Quality Turnkey",
    nameTa: "வழக்கமான தரமான கட்டுமானம்",
    ratePerSqFt: 2400,
    description: "Complete turnkey construction with M20 concrete, Fe550 steel, and Johnson tiles.",
    descriptionTa: "அடிப்படை முதல் முழுமையான வீடு, M20 கான்கிரீட் மற்றும் தரமான பொருட்கள்.",
  },
  premium: {
    name: "Premium Porotherm Eco-Thermal",
    nameTa: "பிரீமியம் போரோதெர்ம் குளுமை வீடு",
    ratePerSqFt: 3200,
    description: "Wienerberger Porotherm clay bricks (5-6°C cooler), M25 concrete, and TATA steel.",
    descriptionTa: "இயற்கை குளுமை தரும் போரோதெர்ம் களிமண் செங்கற்கள் மற்றும் டாட்டா ஸ்டீல்.",
  },
  ultra: {
    name: "Ultra Luxury Architectural Villa",
    nameTa: "அதிநவீன ஆடம்பர வில்லா",
    ratePerSqFt: 4400,
    description: "Architectural custom finishes, Italian marble flooring, and Burma teakwood doors.",
    descriptionTa: "இத்தாலியன் மார்பிள், தேக்கு மர கதவுகள் மற்றும் பிரத்யேக வடிவமைப்பு.",
  },
};

// ENQUIRIES API
export function getEnquiries(): CustomerEnquiry[] {
  return safeReadJSON<CustomerEnquiry[]>("enquiries.json", []);
}

export function saveEnquiry(
  data: Omit<CustomerEnquiry, "id" | "status" | "createdAt" | "updatedAt">
): CustomerEnquiry {
  const enquiries = getEnquiries();
  const now = new Date().toISOString();
  const id = `ENQ-${Date.now().toString().slice(-6)}`;

  const newEnquiry: CustomerEnquiry = {
    ...data,
    id,
    status: "new",
    notes: [],
    createdAt: now,
    updatedAt: now,
  };

  enquiries.unshift(newEnquiry);
  safeWriteJSON("enquiries.json", enquiries);
  return newEnquiry;
}

export function updateEnquiryStatus(
  id: string,
  status: CustomerEnquiry["status"],
  staffNote?: string,
  followUpDate?: string
): CustomerEnquiry | null {
  const enquiries = getEnquiries();
  const idx = enquiries.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  const now = new Date().toISOString();
  enquiries[idx].status = status;
  enquiries[idx].updatedAt = now;

  if (followUpDate !== undefined) {
    enquiries[idx].followUpDate = followUpDate;
  }

  if (staffNote) {
    if (!enquiries[idx].notes) enquiries[idx].notes = [];
    enquiries[idx].notes!.push({
      text: staffNote,
      createdAt: now,
      author: "Office Staff",
    });
  }

  safeWriteJSON("enquiries.json", enquiries);
  return enquiries[idx];
}

// APPOINTMENTS API
export function getAppointments(): OfficeAppointment[] {
  return safeReadJSON<OfficeAppointment[]>("appointments.json", []);
}

export function saveAppointment(
  data: Omit<OfficeAppointment, "id" | "status" | "createdAt" | "updatedAt">
): OfficeAppointment {
  const appointments = getAppointments();
  const now = new Date().toISOString();
  const id = `APT-${Date.now().toString().slice(-6)}`;

  const newAppointment: OfficeAppointment = {
    ...data,
    id,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  appointments.unshift(newAppointment);
  safeWriteJSON("appointments.json", appointments);
  return newAppointment;
}

export function updateAppointmentStatus(
  id: string,
  status: OfficeAppointment["status"],
  staffNotes?: string
): OfficeAppointment | null {
  const appointments = getAppointments();
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx === -1) return null;

  const now = new Date().toISOString();
  appointments[idx].status = status;
  appointments[idx].updatedAt = now;
  if (staffNotes !== undefined) {
    appointments[idx].staffNotes = staffNotes;
  }

  safeWriteJSON("appointments.json", appointments);
  return appointments[idx];
}

// OFFICE DETAILS API
export function getOfficeDetails(): OfficeDetails {
  return safeReadJSON<OfficeDetails>("office.json", DEFAULT_OFFICE);
}

export function saveOfficeDetails(details: OfficeDetails): boolean {
  return safeWriteJSON("office.json", details);
}

// PACKAGES API
export function getPackagePricing(): PackagePricing {
  return safeReadJSON<PackagePricing>("packages.json", DEFAULT_PACKAGES);
}

export function savePackagePricing(packages: PackagePricing): boolean {
  return safeWriteJSON("packages.json", packages);
}
