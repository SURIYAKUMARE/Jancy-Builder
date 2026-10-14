import fs from "fs";
import path from "path";

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  purpose: string;
  message?: string;
  status: "pending" | "approved" | "rescheduled" | "cancelled" | "completed";
  staffNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  location?: string;
  service?: string;
  message?: string;
  status: "new" | "contacted" | "follow_up" | "consultation_scheduled" | "converted" | "closed";
  staffNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CostEstimate {
  id: string;
  name?: string;
  phone?: string;
  location: string;
  houseType: string;
  areaSqFt: number;
  floors: number;
  packageGrade: "standard" | "premium" | "ultra";
  estimatedTotal: number;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");

// In-memory fallback in case of read-only serverless filesystems
const memoryStore = {
  appointments: [] as Appointment[],
  enquiries: [] as Enquiry[],
  estimates: [] as CostEstimate[],
};

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    // Ignore error if running in strict read-only runtime
  }
}

function readJsonFile<T>(filename: string, fallback: T[]): T[] {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch (err) {
    return fallback;
  }
}

function writeJsonFile<T>(filename: string, data: T[]): boolean {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    return false;
  }
}

// ------------------- APPOINTMENTS -------------------
export async function getAppointments(): Promise<Appointment[]> {
  const fromFile = readJsonFile<Appointment>("appointments.json", memoryStore.appointments);
  return fromFile.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createAppointment(data: Omit<Appointment, "id" | "status" | "createdAt">): Promise<Appointment> {
  const appointments = await getAppointments();
  const id = `JB-APT-${Math.floor(1000 + Math.random() * 9000)}`;
  const newAppointment: Appointment = {
    ...data,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  appointments.unshift(newAppointment);
  memoryStore.appointments = appointments;
  writeJsonFile("appointments.json", appointments);
  return newAppointment;
}

export async function updateAppointment(
  id: string,
  updates: Partial<Pick<Appointment, "status" | "staffNotes" | "date" | "time">>
): Promise<Appointment | null> {
  const appointments = await getAppointments();
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx === -1) return null;

  appointments[idx] = {
    ...appointments[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  memoryStore.appointments = appointments;
  writeJsonFile("appointments.json", appointments);
  return appointments[idx];
}

// ------------------- ENQUIRIES -------------------
export async function getEnquiries(): Promise<Enquiry[]> {
  const fromFile = readJsonFile<Enquiry>("enquiries.json", memoryStore.enquiries);
  return fromFile.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createEnquiry(data: Omit<Enquiry, "id" | "status" | "createdAt">): Promise<Enquiry> {
  const enquiries = await getEnquiries();
  const id = `JB-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const newEnquiry: Enquiry = {
    ...data,
    id,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  enquiries.unshift(newEnquiry);
  memoryStore.enquiries = enquiries;
  writeJsonFile("enquiries.json", enquiries);
  return newEnquiry;
}

export async function updateEnquiry(
  id: string,
  updates: Partial<Pick<Enquiry, "status" | "staffNotes">>
): Promise<Enquiry | null> {
  const enquiries = await getEnquiries();
  const idx = enquiries.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  enquiries[idx] = {
    ...enquiries[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  memoryStore.enquiries = enquiries;
  writeJsonFile("enquiries.json", enquiries);
  return enquiries[idx];
}

// ------------------- COST ESTIMATES -------------------
export async function getCostEstimates(): Promise<CostEstimate[]> {
  const fromFile = readJsonFile<CostEstimate>("estimates.json", memoryStore.estimates);
  return fromFile.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function recordCostEstimate(data: Omit<CostEstimate, "id" | "createdAt">): Promise<CostEstimate> {
  const estimates = await getCostEstimates();
  const id = `JB-EST-${Math.floor(1000 + Math.random() * 9000)}`;
  const newEstimate: CostEstimate = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  estimates.unshift(newEstimate);
  memoryStore.estimates = estimates;
  writeJsonFile("estimates.json", estimates);
  return newEstimate;
}
