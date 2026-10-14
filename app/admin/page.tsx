"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  User,
  MapPin,
  FileText,
  Lock,
  LogOut,
  Building,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
  Inbox,
  Calculator,
  Layers,
  Sparkles,
} from "lucide-react";
import { Appointment, Enquiry, CostEstimate } from "@/lib/db";

export default function OfficeAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isSubmittingAuth, setIsSubmittingAuth] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<"appointments" | "enquiries" | "estimates" | "projects" | "office">("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [estimates, setEstimates] = useState<CostEstimate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedItemNotes, setSelectedItemNotes] = useState<{ [id: string]: string }>({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check localStorage session
  useEffect(() => {
    const savedToken = localStorage.getItem("jb_office_token");
    if (savedToken) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmittingAuth(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("jb_office_token", data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setAuthError(data.error || "Invalid passcode.");
      }
    } catch (err) {
      setAuthError("Failed to connect to office authentication server.");
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jb_office_token");
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [aptRes, enqRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/contact"),
      ]);

      if (aptRes.ok) {
        const aptData = await aptRes.json();
        setAppointments(aptData.appointments || []);
      }

      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAppointmentStatus = async (
    id: string,
    status: "approved" | "rescheduled" | "cancelled" | "completed",
    customNotes?: string
  ) => {
    setUpdatingId(id);
    try {
      const notesToSave = customNotes !== undefined ? customNotes : selectedItemNotes[id];
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, staffNotes: notesToSave }),
      });

      if (res.ok) {
        const data = await res.json();
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? data.appointment : a))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateEnquiryStatus = async (
    id: string,
    status: "contacted" | "follow_up" | "consultation_scheduled" | "converted" | "closed",
    customNotes?: string
  ) => {
    setUpdatingId(id);
    try {
      const notesToSave = customNotes !== undefined ? customNotes : selectedItemNotes[id];
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, staffNotes: notesToSave }),
      });

      if (res.ok) {
        const data = await res.json();
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? data.enquiry : e))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered lists
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.phone.includes(searchTerm) ||
      enq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enq.location || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ------------------- LOGIN SCREEN -------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-[#1E293B] border border-slate-700/80 rounded-3xl p-8 shadow-2xl shadow-black/40">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-[#B78A52]/15 text-[#B78A52] border border-[#B78A52]/30 mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white font-sans">
              Jancy Builders Office Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized staff login for customer enquiries &amp; appointments
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Office Passcode / PIN
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter office passcode..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#B78A52] text-sm font-mono tracking-wider"
                required
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full py-3.5 rounded-xl bg-[#B78A52] hover:bg-[#a37742] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#B78A52]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmittingAuth ? "Verifying..." : "Access Office Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/60 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Main Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ------------------- LOGGED IN DASHBOARD -------------------
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#111827] border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#B78A52] flex items-center justify-center text-slate-950 font-black text-lg">
                JB
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-white block leading-tight">
                  JANCY BUILDERS
                </span>
                <span className="text-[10px] text-[#B78A52] font-mono block">
                  Office Operations Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveTab("appointments");
              setStatusFilter("all");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "appointments"
                ? "bg-[#B78A52] text-slate-950 shadow-md shadow-[#B78A52]/20"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Office Appointments</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              activeTab === "appointments" ? "bg-slate-950/30 text-slate-950" : "bg-slate-800 text-slate-300"
            }`}>
              {appointments.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("enquiries");
              setStatusFilter("all");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "enquiries"
                ? "bg-[#B78A52] text-slate-950 shadow-md shadow-[#B78A52]/20"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Customer Enquiries</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              activeTab === "enquiries" ? "bg-slate-950/30 text-slate-950" : "bg-slate-800 text-slate-300"
            }`}>
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("office");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "office"
                ? "bg-[#B78A52] text-slate-950 shadow-md shadow-[#B78A52]/20"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Office Details &amp; Location</span>
          </button>
        </div>

        {/* ----------------- TAB 1: APPOINTMENTS ----------------- */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or appointment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B78A52]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                {["all", "pending", "approved", "rescheduled", "completed", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      statusFilter === st
                        ? "bg-slate-700 text-white"
                        : "bg-slate-900/60 text-slate-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments List */}
            {filteredAppointments.length === 0 ? (
              <div className="bg-[#111827] rounded-3xl p-12 text-center border border-slate-800">
                <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-300">No Appointments Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {appointments.length === 0
                    ? "When customers book a visit to Jancy Home through the website, their requests appear here immediately."
                    : "No appointments match your current search and status filter."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAppointments.map((apt) => {
                  const statusColors = {
                    pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                    rescheduled: "bg-blue-500/10 text-blue-400 border-blue-500/30",
                    completed: "bg-purple-500/10 text-purple-400 border-purple-500/30",
                    cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
                  };

                  const confirmMsg = encodeURIComponent(
                    `Vanakkam ${apt.name}, your appointment with Jancy Builders (Er. Sahaya Antony Stalin) has been CONFIRMED for ${apt.date} at ${apt.time}.\n\nLocation: Jancy Home, Perumal Kovil Street, Samugarengapuram.\n\nWe look forward to meeting you!`
                  );

                  return (
                    <div
                      key={apt.id}
                      className="bg-[#131B2E] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-[#B78A52] px-2 py-0.5 rounded bg-[#B78A52]/10 border border-[#B78A52]/20">
                            {apt.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                              statusColors[apt.status] || "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <span>{apt.name}</span>
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <Phone className="w-3.5 h-3.5 text-[#B78A52]" />
                            <a
                              href={`tel:${apt.phone}`}
                              className="hover:text-white transition-colors underline"
                            >
                              +91 {apt.phone}
                            </a>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5 text-xs">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-[#B78A52]" />
                            <span className="font-semibold">{apt.date}</span>
                            <span className="text-slate-500">•</span>
                            <Clock className="w-3.5 h-3.5 text-[#B78A52]" />
                            <span>{apt.time}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            <span className="text-slate-500">Purpose: </span>
                            <span className="font-semibold text-slate-200">{apt.purpose}</span>
                          </div>
                          {apt.message && (
                            <div className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800">
                              &ldquo;{apt.message}&rdquo;
                            </div>
                          )}
                        </div>

                        {/* Internal staff notes */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Staff Notes / Follow-up:
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Add internal meeting notes..."
                            defaultValue={apt.staffNotes || ""}
                            onChange={(e) =>
                              setSelectedItemNotes({
                                ...selectedItemNotes,
                                [apt.id]: e.target.value,
                              })
                            }
                            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#B78A52]"
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${apt.phone}`}
                            className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>

                          <a
                            href={`https://wa.me/91${apt.phone}?text=${confirmMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 pt-1">
                          <button
                            onClick={() => handleUpdateAppointmentStatus(apt.id, "approved")}
                            disabled={updatingId === apt.id || apt.status === "approved"}
                            className="py-1.5 px-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-colors disabled:opacity-30"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleUpdateAppointmentStatus(apt.id, "rescheduled")}
                            disabled={updatingId === apt.id || apt.status === "rescheduled"}
                            className="py-1.5 px-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-[11px] font-bold transition-colors disabled:opacity-30"
                          >
                            Reschedule
                          </button>

                          <button
                            onClick={() => handleUpdateAppointmentStatus(apt.id, "completed")}
                            disabled={updatingId === apt.id || apt.status === "completed"}
                            className="py-1.5 px-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 text-[11px] font-bold transition-colors disabled:opacity-30"
                          >
                            Completed
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 2: CUSTOMER ENQUIRIES ----------------- */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search enquiries by name, phone, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B78A52]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                {["all", "new", "contacted", "follow_up", "consultation_scheduled", "converted", "closed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      statusFilter === st
                        ? "bg-slate-700 text-white"
                        : "bg-slate-900/60 text-slate-400 hover:text-white"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquiries List */}
            {filteredEnquiries.length === 0 ? (
              <div className="bg-[#111827] rounded-3xl p-12 text-center border border-slate-800">
                <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-300">No Enquiries Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {enquiries.length === 0
                    ? "When visitors submit the contact form, their enquiries are recorded here in real-time."
                    : "No enquiries match your current search and status filter."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEnquiries.map((enq) => {
                  const statusColors = {
                    new: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                    contacted: "bg-blue-500/10 text-blue-400 border-blue-500/30",
                    follow_up: "bg-purple-500/10 text-purple-400 border-purple-500/30",
                    consultation_scheduled: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                    converted: "bg-green-500/10 text-green-400 border-green-500/30",
                    closed: "bg-slate-700/20 text-slate-400 border-slate-700/40",
                  };

                  const waReply = encodeURIComponent(
                    `Vanakkam ${enq.name}, thank you for contacting Jancy Builders. Er. Sahaya Antony Stalin received your enquiry regarding ${enq.service || "construction"}. How can we assist you with your project?`
                  );

                  return (
                    <div
                      key={enq.id}
                      className="bg-[#131B2E] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-[#B78A52] px-2 py-0.5 rounded bg-[#B78A52]/10 border border-[#B78A52]/20">
                            {enq.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                              statusColors[enq.status] || "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {enq.status.replace("_", " ")}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <span>{enq.name}</span>
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <Phone className="w-3.5 h-3.5 text-[#B78A52]" />
                            <a
                              href={`tel:${enq.phone}`}
                              className="hover:text-white transition-colors underline"
                            >
                              +91 {enq.phone}
                            </a>
                          </div>
                          {enq.location && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-500" />
                              <span>{enq.location}</span>
                            </div>
                          )}
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5 text-xs">
                          <div className="text-[11px] text-[#B78A52] font-semibold">
                            {enq.service}
                          </div>
                          {enq.message && (
                            <div className="text-[11px] text-slate-300 italic">
                              &ldquo;{enq.message}&rdquo;
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 pt-1">
                            Received: {new Date(enq.createdAt).toLocaleDateString()} at {new Date(enq.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>

                        {/* Internal notes */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Follow-up Notes:
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Add customer follow-up notes..."
                            defaultValue={enq.staffNotes || ""}
                            onChange={(e) =>
                              setSelectedItemNotes({
                                ...selectedItemNotes,
                                [enq.id]: e.target.value,
                              })
                            }
                            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#B78A52]"
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${enq.phone}`}
                            className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>

                          <a
                            href={`https://wa.me/91${enq.phone}?text=${waReply}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 pt-1">
                          <button
                            onClick={() => handleUpdateEnquiryStatus(enq.id, "contacted")}
                            disabled={updatingId === enq.id || enq.status === "contacted"}
                            className="py-1.5 px-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-[11px] font-bold transition-colors disabled:opacity-30"
                          >
                            Contacted
                          </button>

                          <button
                            onClick={() => handleUpdateEnquiryStatus(enq.id, "follow_up")}
                            disabled={updatingId === enq.id || enq.status === "follow_up"}
                            className="py-1.5 px-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 text-[11px] font-bold transition-colors disabled:opacity-30"
                          >
                            Follow-up
                          </button>

                          <button
                            onClick={() => handleUpdateEnquiryStatus(enq.id, "converted")}
                            disabled={updatingId === enq.id || enq.status === "converted"}
                            className="py-1.5 px-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-colors disabled:opacity-30"
                          >
                            Converted
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 3: OFFICE DETAILS & LOCATION ----------------- */}
        {activeTab === "office" && (
          <div className="bg-[#131B2E] border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 max-w-4xl">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#B78A52] block mb-1">
                VERIFIED PHYSICAL HEADQUARTERS
              </span>
              <h3 className="text-2xl font-black text-white font-sans tracking-tight">
                Jancy Builders Office Configuration
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Official company records displayed across the public website and appointment invitations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Office Name &amp; Postal Address:
                </span>
                <p className="font-semibold text-white leading-relaxed">
                  Jancy Home<br />
                  Perumal Kovil Street,<br />
                  Samugarengapuram,<br />
                  Tirunelveli – 627112,<br />
                  Tamil Nadu, India.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=8.337495,77.698087"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B78A52] hover:underline font-bold"
                  >
                    <span>Open in Google Maps (8.337495, 77.698087)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Working Hours &amp; Access:
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="font-semibold">Monday – Saturday:</span>
                    <span className="text-emerald-400 font-mono">9:00 AM – 7:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="font-semibold">Sunday:</span>
                    <span className="text-amber-400 font-mono">By Prior Appointment</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-semibold">Engineer Hotline:</span>
                    <span className="text-white font-mono font-bold">+91 77082 47124</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Note: The website strictly informs customers of these verified hours instead of claiming 24/7 availability.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Chief Civil Engineer in Charge</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Er. Sahaya Antony Stalin, B.E. (Civil) • Personal on-site supervision &amp; consultation
                </p>
              </div>
              <a
                href="tel:+917708247124"
                className="px-4 py-2 rounded-xl bg-[#B78A52] hover:bg-[#a37742] text-slate-950 text-xs font-bold transition-colors"
              >
                Call Engineer Line
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
