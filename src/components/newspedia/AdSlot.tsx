"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, ExternalLink, X, TrendingUp, ArrowRight, Clock, Eye } from "lucide-react";

interface AdSlotProps {
  position: "leaderboard" | "in-article" | "below-article" | "sidebar" | "below-title" | "native";
  className?: string;
}

const sizeMap = {
  leaderboard: "min-h-[90px] sm:min-h-[100px]",
  "in-article": "min-h-[250px] sm:min-h-[280px]",
  "below-article": "min-h-[90px] sm:min-h-[100px]",
  sidebar: "min-h-[300px] sm:min-h-[600px]",
  "below-title": "min-h-[100px] sm:min-h-[120px]",
  native: "min-h-[200px]",
};

const labelMap = {
  leaderboard: "Leaderboard Ad (728x90)",
  "in-article": "In-Article Ad (336x280)",
  "below-article": "Below Article Ad (728x90)",
  sidebar: "Sidebar Ad (300x600)",
  "below-title": "Below Post Title Ad (728x100)",
  native: "Native Ad",
};

export function AdSlot({ position, className = "" }: AdSlotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`
        ad-slot 
        ${sizeMap[position]} 
        ${className}
        relative
        bg-gradient-to-br from-muted via-muted/80 to-muted
        border-2 border-dashed border-primary/20
        rounded-xl
        flex flex-col items-center justify-center
        gap-2
        text-muted-foreground
        overflow-hidden
        transition-all
        hover:border-primary/40
        hover:shadow-md
      `}
      role="complementary"
      aria-label="Advertisement slot"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,currentColor_25%,currentColor_50%,transparent_50%,transparent_75%,currentColor_75%)] bg-[length:20px_20px]" />
      </div>

      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-xl">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-cyan-500/0 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2 p-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Megaphone className="w-6 h-6 text-primary" />
        </div>
        
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground/80">
            {labelMap[position]}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Slot Iklan Google AdSense
          </p>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-primary/60 mt-1">
          <span>Pasang iklan Anda di sini</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>

      {/* AdSense Code Placeholder */}
      <div className="absolute bottom-2 right-2 text-[9px] text-muted-foreground/40">
        AD
      </div>
    </motion.div>
  );
}

// Matched Content Ad - Looks like article recommendations
export function MatchedContentAd({ className = "" }: { className?: string }) {
  const mockArticles = [
    { title: "5 Teknologi AI Terbaru yang Wajib Anda Ketahui", category: "Teknologi", image: "🤖" },
    { title: "Tips Produktif Bekerja dari Rumah", category: "Tips & Trik", image: "💼" },
    { title: "Review iPhone 16: Inovasi Terbaru Apple", category: "Teknologi", image: "📱" },
    { title: "Game Terbaik 2024 yang Wajib Dicoba", category: "Gaming", image: "🎮" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          Artikel Terkait
        </h3>
        <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">
          Sponsored
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 mb-2">
              <div className="absolute inset-0 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {article.image}
              </div>
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Title */}
            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-teal-600 transition-colors">
              {article.title}
            </h4>

            {/* Meta */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Clock className="w-3 h-3" />
              <span>5 menit lalu</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ad indicator */}
      <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-muted-foreground/40">
        <Megaphone className="w-3 h-3" />
        <span>Matched Content Ad</span>
      </div>
    </motion.div>
  );
}

// Anchor/Sticky Ad - Floating at bottom
export function AnchorAd() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => {
      if (!isClosed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isClosed]);

  const handleClose = () => {
    setIsClosed(true);
    setIsVisible(false);
  };

  if (!isVisible || isClosed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-border shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-8 right-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-t-md flex items-center gap-1 hover:bg-gray-700"
          >
            <X className="w-3 h-3" />
            Tutup Iklan
          </button>

          {/* Ad content */}
          <div className="flex-1 flex items-center justify-center gap-4 py-8 sm:py-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer">
              <Megaphone className="w-4 h-4" />
              <span>Anchor/Sticky Ad (320x50)</span>
              <ArrowRight className="w-4 h-4" />
            </div>

            <div className="sm:hidden flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg text-sm font-medium">
              <Megaphone className="w-4 h-4" />
              <span>Anchor Ad</span>
            </div>

            <div className="text-xs text-muted-foreground">
              <span className="hidden sm:inline">Slot Iklan Melayang - </span>
              <span className="text-primary">AdSense</span>
            </div>
          </div>
        </div>

        {/* Ad indicator */}
        <div className="absolute bottom-1 right-2 text-[8px] text-muted-foreground/40">
          AD
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Native Ad - Blends with content
export function NativeAd({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`relative bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl overflow-hidden ${className}`}
    >
      {/* Content wrapper */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Image placeholder */}
          <div className="sm:w-1/3 aspect-video sm:aspect-square rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center overflow-hidden">
            <div className="text-6xl">📰</div>
          </div>

          {/* Content */}
          <div className="sm:w-2/3 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                Sponsored
              </span>
              <span className="text-xs text-muted-foreground">Partner Content</span>
            </div>

            <h4 className="text-lg font-bold mb-2 hover:text-teal-600 cursor-pointer transition-colors">
              Native Advertising: Promosi Bisnis Anda dengan Efektif
            </h4>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              Tingkatkan visibilitas brand Anda dengan native advertising yang terintegrasi
              secara natural dengan konten editorial kami.
            </p>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium">
                Pelajari Lebih Lanjut
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="w-3 h-3" />
                <span>15.2K views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-muted-foreground/40">
        <Megaphone className="w-3 h-3" />
        <span>Native Ad</span>
      </div>
    </motion.div>
  );
}

// Below Post Title Ad - Compact horizontal format
export function BelowPostTitleAd({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-lg overflow-hidden border border-border ${className}`}
    >
      <div className="flex items-center justify-center gap-4 py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <Megaphone className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Below Post Title Ad (728x100)</p>
            <p className="text-xs text-muted-foreground">Slot iklan di bawah judul artikel</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-primary text-sm">
          <span>Google AdSense</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>

      {/* Ad indicator */}
      <div className="absolute top-1 right-2 text-[9px] text-muted-foreground/40">
        AD
      </div>
    </motion.div>
  );
}
