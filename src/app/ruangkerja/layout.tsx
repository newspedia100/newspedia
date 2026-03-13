"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
  Users,
  BarChart3,
  DollarSign,
  Radio,
  Loader2,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/new", label: "Tambah Berita", icon: PlusCircle },
  { href: "/admin/articles", label: "Kelola Berita", icon: FileText },
  { href: "/admin/marquee", label: "Marquee News", icon: Radio },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/subscribers", label: "Subscriber", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/ads", label: "Ad Slots", icon: DollarSign },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{ username: string; name?: string } | null>(null);
  const [stats, setStats] = useState({
    articles: 0,
    views: 0,
    subscribers: 0,
  });

  // Check authentication
  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setCheckingAuth(false);
      setAuthenticated(true); // Allow login page to render
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();

        if (data.authenticated) {
          setAuthenticated(true);
          setAdminUser(data.admin);
        } else {
          router.replace("/admin/login");
        }
      } catch {
        router.replace("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Fetch stats
  useEffect(() => {
    if (!authenticated || pathname === "/admin/login") return;

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
  }, [authenticated, pathname]);

    // Logout handler
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth", { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/login");
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/admin/login");
    }
  };

  // Loading state
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  // Login page - render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Not authenticated - show message briefly before redirect
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Mengalihkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
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

      {/* Sidebar */}
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

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              {adminUser?.name?.[0] || adminUser?.username?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <p className="font-medium text-sm">{adminUser?.name || adminUser?.username}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1 mt-2 lg:mt-0">
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

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-2">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogIn className="w-4 h-4" />
              Lihat Website
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-background rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Artikel</p>
              <p className="text-2xl font-bold text-teal-600">{stats.articles}</p>
            </div>
            <div className="bg-background rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold text-orange-500">{stats.views.toLocaleString()}</p>
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
