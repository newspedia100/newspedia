"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ChevronDown,
  Landmark,
  Scale,
  Users,
  Video,
  Settings,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NewsMarquee } from "./NewsMarquee";

// Tech & Lifestyle categories
const techCategories = [
  { id: "teknologi", name: "Teknologi", slug: "teknologi" },
  { id: "gaming", name: "Gaming", slug: "gaming" },
  { id: "tips-trik", name: "Tips & Trik", slug: "tips-trik" },
  { id: "ai-tools", name: "AI Tools", slug: "ai-tools" },
];

// News categories
const newsCategories = [
  { id: "politik", name: "Politik", slug: "politik", icon: Landmark },
  { id: "hukum", name: "Hukum", slug: "hukum", icon: Scale },
  { id: "sosial", name: "Sosial", slug: "sosial", icon: Users },
  { id: "news-video", name: "News Video", slug: "news-video", icon: Video },
];

interface NavbarProps {
  onOpenSearch?: () => void;
}

// Custom hook for scroll position using useSyncExternalStore
function useScrollY() {
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return 0;
    return window.scrollY;
  }, []);

  const getServerSnapshot = useCallback(() => 0, []);

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("scroll", callback, { passive: true });
    return () => window.removeEventListener("scroll", callback);
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const scrollY = useScrollY();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isScrolled = scrollY > 20;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        {/* Top Bar - News Marquee */}
        <NewsMarquee />

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Newspaper className="w-8 h-8 text-teal-600 group-hover:text-orange-500 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold font-display gradient-text">NewsPedia</span>
                <span className="hidden sm:block text-xs text-muted-foreground -mt-1">Portal Berita Terpercaya</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Tech & Lifestyle Categories */}
              {techCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/#${category.slug}`}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                >
                  {category.name}
                </Link>
              ))}
              
              {/* News Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 gap-1">
                    Berita
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {newsCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <DropdownMenuItem key={category.id} asChild>
                        <Link
                          href={`/#${category.slug}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <IconComponent className="w-4 h-4" />
                          {category.name}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenSearch}
                className="hover:bg-teal-100 dark:hover:bg-teal-900/30"
                aria-label="Cari artikel"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-teal-100 dark:hover:bg-teal-900/30"
                aria-label="Toggle tema"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5 text-orange-500" />
                ) : (
                  <Moon className="w-5 h-5 text-teal-600" />
                )}
              </Button>

              {/* Admin Link */}
              <Link href="/ruangkerja">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-orange-100 dark:hover:bg-orange-900/30"
                  aria-label="Admin Dashboard"
                >
                  <Settings className="w-5 h-5 text-orange-500" />
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[104px] z-40 lg:hidden bg-background border-b border-border shadow-xl max-h-[70vh] overflow-y-auto"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4">
              {/* Tech & Lifestyle */}
              <div className="mb-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tech & Lifestyle</p>
                <div className="flex flex-col gap-1">
                  {techCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/#${category.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* News */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Berita</p>
                <div className="flex flex-col gap-1">
                  {newsCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Link
                        key={category.id}
                        href={`/#${category.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 flex items-center gap-2"
                      >
                        <IconComponent className="w-4 h-4" />
                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-[104px]" />
    </>
  );
}
