"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConstructionStage, HeroConfig } from "@/types/hero";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Upload,
  CheckCircle,
  Eye,
  Layers,
  FileText,
  Video,
  Sliders,
  Sparkles
} from "lucide-react";

export default function AdminHeroPage() {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [activeTab, setActiveTab] = useState<"stages" | "settings" | "content" | "preview">("stages");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [uploadingStageId, setUploadingStageId] = useState<number | null>(null);
  const [previewStageIdx, setPreviewStageIdx] = useState(0);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("Failed to fetch admin config:", err));
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen bg-[#05080E] flex items-center justify-center text-slate-300">
        <div className="flex items-center space-x-3 font-mono text-sm">
          <div className="h-4 w-4 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
          <span>Loading Jancy Builders Admin Portal...</span>
        </div>
      </div>
    );
  }

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
        setSaveMessage("Hero Configuration published live!");
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

  const moveStage = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= config.stages.length) return;

    const newStages = [...config.stages];
    const temp = newStages[index];
    newStages[index] = newStages[targetIdx];
    newStages[targetIdx] = temp;

    newStages.forEach((stg, i) => {
      stg.order = i + 1;
      stg.stageNumber = String(i + 1).padStart(2, "0");
    });

    setConfig({ ...config, stages: newStages });
  };

  const updateStage = (index: number, field: keyof ConstructionStage, value: any) => {
    const newStages = [...config.stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setConfig({ ...config, stages: newStages });
  };

  const deleteStage = (id: number) => {
    if (!confirm("Are you sure you want to delete this construction stage?")) return;
    const newStages = config.stages.filter((s) => s.id !== id);
    newStages.forEach((stg, i) => {
      stg.order = i + 1;
      stg.stageNumber = String(i + 1).padStart(2, "0");
    });
    setConfig({ ...config, stages: newStages });
  };

  const addNewStage = () => {
    const newId = Date.now();
    const newOrder = config.stages.length + 1;
    const newStage: ConstructionStage = {
      id: newId,
      stageNumber: String(newOrder).padStart(2, "0"),
      name: "New Construction Phase",
      title: "Title for New Phase",
      description: "Detailed description of this engineering milestone.",
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
    <div className="min-h-screen bg-[#05080E] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#060a12]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all flex items-center space-x-1.5 text-xs font-mono"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Live Website</span>
            </Link>

            <div className="relative h-10 w-44">
              <Image
                src="/logo/jancy-logo-darkmode.png"
                alt="Jancy Builders"
                fill
                className="object-contain object-left"
              />
            </div>

            <div className="hidden md:block pl-4 border-l border-white/10">
              <h1 className="text-sm font-bold text-white font-mono">
                ADMIN → HERO / CONSTRUCTION EXPERIENCE
              </h1>
              <p className="text-[11px] text-slate-400">
                12-Stage Video Timelapse CMS & Global Controls
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {saveMessage && (
              <div className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                <CheckCircle className="h-4 w-4" />
                <span>{saveMessage}</span>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl btn-brand-primary text-white font-bold text-xs flex items-center space-x-2 shadow-xl active:scale-95 transition-all disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? "Publishing..." : "Publish Changes"}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center space-x-2 border-t border-white/5 pt-3">
          {[
            { id: "stages", label: "Construction Stages (12)", icon: Layers },
            { id: "settings", label: "Experience & Video Playback", icon: Sliders },
            { id: "content", label: "Hero Copy & CTAs", icon: FileText },
            { id: "preview", label: "Live Split Simulator", icon: Eye },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white font-bold shadow-md shadow-red-600/30"
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

      {/* Main CMS Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {/* TAB 1: STAGES */}
        {activeTab === "stages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white font-serif">Construction Stages Sequence</h2>
                <p className="text-xs text-slate-400">
                  Manage individual milestone graphics, videos, specifications, and timing.
                </p>
              </div>
              <button
                onClick={addNewStage}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-red-400 border border-red-500/30 font-bold text-xs flex items-center space-x-1.5 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Add Construction Stage</span>
              </button>
            </div>

            <div className="space-y-4">
              {config.stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`glass-card-premium rounded-2xl p-5 border transition-all ${
                    stage.active ? "border-white/10" : "border-red-500/30 opacity-60"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Reorder & Thumbnail */}
                    <div className="lg:col-span-3 flex items-start space-x-3">
                      <div className="flex flex-col space-y-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveStage(idx, "up")}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-20 text-slate-400"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          disabled={idx === config.stages.length - 1}
                          onClick={() => moveStage(idx, "down")}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-20 text-slate-400"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="relative h-28 w-44 rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0 group">
                        <Image
                          src={stage.desktopMediaUrl}
                          alt={stage.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-1.5 left-1.5 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-red-400 font-bold">
                          STAGE {stage.stageNumber}
                        </div>

                        <label className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity text-xs font-medium space-y-1">
                          <Upload className="h-4 w-4 text-red-500" />
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

                    {/* Inputs */}
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
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-semibold focus:border-red-500 focus:outline-none"
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
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
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
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <label className="block text-[10px] text-slate-500 uppercase mb-0.5">
                            Desktop Media URL
                          </label>
                          <input
                            type="text"
                            value={stage.desktopMediaUrl}
                            onChange={(e) => updateStage(idx, "desktopMediaUrl", e.target.value)}
                            className="w-full px-2.5 py-1 rounded-lg bg-slate-950 border border-white/5 text-slate-300 text-[11px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 uppercase mb-0.5">
                            Mobile Media URL
                          </label>
                          <input
                            type="text"
                            value={stage.mobileMediaUrl}
                            onChange={(e) => updateStage(idx, "mobileMediaUrl", e.target.value)}
                            className="w-full px-2.5 py-1 rounded-lg bg-slate-950 border border-white/5 text-slate-300 text-[11px]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Duration & Toggle */}
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
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center space-x-2 cursor-pointer text-xs font-mono">
                          <input
                            type="checkbox"
                            checked={stage.active}
                            onChange={(e) => updateStage(idx, "active", e.target.checked)}
                            className="rounded bg-slate-900 border-white/10 text-red-500 focus:ring-0"
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

        {/* TAB 2: SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white font-serif">Playback & Video Settings</h2>
              <p className="text-xs text-slate-400">
                Configure autoplay timings, scroll storytelling, and video engine overrides.
              </p>
            </div>

            <div className="glass-card-premium rounded-2xl p-6 border border-white/10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Autoplay Timelapse</h3>
                    <p className="text-xs text-slate-400">Progress through stages automatically</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.settings.autoplay}
                    onChange={(e) =>
                      setConfig({ ...config, settings: { ...config.settings, autoplay: e.target.checked } })
                    }
                    className="h-5 w-5 rounded bg-slate-900 text-red-600"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Scroll-Based Storytelling</h3>
                    <p className="text-xs text-slate-400">Scrub house progress with scroll depth</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.settings.scrollAnimation}
                    onChange={(e) =>
                      setConfig({ ...config, settings: { ...config.settings, scrollAnimation: e.target.checked } })
                    }
                    className="h-5 w-5 rounded bg-slate-900 text-red-600"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Pause on Hover</h3>
                    <p className="text-xs text-slate-400">Freeze timelapse when hovering hero</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.settings.pauseOnHover}
                    onChange={(e) =>
                      setConfig({ ...config, settings: { ...config.settings, pauseOnHover: e.target.checked } })
                    }
                    className="h-5 w-5 rounded bg-slate-900 text-red-600"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Engine Priority</h3>
                    <p className="text-xs text-slate-400">Primary visual engine</p>
                  </div>
                  <select
                    value={config.settings.fallbackMode}
                    onChange={(e) =>
                      setConfig({ ...config, settings: { ...config.settings, fallbackMode: e.target.value as any } })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-red-400 font-mono focus:outline-none"
                  >
                    <option value="auto">Auto Responsive</option>
                    <option value="video">Cinematic Video First</option>
                    <option value="image">Photo Sequence First</option>
                    <option value="blueprint">Blueprint Grid Only</option>
                  </select>
                </div>
              </div>

              {/* Video upload */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Video className="h-4 w-4 text-red-500" />
                  <span>Desktop & Mobile Videos</span>
                </h3>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Desktop Video URL</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={config.settings.desktopVideoUrl}
                      onChange={(e) =>
                        setConfig({ ...config, settings: { ...config.settings, desktopVideoUrl: e.target.value } })
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white"
                    />
                    <label className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-red-400 text-xs font-mono font-bold cursor-pointer flex items-center space-x-1.5">
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, undefined, "desktopVideoUrl")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTENT */}
        {activeTab === "content" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white font-serif">Branding & Hero Typography</h2>
              <p className="text-xs text-slate-400">
                Customize titles, brand slogan, logo path, and call-to-action destinations.
              </p>
            </div>

            <div className="glass-card-premium rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Company Name</label>
                  <input
                    type="text"
                    value={config.hero.companyName}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, companyName: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={config.hero.brandTagline}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, brandTagline: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-bold text-red-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Main Hero Headline</label>
                <input
                  type="text"
                  value={config.hero.mainTitle}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, mainTitle: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={config.hero.subTitle}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subTitle: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-red-400 uppercase font-bold">Primary CTA</label>
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={config.hero.ctaPrimaryText}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaPrimaryText: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="URL Link"
                    value={config.hero.ctaPrimaryLink}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaPrimaryLink: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs font-mono text-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-sky-400 uppercase font-bold">Secondary CTA</label>
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={config.hero.ctaSecondaryText}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaSecondaryText: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="URL Link"
                    value={config.hero.ctaSecondaryLink}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaSecondaryLink: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs font-mono text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PREVIEW */}
        {activeTab === "preview" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white font-serif">Live Hero Simulator</h2>
                <p className="text-xs text-slate-400">
                  Inspect how each stage renders in real-time.
                </p>
              </div>
              <span className="text-xs font-mono text-red-400 font-bold">
                Stage {previewStageIdx + 1} of {config.stages.length}
              </span>
            </div>

            <div className="relative h-[550px] w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
              <Image
                src={config.stages[previewStageIdx]?.desktopMediaUrl || "/images/stages/stage-01.jpg"}
                alt="Stage preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-16 left-8 max-w-xl space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-white text-xs font-mono font-bold">
                  STAGE {config.stages[previewStageIdx]?.stageNumber} — {config.stages[previewStageIdx]?.name}
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">
                  "{config.stages[previewStageIdx]?.title}"
                </h3>
                <p className="text-xs text-slate-300">
                  {config.stages[previewStageIdx]?.description}
                </p>
              </div>

              <div className="absolute bottom-4 left-8 right-8 flex items-center space-x-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <span className="text-xs font-mono text-slate-400">Scrub Stage:</span>
                <input
                  type="range"
                  min="0"
                  max={config.stages.length - 1}
                  value={previewStageIdx}
                  onChange={(e) => setPreviewStageIdx(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
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
