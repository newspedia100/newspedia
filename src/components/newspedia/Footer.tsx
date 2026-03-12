"use client";

import Link from "next/link";
import { 
  Newspaper, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/data/articles";

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenDisclaimer: () => void;
  onSubscribe: (email: string) => void;
}

export function Footer({ onOpenPrivacy, onOpenDisclaimer, onSubscribe }: FooterProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    if (email) {
      onSubscribe(email);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border mt-auto">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h3 className="text-xl font-bold font-display">Berlangganan Newsletter</h3>
              <p className="text-teal-100 text-sm">Dapatkan berita terbaru langsung di inbox Anda</p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                name="email"
                placeholder="Masukkan email Anda"
                className="bg-white/10 border-white/20 text-white placeholder:text-teal-200 focus-visible:ring-white/50 min-w-[250px]"
                required
              />
              <Button type="submit" variant="secondary" className="bg-white text-teal-700 hover:bg-teal-50">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Newspaper className="w-8 h-8 text-teal-600" />
              <span className="text-2xl font-bold font-display gradient-text">NewsPedia</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Portal berita terpercaya yang menyajikan informasi terkini seputar Teknologi, Gaming, Tips & Trik, dan AI Tools.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-teal-100 dark:hover:bg-teal-900/30" asChild>
                <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 text-teal-600" /></a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-teal-100 dark:hover:bg-teal-900/30" asChild>
                <a href="#" aria-label="Twitter"><Twitter className="w-5 h-5 text-teal-600" /></a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-teal-100 dark:hover:bg-teal-900/30" asChild>
                <a href="#" aria-label="Instagram"><Instagram className="w-5 h-5 text-teal-600" /></a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-teal-100 dark:hover:bg-teal-900/30" asChild>
                <a href="#" aria-label="YouTube"><Youtube className="w-5 h-5 text-teal-600" /></a>
              </Button>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-display">Kategori</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/#${category.slug}`}
                    className="text-muted-foreground hover:text-teal-600 transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-display">Tautan</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="text-muted-foreground hover:text-teal-600 transition-colors text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDisclaimer}
                  className="text-muted-foreground hover:text-teal-600 transition-colors text-sm"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <Link href="#tentang" className="text-muted-foreground hover:text-teal-600 transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#kontak" className="text-muted-foreground hover:text-teal-600 transition-colors text-sm">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="#advertise" className="text-muted-foreground hover:text-teal-600 transition-colors text-sm">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-display">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-teal-600" />
                <a href="mailto:newspedia100@gmail.com" className="hover:text-teal-600 transition-colors">
                  newspedia100@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-teal-600" />
                <a href="tel:+6285775609498" className="hover:text-teal-600 transition-colors">
                  085775609498
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-teal-600 mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              © 2024 NewsPedia. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Indonesia
            </p>
            <p className="text-xs">
              All rights reserved. Content licensed under CC BY-NC-SA 4.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
