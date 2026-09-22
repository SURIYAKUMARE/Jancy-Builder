"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConstructionStage, HeroConfig } from "@/types/hero";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Upload,
  CheckCircle,
  Eye,
  Settings,
  Layers,
  FileText,
  Video,
  ExternalLink,
  Sliders,
  AlertCircle
} from "lucide-react";

export default function AdminHeroPage() {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [activeTab, setActiveTab] = useState<"stages" | "settings" | "content" | "preview">("stages");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [uploadingStageId, setUploadingStageId] = useState<number | null>(null);
  const [previewStageIdx, setPreviewStageIdx] = useState(0);

  // Fetch current config
  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("Failed to fetch admin config:", err));
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen bg-[#060a12] flex items-center justify-center text-slate-300">
        <div className="flex items-center space-x-3 font-mono text-sm">
          <div className="h-4 w-4 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
          <span>Loading Jancy Builders Hero CMS...</span>
        </div>
      </div>
    );
  }

  // Handle Save
  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaveMessage("Hero Configuration published successfully!");
        setTimeout(() => setSaveMessage(null), 4000);
      } else {
        setSaveMessage("Failed to save changes.");
      }
    } catch (err) {
      setSaveMessage("Network error saving configuration.");
    } finally {
      setIsSaving(false);
    }
  };

  // Reorder stages
  const moveStage = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= config.stages.length) return;

    const newStages = [...config.stages];
    const temp = newStages[index];
    newStages[index] = newStages[targetIdx];
    newStages[targetIdx] = temp;

    // update order numbers
    newStages.forEach((stg, i) => {
      stg.order = i + 1;
      stg.stageNumber = String(i + 1).padStart(2, "0");
    });

    setConfig({ ...config, stages: newStages });
  };

  // Update a single stage field
  const updateStage = (index: number, field: keyof ConstructionStage, value: any) => {
    const newStages = [...config.stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setConfig({ ...config, stages: newStages });
  };

  // Delete a stage
  const deleteStage = (id: number) => {
    if (!confirm("Are you sure you want to delete this construction stage?")) return;
    const newStages = config.stages.filter((s) => s.id !== id);
    newStages.forEach((stg, i) => {
      stg.order = i + 1;
      stg.stageNumber = String(i + 1).padStart(2, "0");
    });
    setConfig({ ...config, stages: newStages });
  };

  // Add new stage
  const addNewStage = () => {
    const newId = Date.now();
    const newOrder = config.stages.length + 1;
    const newStage: ConstructionStage = {
      id: newId,
      stageNumber: String(newOrder).padStart(2, "0"),
      name: "New Construction Stage",
      title: "Title for New Stage",
      description: "Detailed description of this construction phase.",
      desktopMediaUrl: "/images/stages/stage-01.jpg",
      mobileMediaUrl: "/images/stages/stage-01.jpg",
      mediaType: "image",
      duration: 5,
      order: newOrder,
      active: true,
      milestone: "NEW",
    };
    setConfig({ ...config, stages: [...config.stages, newStage] });
  };

  // Upload file for a stage or global video
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    stageIndex?: number,
    targetField?: "desktopMediaUrl" | "mobileMediaUrl" | "desktopVideoUrl" | "mobileVideoUrl"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    if (stageIndex !== undefined) {
      formData.append("stageId", String(config.stages[stageIndex].id));
      setUploadingStageId(config.stages[stageIndex].id);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (stageIndex !== undefined && targetField) {
          updateStage(stageIndex, targetField as any, data.url);
        } else if (targetField === "desktopVideoUrl" || targetField === "mobileVideoUrl") {
          setConfig({
            ...config,
            settings: { ...config.settings, [targetField]: data.url },
          });
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("File upload failed.");
    } finally {
      setUploadingStageId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#04070E] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#060a12]/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center space-x-1 text-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Live Site</span>
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  ADMIN → HERO / CONSTRUCTION EXPERIENCE
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] font-mono font-bold">
                  CMS v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage 12-stage construction timelapse, media assets, durations & hero copy
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {saveMessage && (
              <div className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <CheckCircle className="h-4 w-4" />
                <span>{saveMessage}</span>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-yellow-500/25 active:scale-95 transition-all disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? "Publishing..." : "Save All Changes"}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center space-x-2 border-t border-slate-800/80 pt-3">
          {[
            { id: "stages", label: "Construction Stages (12)", icon: Layers },
            { id: "settings", label: "Experience & Video Settings", icon: Sliders },
            { id: "content", label: "Hero Copy & CTAs", icon: FileText },
            { id: "preview", label: "Live Split Preview", icon: Eye },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-yellow-500 text-slate-950 font-bold shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {/* TAB 1: STAGES CMS */}
        {activeTab === "stages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Construction Stages Sequence</h2>
                <p className="text-xs text-slate-400">
                  Manage each individual construction milestone, media, descriptions, and duration.
                </p>
              </div>
              <button
                onClick={addNewStage}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-yellow-500/30 font-bold text-xs flex items-center space-x-1.5 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Add Construction Stage</span>
              </button>
            </div>

            {/* Stages List */}
            <div className="space-y-4">
              {config.stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`glass-panel rounded-2xl p-5 border transition-all ${
                    stage.active ? "border-slate-800" : "border-red-500/30 opacity-60"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Reorder & Thumbnail */}
                    <div className="lg:col-span-3 flex items-start space-x-3">
                      {/* Up/Down buttons */}
                      <div className="flex flex-col space-y-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveStage(idx, "up")}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-20 text-slate-400"
                          title="Move Up"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          disabled={idx === config.stages.length - 1}
                          onClick={() => moveStage(idx, "down")}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-20 text-slate-400"
                          title="Move Down"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Image Preview & Upload */}
                      <div className="relative h-28 w-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 flex-shrink-0 group">
                        <Image
                          src={stage.desktopMediaUrl}
                          alt={stage.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-1.5 left-1.5 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-yellow-400 font-bold">
                          STAGE {stage.stageNumber}
                        </div>

                        {/* Hover upload button */}
                        <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity text-xs font-medium space-y-1">
                          <Upload className="h-4 w-4 text-yellow-400" />
                          <span>Change Image</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, idx, "desktopMediaUrl")}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Stage Details Inputs */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                            Stage Name
                          </label>
                          <input
                            type="text"
                            value={stage.name}
                            onChange={(e) => updateStage(idx, "name", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:border-yellow-400 focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                            Stage Headline / Title
                          </label>
                          <input
                            type="text"
                            value={stage.title}
                            onChange={(e) => updateStage(idx, "title", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-yellow-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={stage.description}
                          onChange={(e) => updateStage(idx, "description", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      {/* Media URL inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-500 uppercase mb-0.5">
                            Desktop Media URL
                          </label>
                          <input
                            type="text"
                            value={stage.desktopMediaUrl}
                            onChange={(e) => updateStage(idx, "desktopMediaUrl", e.target.value)}
                            className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-500 uppercase mb-0.5">
                            Mobile Media URL
                          </label>
                          <input
                            type="text"
                            value={stage.mobileMediaUrl}
                            onChange={(e) => updateStage(idx, "mobileMediaUrl", e.target.value)}
                            className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Duration & Actions */}
                    <div className="lg:col-span-2 flex flex-col justify-between h-full space-y-4 pt-1">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                          Duration ({stage.duration}s)
                        </label>
                        <input
                          type="range"
                          min="2"
                          max="15"
                          value={stage.duration}
                          onChange={(e) => updateStage(idx, "duration", Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center space-x-2 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={stage.active}
                            onChange={(e) => updateStage(idx, "active", e.target.checked)}
                            className="rounded bg-slate-900 border-slate-700 text-yellow-500 focus:ring-0"
                          />
                          <span className={stage.active ? "text-emerald-400 font-semibold" : "text-slate-500"}>
                            {stage.active ? "Active" : "Inactive"}
                          </span>
                        </label>

                        <button
                          onClick={() => deleteStage(stage.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete Stage"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SETTINGS & VIDEO */}
        {activeTab === "settings" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Experience & Video Playback Controls</h2>
              <p className="text-xs text-slate-400">
                Configure global animation behavior, fallback modes, and high-definition video paths.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
              {/* Autoplay & Scroll toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Autoplay Timelapse</h3>
                    <p className="text-xs text-slate-400">Automatically progress through stages</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.settings.autoplay}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        settings: { ...config.settings, autoplay: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded bg-slate-800 text-yellow-500"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Scroll-Based Animation</h3>
                    <p className="text-xs text-slate-400">Scrub construction as user scrolls</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.settings.scrollAnimation}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        settings: { ...config.settings, scrollAnimation: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded bg-slate-800 text-yellow-500"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Pause on Hover</h3>
                    <p className="text-xs text-slate-400">Pause animation when mouse hovers hero</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.settings.pauseOnHover}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        settings: { ...config.settings, pauseOnHover: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded bg-slate-800 text-yellow-500"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Fallback Engine Priority</h3>
                    <p className="text-xs text-slate-400">Primary visual engine rendering mode</p>
                  </div>
                  <select
                    value={config.settings.fallbackMode}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        settings: { ...config.settings, fallbackMode: e.target.value as any },
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-yellow-400 font-semibold focus:outline-none"
                  >
                    <option value="auto">Auto Responsive</option>
                    <option value="video">Cinematic Video First</option>
                    <option value="image">Photo Sequence First</option>
                    <option value="blueprint">Blueprint Grid Only</option>
                  </select>
                </div>
              </div>

              {/* Video URL & Uploads */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Video className="h-4 w-4 text-yellow-500" />
                  <span>Desktop & Mobile Video Assets</span>
                </h3>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Desktop Construction Video URL (MP4/WebM)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={config.settings.desktopVideoUrl}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          settings: { ...config.settings, desktopVideoUrl: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                    <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-yellow-400 text-xs font-bold cursor-pointer flex items-center space-x-1.5">
                      <Upload className="h-4 w-4" />
                      <span>Upload Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, undefined, "desktopVideoUrl")}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Mobile Vertical Construction Video URL (720x1280)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={config.settings.mobileVideoUrl}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          settings: { ...config.settings, mobileVideoUrl: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                    <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-yellow-400 text-xs font-bold cursor-pointer flex items-center space-x-1.5">
                      <Upload className="h-4 w-4" />
                      <span>Upload Mobile Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, undefined, "mobileVideoUrl")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTENT & CTAS */}
        {activeTab === "content" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Hero Branding & Call-to-Action Content</h2>
              <p className="text-xs text-slate-400">
                Customize the persistent hero typography, logo path, and call-to-action buttons.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Company Name</label>
                  <input
                    type="text"
                    value={config.hero.companyName}
                    onChange={(e) =>
                      setConfig({ ...config, hero: { ...config.hero, companyName: e.target.value } })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={config.hero.brandTagline}
                    onChange={(e) =>
                      setConfig({ ...config, hero: { ...config.hero, brandTagline: e.target.value } })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Hero Main Title</label>
                <input
                  type="text"
                  value={config.hero.mainTitle}
                  onChange={(e) =>
                    setConfig({ ...config, hero: { ...config.hero, mainTitle: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Hero Subtitle</label>
                <textarea
                  rows={2}
                  value={config.hero.subTitle}
                  onChange={(e) =>
                    setConfig({ ...config, hero: { ...config.hero, subTitle: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-yellow-400 uppercase font-bold">
                    Primary CTA (Button 1)
                  </label>
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={config.hero.ctaPrimaryText}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        hero: { ...config.hero, ctaPrimaryText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Button Link / URL"
                    value={config.hero.ctaPrimaryLink}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        hero: { ...config.hero, ctaPrimaryLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-sky-400 uppercase font-bold">
                    Secondary CTA (Button 2)
                  </label>
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={config.hero.ctaSecondaryText}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        hero: { ...config.hero, ctaSecondaryText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Button Link / URL"
                    value={config.hero.ctaSecondaryLink}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        hero: { ...config.hero, ctaSecondaryLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LIVE PREVIEW SIMULATOR */}
        {activeTab === "preview" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Live Hero Timelapse Simulator</h2>
                <p className="text-xs text-slate-400">
                  Scrub or test your staged changes directly in real-time.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-yellow-400">
                  Previewing Stage {previewStageIdx + 1} of {config.stages.length}
                </span>
              </div>
            </div>

            {/* Simulated Hero Container */}
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
              <Image
                src={config.stages[previewStageIdx]?.desktopMediaUrl || "/images/stages/stage-01.jpg"}
                alt="Stage preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Overlay simulation */}
              <div className="absolute bottom-16 left-8 max-w-xl space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-mono font-bold">
                  STAGE {config.stages[previewStageIdx]?.stageNumber} — {config.stages[previewStageIdx]?.name}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  "{config.stages[previewStageIdx]?.title}"
                </h3>
                <p className="text-xs text-slate-300">
                  {config.stages[previewStageIdx]?.description}
                </p>
              </div>

              {/* Slider controls inside simulator */}
              <div className="absolute bottom-4 left-8 right-8 flex items-center space-x-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-slate-400">Scrub Stage:</span>
                <input
                  type="range"
                  min="0"
                  max={config.stages.length - 1}
                  value={previewStageIdx}
                  onChange={(e) => setPreviewStageIdx(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                <span className="text-xs font-mono text-white font-bold">
                  {config.stages[previewStageIdx]?.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
