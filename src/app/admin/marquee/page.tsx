"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  Eye,
  EyeOff,
  ExternalLink,
  Save,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface MarqueeItem {
  id: string;
  text: string;
  link: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function MarqueeAdminPage() {
  const [items, setItems] = useState<MarqueeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarqueeItem | null>(null);
  const [formData, setFormData] = useState({
    text: "",
    link: "",
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  // Fetch marquee items
  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/marquee");
      const data = await res.json();
      setItems(data.marqueeNews || []);
    } catch (error) {
      console.error("Failed to fetch marquee items:", error);
      toast.error("Gagal memuat data marquee");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Open add dialog
  const openAddDialog = () => {
    setSelectedItem(null);
    setFormData({ text: "", link: "", isActive: true });
    setEditDialogOpen(true);
  };

  // Open edit dialog
  const openEditDialog = (item: MarqueeItem) => {
    setSelectedItem(item);
    setFormData({
      text: item.text,
      link: item.link || "",
      isActive: item.isActive,
    });
    setEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (item: MarqueeItem) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  // Save item (create or update)
  const handleSave = async () => {
    if (!formData.text.trim()) {
      toast.error("Teks berita harus diisi");
      return;
    }

    setSaving(true);
    try {
      const url = "/api/marquee";
      const method = selectedItem ? "PUT" : "POST";
      const body = selectedItem
        ? { id: selectedItem.id, ...formData }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success(selectedItem ? "Berita berhasil diperbarui" : "Berita berhasil ditambahkan");
      setEditDialogOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error("Gagal menyimpan berita");
    } finally {
      setSaving(false);
    }
  };

  // Delete item
  const handleDelete = async () => {
    if (!selectedItem) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/marquee?id=${selectedItem.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Berita berhasil dihapus");
      setDeleteDialogOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Gagal menghapus berita");
    } finally {
      setSaving(false);
    }
  };

  // Toggle active status
  const toggleActive = async (item: MarqueeItem) => {
    try {
      const res = await fetch("/api/marquee", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          isActive: !item.isActive,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success(item.isActive ? "Berita dinonaktifkan" : "Berita diaktifkan");
      fetchItems();
    } catch (error) {
      console.error("Failed to toggle:", error);
      toast.error("Gagal mengubah status");
    }
  };

  // Move item order
  const moveItem = async (item: MarqueeItem, direction: "up" | "down") => {
    const currentIndex = items.findIndex((i) => i.id === item.id);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= items.length) return;

    const swapItem = items[newIndex];

    try {
      // Swap orders
      await Promise.all([
        fetch("/api/marquee", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, order: swapItem.order }),
        }),
        fetch("/api/marquee", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: swapItem.id, order: item.order }),
        }),
      ]);

      fetchItems();
    } catch (error) {
      console.error("Failed to move:", error);
      toast.error("Gagal mengubah urutan");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Radio className="w-6 h-6 text-teal-600" />
            Marquee News
          </h1>
          <p className="text-muted-foreground">
            Kelola teks berita berjalan di header website
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Berita
        </Button>
      </div>

      {/* Preview Card */}
      <Card className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm font-medium">Preview Marquee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 text-white">
              <span className="bg-white text-teal-600 px-3 py-0.5 rounded-full text-xs font-bold">
                INFO
              </span>
              <div className="flex-1 overflow-hidden">
                <div className="whitespace-nowrap marquee-animate">
                  {items.filter((i) => i.isActive).map((item) => item.text).join(" • ")}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Berita Marquee</CardTitle>
          <CardDescription>
            Teks yang akan tampil di header website dengan animasi berjalan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Radio className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada berita marquee</p>
              <Button variant="link" onClick={openAddDialog}>
                Tambah berita pertama
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      item.isActive
                        ? "bg-background border-border"
                        : "bg-muted/50 border-muted opacity-60"
                    }`}
                  >
                    {/* Order Controls */}
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => moveItem(item, "up")}
                        disabled={index === 0}
                      >
                        <GripVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{item.text}</p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:text-teal-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {item.link && (
                        <p className="text-xs text-muted-foreground truncate">
                          {item.link}
                        </p>
                      )}
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {item.isActive ? "Aktif" : "Nonaktif"}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleActive(item)}
                        title={item.isActive ? "Nonaktifkan" : "Aktifkan"}
                      >
                        {item.isActive ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => openDeleteDialog(item)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? "Edit Berita Marquee" : "Tambah Berita Marquee"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="text">Teks Berita</Label>
              <Input
                id="text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Contoh: Pemilu Legislatif 2026"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link (Opsional)</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com/article"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Status Aktif</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="ml-2">Simpan</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Apakah Anda yakin ingin menghapus berita &quot;{selectedItem?.text}&quot;?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span className="ml-2">Hapus</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
