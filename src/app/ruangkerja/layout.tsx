"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Menu,
  X,
  Image as ImageIcon,
  Users,
  BarChart3,
  DollarSign,
  Radio,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/ruangkerja", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ruangkerja/new", label: "Tambah Berita", icon: PlusCircle },
  { href: "/ruangkerja/articles", label: "Kelola Berita", icon: FileText },
  { href: "/ruangkerja/marquee", label: "Marquee News", icon: Radio },
  { href: "/ruangkerja/media", label: "Media Library", icon: ImageIcon },
  { href: "/ruangkerja/subscribers", label: "Subscriber", icon: Users },
  { href: "/ruangkerja/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/ruangkerja/ads", label: "Ad Slots", icon: DollarSign },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    articles: 0,
    subscribers: 0,
  });

  useEffect(() => {
    fetch("/api/articles?limit=1")
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({
          ...prev,
          articles: data.pagination?.total || 0,
        }));
      })
      .catch(console.error);

    fetch("/api/newsletter")
      .then((res) => res.json())
      .then((data) => {
        setStats((prev) => ({
          ...prev,
          subscribers: data.subscribers?.length || 0,
        }));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <span className="ml-2 font-bold text-lg gradient-text">NewsPedia Admin</span>
      </header>

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-40 transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border hidden lg:block">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div>
              <span className="font-bold text-lg gradient-text">NewsPedia</span>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1 mt-2 lg:mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Eye className="w-4 h-4" />
              Lihat Website
            </Button>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-background rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Artikel</p>
              <p className="text-2xl font-bold text-teal-600">{stats.articles}</p>
            </div>
            <div className="bg-background rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Subscriber</p>
              <p className="text-2xl font-bold text-cyan-600">{stats.subscribers}</p>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
