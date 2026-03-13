"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, Sparkles, Loader2, XCircle } from "lucide-react";

interface NewsletterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
}

export function NewsletterModal({ open, onOpenChange, email: initialEmail }: NewsletterModalProps) {
  const [email, setEmail] = useState(initialEmail || "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(open);

  // Update email when initialEmail changes
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  // Sync open state
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal berlangganan");
      }

      setStatus("success");

      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
        onOpenChange(false);
        setStatus("idle");
        setEmail("");
      }, 2500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange(newOpen);
    if (!newOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle2 className="w-20 h-20 text-teal-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Terima Kasih!</h2>
              <p className="text-muted-foreground">
                Anda telah berhasil berlangganan newsletter NewsPedia
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Cek inbox Anda untuk konfirmasi
              </p>
            </motion.div>
          ) : status === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Gagal</h2>
              <p className="text-muted-foreground mb-4">{errorMessage}</p>
              <Button onClick={() => setStatus("idle")} variant="outline">
                Coba Lagi
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  Berlangganan Newsletter
                </DialogTitle>
                <DialogDescription>
                  Dapatkan berita terbaru dan eksklusif langsung di inbox Anda
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleOpenChange(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Dengan berlangganan, Anda menyetujui{" "}
                  <button
                    type="button"
                    className="text-teal-600 hover:underline"
                    onClick={() => handleOpenChange(false)}
                  >
                    Kebijakan Privasi
                  </button>{" "}
                  kami
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
