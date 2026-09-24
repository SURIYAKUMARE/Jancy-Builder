"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent("Hello, I would like to discuss a construction project.");
  const url = `https://wa.me/917708247124?text=${message}`;

  return (
    <motion.aside
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      aria-label="Contact options"
      className="fixed bottom-20 sm:bottom-8 right-5 z-40"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Jancy Builders"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
      >
        <MessageCircle className="w-6 h-6 fill-current flex-shrink-0" />
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
          WhatsApp Us
        </span>
        {/* Radar ping animation */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 animate-ping pointer-events-none" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-white pointer-events-none" />
      </a>
    </motion.aside>
  );
}
