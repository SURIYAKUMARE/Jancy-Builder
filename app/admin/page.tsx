"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  User,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  Save,
  RefreshCw,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  Building,
  Tag,
  MapPin,
  Check,
  X,
  FileText,
  DollarSign,
  ChevronDown,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface Enquiry {
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

interface Appointment {
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

interface PackagePricing {
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

interface OfficeDetails {
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

export default function AdminPortalPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active tab: 'enquiries' | 'appointments' | 'packages' | 'office'
  const [activeTab, setActiveTab] = useState<"enquiries" | "appointments" | "packages" | "office">("enquiries");

  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [packages, setPackages] = useState<PackagePricing | null>(null);
  const [office, setOffice] = useState<OfficeDetails | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Filters & search
  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>("all");
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<string>("all");

  // Staff note modal state
  const [selectedEnquiryForNote, setSelectedEnquiryForNote] = useState<Enquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Form edit states for packages & office
  const [isSavingPackages, setIsSavingPackages] = useState(false);
  const [packageSaveSuccess, setPackageSaveSuccess] = useState(false);
  const [isSavingOffice, setIsSavingOffice] = useState(false);
  const [officeSaveSuccess, setOfficeSaveSuccess] = useState(false);

  // Verify session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/session");
      const data = await res.json();
      setIsAuthenticated(data.authenticated === true);
      if (data.authenticated === true) {
        fetchAllData();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid office passcode");
      }
      setIsAuthenticated(true);
      setPasscode("");
      fetchAllData();
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
    }
  };

  const fetchAllData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const [enqRes, aptRes, pkgRes, offRes] = await Promise.all([
        fetch("/api/enquiries"),
        fetch("/api/appointments"),
        fetch("/api/packages"),
        fetch("/api/office"),
      ]);

      if (enqRes.ok) {
        const d = await enqRes.json();
        setEnquiries(d.enquiries || []);
      }
      if (aptRes.ok) {
        const d = await aptRes.json();
        setAppointments(d.appointments || []);
      }
      if (pkgRes.ok) {
        const d = await pkgRes.json();
        setPackages(d.packages || null);
      }
      if (offRes.ok) {
        const d = await offRes.json();
        setOffice(d.office || null);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus as any, updatedAt: new Date().toISOString() } : item
          )
        );
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {
      alert("Failed to delete enquiry");
    }
  };

  // Add Note to Enquiry
  const handleAddNoteToEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiryForNote || !newNoteText.trim()) return;

    setIsSavingNote(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiryForNote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffNotes: newNoteText.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.enquiry) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === selectedEnquiryForNote.id ? data.enquiry : item))
        );
        setSelectedEnquiryForNote(data.enquiry);
        setNewNoteText("");
      }
    } catch {
      alert("Failed to save note");
    } finally {
      setIsSavingNote(false);
    }
  };

  // Update Appointment Status
  const handleUpdateAppointmentStatus = async (
    id: string,
    newStatus: "approved" | "rescheduled" | "rejected" | "completed",
    staffNotes?: string
  ) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, staffNotes }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: newStatus,
                  staffNotes: staffNotes !== undefined ? staffNotes : item.staffNotes,
                  updatedAt: new Date().toISOString(),
                }
              : item
          )
        );
      }
    } catch {
      alert("Failed to update appointment");
    }
  };

  // Save Packages
  const handleSavePackages = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packages) return;
    setIsSavingPackages(true);
    setPackageSaveSuccess(false);

    try {
      const res = await fetch("/api/packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packages),
      });
      if (res.ok) {
        setPackageSaveSuccess(true);
        setTimeout(() => setPackageSaveSuccess(false), 3000);
      } else {
        alert("Failed to update packages");
      }
    } catch {
      alert("Error saving package rates");
    } finally {
      setIsSavingPackages(false);
    }
  };

  // Save Office Details
  const handleSaveOffice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!office) return;
    setIsSavingOffice(true);
    setOfficeSaveSuccess(false);

    try {
      const res = await fetch("/api/office", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(office),
      });
      if (res.ok) {
        setOfficeSaveSuccess(true);
        setTimeout(() => setOfficeSaveSuccess(false), 3000);
      } else {
        alert("Failed to update office details");
      }
    } catch {
      alert("Error saving office details");
    } finally {
      setIsSavingOffice(false);
    }
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      enq.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.phone.includes(enquirySearch) ||
      (enq.location && enq.location.toLowerCase().includes(enquirySearch.toLowerCase())) ||
      enq.service.toLowerCase().includes(enquirySearch.toLowerCase());

    const matchesStatus =
      enquiryStatusFilter === "all" ? true : enq.status === enquiryStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered appointments
  const filteredAppointments = appointments.filter((apt) => {
    if (appointmentStatusFilter === "all") return true;
    return apt.status === appointmentStatusFilter;
  });

  // Loading indicator for initial check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111318] text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-[#B78A52]" />
          <span className="text-sm font-medium tracking-wide">Connecting to Office Admin...</span>
        </div>
      </div>
    );
  }

  // 1. UN-AUTHENTICATED: LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F1115] text-[#FAF8F5] flex flex-col justify-center items-center p-4 selection:bg-[#B78A52]/20">
        <div className="w-full max-w-md bg-[#17191B] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Decorative ambient blur */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#B78A52]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="relative h-12 w-44 mx-auto mb-4">
              <Image
                src="/logo/jancy-logo-darkmode.png"
                alt="Jancy Builders"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B78A52]/10 border border-[#B78A52]/30 text-[11px] font-mono uppercase tracking-wider text-[#B78A52] font-semibold mb-2">
              <Lock className="w-3 h-3" />
              <span>OFFICE STAFF PORTAL</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
              அலுவலக நிர்வாக நுழைவு
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized access for Jancy Builders staff to manage customer enquiries &amp; appointments.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Office Passcode / அனுமதி கடவுச்சொல்
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Enter passcode (e.g. jancy@2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#B78A52] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-[#B78A52] hover:bg-[#a07641] disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>சரிபார்க்கிறது...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>உள்நுழைக (Enter Dashboard)</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#B78A52]" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED: MAIN DASHBOARD
  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const pendingAppointmentsCount = appointments.filter((a) => a.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#0E1015] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#B78A52]/20">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#16181F]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand + Portal Label */}
          <div className="flex items-center gap-4">
            <Link href="/" className="relative h-9 w-36 sm:h-10 sm:w-44 flex-shrink-0">
              <Image
                src="/logo/jancy-logo-darkmode.png"
                alt="Jancy Builders"
                fill
                className="object-contain object-left"
              />
            </Link>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-slate-300">HQ Admin Portal</span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={isLoadingData}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
              title="Open Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#B78A52]" />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 border border-red-500/20 flex items-center gap-1.5 transition-colors"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        
        {/* Welcome & Quick Overview Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#17191F] border border-white/10 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#B78A52] uppercase tracking-wider">
              <span>Jancy Builders • Physical Office Management</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Office Staff Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Er. Sahaya Antony Stalin, B.E. (Civil) — Samugarengapuram, Tirunelveli.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-center min-w-[100px]">
              <span className="text-xs text-slate-400 block font-mono">Enquiries</span>
              <span className="text-xl sm:text-2xl font-black text-white">{enquiries.length}</span>
              {newEnquiriesCount > 0 && (
                <span className="text-[10px] text-amber-400 font-bold block">
                  {newEnquiriesCount} New
                </span>
              )}
            </div>

            <div className="px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-center min-w-[100px]">
              <span className="text-xs text-slate-400 block font-mono">Visits</span>
              <span className="text-xl sm:text-2xl font-black text-white">{appointments.length}</span>
              {pendingAppointmentsCount > 0 && (
                <span className="text-[10px] text-emerald-400 font-bold block">
                  {pendingAppointmentsCount} Pending
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "enquiries"
                ? "bg-[#B78A52] text-slate-950 shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Customer Enquiries ({enquiries.length})</span>
            {newEnquiriesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-mono font-bold">
                {newEnquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "appointments"
                ? "bg-[#B78A52] text-slate-950 shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Office Visits ({appointments.length})</span>
            {pendingAppointmentsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500 text-slate-950 font-mono font-bold">
                {pendingAppointmentsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("packages")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "packages"
                ? "bg-[#B78A52] text-slate-950 shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Package Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab("office")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "office"
                ? "bg-[#B78A52] text-slate-950 shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Office Details &amp; Hours</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: CUSTOMER ENQUIRIES
        ========================================================================= */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#17191F] p-4 rounded-2xl border border-white/10">
              
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by customer name, phone, or location..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B78A52]"
                />
              </div>

              {/* Status Selector Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#B78A52]"
                >
                  <option value="all">All Enquiries</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="follow_up">Follow-Up Required</option>
                  <option value="consultation_scheduled">Consultation Scheduled</option>
                  <option value="converted">Converted Client</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

            </div>

            {/* Enquiries List */}
            {filteredEnquiries.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#17191F] border border-white/10 text-slate-400">
                <p className="text-sm">No enquiries found matching your filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredEnquiries.map((enq) => {
                  const statusColors: Record<string, string> = {
                    new: "bg-red-500/10 text-red-400 border-red-500/30",
                    contacted: "bg-blue-500/10 text-blue-400 border-blue-500/30",
                    follow_up: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                    consultation_scheduled: "bg-purple-500/10 text-purple-400 border-purple-500/30",
                    converted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                    closed: "bg-slate-500/10 text-slate-400 border-slate-500/30",
                  };

                  const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
                  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                    `வணக்கம் ${enq.name}, ஜான்சி பில்டர்ஸ் அலுவலகத்திலிருந்து Er. சகாய அந்தோணி ஸ்டாலின் அவர்கள் சார்பாக தொடர்பு கொள்கிறோம்.`
                  )}`;

                  return (
                    <div
                      key={enq.id}
                      className="p-6 rounded-3xl bg-[#17191F] border border-white/10 hover:border-white/20 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                        
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#B78A52] bg-[#B78A52]/10 px-2.5 py-1 rounded-lg border border-[#B78A52]/20">
                            {enq.id}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {new Date(enq.createdAt).toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* Status dropdown */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${
                              statusColors[enq.status] || "bg-slate-500/10 text-slate-400"
                            }`}
                          >
                            {enq.status.replace("_", " ").toUpperCase()}
                          </span>

                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                            className="bg-black/50 border border-white/10 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#B78A52]"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="follow_up">Follow-Up</option>
                            <option value="consultation_scheduled">Consultation</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>

                      </div>

                      {/* Customer Details Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        
                        <div>
                          <span className="text-slate-400 block mb-0.5">Customer Name:</span>
                          <span className="text-sm font-bold text-white block">{enq.name}</span>
                          {enq.location && (
                            <span className="text-slate-400 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3 text-[#B78A52]" />
                              {enq.location}
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-slate-400 block mb-0.5">Contact Options:</span>
                          <div className="flex items-center gap-3 mt-1">
                            <a
                              href={`tel:+91${cleanPhone}`}
                              className="inline-flex items-center gap-1 text-[#B78A52] hover:underline font-bold"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>{enq.phone}</span>
                            </a>

                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 font-semibold"
                            >
                              <MessageCircle className="w-3 h-3 fill-current" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-400 block mb-0.5">Service Requested:</span>
                          <span className="font-semibold text-slate-200 bg-white/5 px-2.5 py-1 rounded-md inline-block">
                            {enq.service}
                          </span>
                        </div>

                      </div>

                      {/* Customer Message */}
                      {enq.message && (
                        <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                            Customer Message / Requirements:
                          </span>
                          <p className="whitespace-pre-line leading-relaxed">{enq.message}</p>
                        </div>
                      )}

                      {/* Notes / Action Strip */}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => setSelectedEnquiryForNote(enq)}
                          className="text-xs text-[#B78A52] hover:text-[#d3a364] flex items-center gap-1 font-semibold"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Staff Notes ({enq.notes?.length || 0})</span>
                        </button>

                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            TAB 2: OFFICE APPOINTMENTS
        ========================================================================= */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-[#17191F] p-4 rounded-2xl border border-white/10">
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredAppointments.length} office visits
              </span>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={appointmentStatusFilter}
                  onChange={(e) => setAppointmentStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#B78A52]"
                >
                  <option value="all">All Appointments</option>
                  <option value="pending">Pending Approval</option>
                  <option value="approved">Approved</option>
                  <option value="rescheduled">Rescheduled</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Appointments Grid */}
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#17191F] border border-white/10 text-slate-400">
                <p className="text-sm">No appointment requests in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAppointments.map((apt) => {
                  const statusColors: Record<string, string> = {
                    pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                    rescheduled: "bg-blue-500/10 text-blue-400 border-blue-500/30",
                    rejected: "bg-red-500/10 text-red-400 border-red-500/30",
                    completed: "bg-slate-500/10 text-slate-400 border-slate-500/30",
                  };

                  const cleanPhone = apt.phone.replace(/[^0-9]/g, "");
                  const confirmWhatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                    `வணக்கம் ${apt.name}, ஜான்சி பில்டர்ஸ் தலைமை அலுவலகத்தில் ${apt.preferredDate} (${apt.preferredTime}) அன்று Er. சகாய அந்தோணி ஸ்டாலின் அவர்களுடனான உங்கள் சந்திப்பு உறுதி செய்யப்பட்டுள்ளது. அலுவலக முகவரி: Jancy Home, Perumal Kovil Street, Samugarengapuram. நன்றி!`
                  )}`;

                  return (
                    <div
                      key={apt.id}
                      className="p-6 rounded-3xl bg-[#17191F] border border-white/10 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/5">
                          <span className="text-xs font-mono font-bold text-[#B78A52] bg-[#B78A52]/10 px-2 py-0.5 rounded border border-[#B78A52]/20">
                            {apt.id}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${
                              statusColors[apt.status] || "bg-slate-500/10 text-slate-400"
                            }`}
                          >
                            {apt.status.toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white">{apt.name}</h4>
                          <div className="flex items-center gap-3 mt-1 text-xs">
                            <a
                              href={`tel:+91${cleanPhone}`}
                              className="text-[#B78A52] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{apt.phone}</span>
                            </a>
                            <a
                              href={confirmWhatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <MessageCircle className="w-3 h-3 fill-current" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        {/* Meeting Schedule Pill */}
                        <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#B78A52]" />
                            <span className="font-bold text-white">{apt.preferredDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{apt.preferredTime}</span>
                          </div>
                        </div>

                        <div className="text-xs">
                          <span className="text-slate-400 block mb-0.5 font-mono">Purpose:</span>
                          <span className="font-semibold text-slate-200 capitalize">
                            {apt.purpose.replace("_", " ")}
                          </span>
                        </div>

                        {apt.message && (
                          <div className="p-3 rounded-xl bg-white/5 text-xs text-slate-300">
                            <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Notes:</span>
                            <p>{apt.message}</p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                        {apt.status !== "approved" && (
                          <button
                            onClick={() => handleUpdateAppointmentStatus(apt.id, "approved")}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        <a
                          href={confirmWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                          title="Send Confirmation WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Send WhatsApp</span>
                        </a>

                        {apt.status !== "rejected" && apt.status !== "completed" && (
                          <button
                            onClick={() => {
                              const reason = prompt("Enter reason for rejection/cancellation:");
                              if (reason !== null) {
                                handleUpdateAppointmentStatus(apt.id, "rejected", reason);
                              }
                            }}
                            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                            title="Reject Request"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            TAB 3: PACKAGE PRICING EDITOR
        ========================================================================= */}
        {activeTab === "packages" && packages && (
          <form onSubmit={handleSavePackages} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-black text-white">Construction Rates Editor</h3>
                <p className="text-xs text-slate-400">
                  Update per sq.ft rates for Standard, Premium Porotherm, and Ultra Luxury packages. Changes update across the website instantly.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSavingPackages}
                className="py-2.5 px-5 rounded-2xl bg-[#B78A52] hover:bg-[#a07641] disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
              >
                {isSavingPackages ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : packageSaveSuccess ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{packageSaveSuccess ? "Saved Successfully!" : "Save Rates"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Standard Tier */}
              <div className="p-6 rounded-3xl bg-[#17191F] border border-white/10 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  PACKAGE 01
                </span>
                <h4 className="text-lg font-bold text-white">{packages.standard.name}</h4>
                
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Rate (₹ / sq.ft)
                  </label>
                  <input
                    type="number"
                    required
                    value={packages.standard.ratePerSqFt}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        standard: {
                          ...packages.standard,
                          ratePerSqFt: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-base font-bold focus:outline-none focus:border-[#B78A52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tamil Title
                  </label>
                  <input
                    type="text"
                    value={packages.standard.nameTa}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        standard: {
                          ...packages.standard,
                          nameTa: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B78A52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={packages.standard.description}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        standard: {
                          ...packages.standard,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B78A52]"
                  />
                </div>
              </div>

              {/* Premium Porotherm Tier */}
              <div className="p-6 rounded-3xl bg-[#17191F] border-2 border-[#B78A52] space-y-4 relative">
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#B78A52] text-slate-950 font-mono font-bold text-[10px] uppercase">
                  POROTHERM SPECIALTY
                </div>
                <span className="text-xs font-mono font-bold text-[#B78A52] uppercase tracking-wider block">
                  PACKAGE 02
                </span>
                <h4 className="text-lg font-bold text-white">{packages.premium.name}</h4>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Rate (₹ / sq.ft)
                  </label>
                  <input
                    type="number"
                    required
                    value={packages.premium.ratePerSqFt}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        premium: {
                          ...packages.premium,
                          ratePerSqFt: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-base font-bold focus:outline-none focus:border-[#B78A52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tamil Title
                  </label>
                  <input
                    type="text"
                    value={packages.premium.nameTa}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        premium: {
                          ...packages.premium,
                          nameTa: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B78A52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={packages.premium.description}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        premium: {
                          ...packages.premium,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B78A52]"
                  />
                </div>
              </div>

              {/* Ultra Luxury Tier */}
              <div className="p-6 rounded-3xl bg-[#17191F] border border-white/10 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  PACKAGE 03
                </span>
                <h4 className="text-lg font-bold text-white">{packages.ultra.name}</h4>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Rate (₹ / sq.ft)
                  </label>
                  <input
                    type="number"
                    required
                    value={packages.ultra.ratePerSqFt}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        ultra: {
                          ...packages.ultra,
                          ratePerSqFt: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-base font-bold focus:outline-none focus:border-[#B78A52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tamil Title
                  </label>
                  <input
                    type="text"
                    value={packages.ultra.nameTa}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        ultra: {
                          ...packages.ultra,
                          nameTa: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B78A52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={packages.ultra.description}
                    onChange={(e) =>
                      setPackages({
                        ...packages,
                        ultra: {
                          ...packages.ultra,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B78A52]"
                  />
                </div>
              </div>

            </div>
          </form>
        )}

        {/* =========================================================================
            TAB 4: OFFICE DETAILS & WORKING HOURS
        ========================================================================= */}
        {activeTab === "office" && office && (
          <form onSubmit={handleSaveOffice} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-black text-white">Physical Office Details</h3>
                <p className="text-xs text-slate-400">
                  Update verified headquarters address, official contact numbers, and working hours.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSavingOffice}
                className="py-2.5 px-5 rounded-2xl bg-[#B78A52] hover:bg-[#a07641] disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
              >
                {isSavingOffice ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : officeSaveSuccess ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{officeSaveSuccess ? "Saved Successfully!" : "Save Office Info"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Address Card */}
              <div className="p-6 rounded-3xl bg-[#17191F] border border-white/10 space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B78A52]" />
                  <span>Physical Address &amp; Location</span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Office Name</label>
                    <input
                      type="text"
                      value={office.name}
                      onChange={(e) => setOffice({ ...office, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Branch/Role</label>
                    <input
                      type="text"
                      value={office.branch}
                      onChange={(e) => setOffice({ ...office, branch: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={office.addressLine1}
                    onChange={(e) => setOffice({ ...office, addressLine1: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Locality</label>
                    <input
                      type="text"
                      value={office.locality}
                      onChange={(e) => setOffice({ ...office, locality: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">District / Pincode</label>
                    <input
                      type="text"
                      value={`${office.district} – ${office.pincode}`}
                      onChange={(e) => {
                        const parts = e.target.value.split("–");
                        setOffice({
                          ...office,
                          district: (parts[0] || "").trim(),
                          pincode: (parts[1] || "").trim(),
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Google Maps Direction URL</label>
                  <input
                    type="text"
                    value={office.googleMapsUrl}
                    onChange={(e) => setOffice({ ...office, googleMapsUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              {/* Working Hours & Contact Numbers */}
              <div className="p-6 rounded-3xl bg-[#17191F] border border-white/10 space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B78A52]" />
                  <span>Office Hours &amp; Communication</span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Phone Line</label>
                    <input
                      type="text"
                      value={office.phone}
                      onChange={(e) => setOffice({ ...office, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Line</label>
                    <input
                      type="text"
                      value={office.whatsapp}
                      onChange={(e) => setOffice({ ...office, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Mon–Sat Working Hours (English)
                  </label>
                  <input
                    type="text"
                    value={office.workingHours.weekdays}
                    onChange={(e) =>
                      setOffice({
                        ...office,
                        workingHours: { ...office.workingHours, weekdays: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Mon–Sat Working Hours (Tamil)
                  </label>
                  <input
                    type="text"
                    value={office.workingHours.weekdaysTa}
                    onChange={(e) =>
                      setOffice({
                        ...office,
                        workingHours: { ...office.workingHours, weekdaysTa: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Sunday Hours (English)
                    </label>
                    <input
                      type="text"
                      value={office.workingHours.sunday}
                      onChange={(e) =>
                        setOffice({
                          ...office,
                          workingHours: { ...office.workingHours, sunday: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Sunday Hours (Tamil)
                    </label>
                    <input
                      type="text"
                      value={office.workingHours.sundayTa}
                      onChange={(e) =>
                        setOffice({
                          ...office,
                          workingHours: { ...office.workingHours, sundayTa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

              </div>

            </div>
          </form>
        )}

      </main>

      {/* Staff Notes Slide-over Modal */}
      {selectedEnquiryForNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#17191F] border border-white/15 rounded-3xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h4 className="text-base font-bold text-white">
                  Staff Notes for {selectedEnquiryForNote.name}
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedEnquiryForNote.id} • {selectedEnquiryForNote.phone}
                </span>
              </div>
              <button
                onClick={() => setSelectedEnquiryForNote(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Existing Notes History */}
            <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1">
              {(!selectedEnquiryForNote.notes || selectedEnquiryForNote.notes.length === 0) ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">
                  No internal staff notes recorded yet.
                </p>
              ) : (
                selectedEnquiryForNote.notes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
                    <p className="text-slate-200">{note.text}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 font-mono">
                      <span>By {note.author}</span>
                      <span>{new Date(note.createdAt).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add New Note Input */}
            <form onSubmit={handleAddNoteToEnquiry} className="space-y-3 pt-2 border-t border-white/10">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Add Office Follow-Up Note:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Spoke with customer. Discussed 1,800 sq.ft duplex in Valliyur. Sent sample floor plans on WhatsApp..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B78A52]"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiryForNote(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSavingNote}
                  className="px-4 py-2 rounded-xl bg-[#B78A52] hover:bg-[#a07641] disabled:opacity-50 text-slate-950 font-bold text-xs uppercase"
                >
                  {isSavingNote ? "Saving..." : "Add Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
