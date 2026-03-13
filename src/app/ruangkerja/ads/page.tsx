"use client";

import { useState } from "react";
import {
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  ToggleLeft,
  ToggleRight,
  Monitor,
  Smartphone,
  Layout,
  AlignJustify,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AdSlotConfig {
  id: string;
  name: string;
  position: string;
  adCode: string;
  isActive: boolean;
  width: number;
  height: number;
  device: "all" | "desktop" | "mobile";
  createdAt: string;
}

// Demo ad slots
const demoAdSlots: AdSlotConfig[] = [
  {
    id: "1",
    name: "Leaderboard Top",
    position: "leaderboard",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="1234567890"></ins>',
    isActive: true,
    width: 728,
    height: 90,
    device: "desktop",
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    name: "In-Article Ad",
    position: "in-article",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="2345678901"></ins>',
    isActive: true,
    width: 336,
    height: 280,
    device: "all",
    createdAt: "2026-01-15",
  },
  {
    id: "3",
    name: "Below Article",
    position: "below-article",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="3456789012"></ins>',
    isActive: true,
    width: 728,
    height: 90,
    device: "all",
    createdAt: "2026-01-15",
  },
  {
    id: "4",
    name: "Sidebar Ad",
    position: "sidebar",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="4567890123"></ins>',
    isActive: false,
    width: 300,
    height: 600,
    device: "desktop",
    createdAt: "2026-02-01",
  },
  {
    id: "5",
    name: "Mobile Banner",
    position: "leaderboard",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="5678901234"></ins>',
    isActive: true,
    width: 320,
    height: 50,
    device: "mobile",
    createdAt: "2026-02-10",
  },
  {
    id: "6",
    name: "Below Post Title",
    position: "below-title",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="6789012345"></ins>',
    isActive: true,
    width: 728,
    height: 100,
    device: "all",
    createdAt: "2026-02-15",
  },
  {
    id: "7",
    name: "Matched Content",
    position: "matched-content",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="7890123456"></ins>',
    isActive: true,
    width: 800,
    height: 300,
    device: "all",
    createdAt: "2026-02-20",
  },
  {
    id: "8",
    name: "Native Ad",
    position: "native",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="8901234567"></ins>',
    isActive: true,
    width: 600,
    height: 200,
    device: "all",
    createdAt: "2026-02-25",
  },
  {
    id: "9",
    name: "Anchor/Sticky Ad",
    position: "anchor",
    adCode: '<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="9012345678"></ins>',
    isActive: true,
    width: 320,
    height: 50,
    device: "mobile",
    createdAt: "2026-03-01",
  },
];

const positionOptions = [
  { value: "leaderboard", label: "Leaderboard (Top)", icon: Layout },
  { value: "in-article", label: "In-Article", icon: AlignJustify },
  { value: "below-article", label: "Below Article", icon: Layout },
  { value: "sidebar", label: "Sidebar", icon: Layout },
  { value: "below-title", label: "Below Post Title", icon: AlignJustify },
  { value: "matched-content", label: "Matched Content", icon: Layout },
  { value: "native", label: "Native Ad", icon: AlignJustify },
  { value: "anchor", label: "Anchor/Sticky Ad", icon: Layout },
];

const sizePresets: Record<string, { width: number; height: number }> = {
  leaderboard: { width: 728, height: 90 },
  "in-article": { width: 336, height: 280 },
  "below-article": { width: 728, height: 90 },
  sidebar: { width: 300, height: 600 },
  "mobile-banner": { width: 320, height: 50 },
  "large-rectangle": { width: 336, height: 280 },
  "below-title": { width: 728, height: 100 },
  "matched-content": { width: 800, height: 300 },
  native: { width: 600, height: 200 },
  anchor: { width: 320, height: 50 },
};

export default function AdSlotsPage() {
  const [adSlots, setAdSlots] = useState<AdSlotConfig[]>(demoAdSlots);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AdSlotConfig | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "leaderboard",
    adCode: "",
    width: 728,
    height: 90,
    device: "all" as "all" | "desktop" | "mobile",
  });

  const handleToggleActive = (id: string) => {
    setAdSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
      )
    );
    const slot = adSlots.find((s) => s.id === id);
    toast({
      title: slot?.isActive ? "Ad Slot Dinonaktifkan" : "Ad Slot Diaktifkan",
      description: `${slot?.name} telah ${slot?.isActive ? "dinonaktifkan" : "diaktifkan"}`,
    });
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Kode Disalin!",
      description: "Ad code berhasil disalin ke clipboard",
    });
  };

  const handleDelete = (id: string) => {
    setAdSlots((prev) => prev.filter((slot) => slot.id !== id));
    toast({
      title: "Berhasil!",
      description: "Ad slot berhasil dihapus",
    });
  };

  const handleAddSlot = () => {
    const newSlot: AdSlotConfig = {
      id: Date.now().toString(),
      ...formData,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAdSlots((prev) => [...prev, newSlot]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Berhasil!",
      description: "Ad slot baru berhasil ditambahkan",
    });
  };

  const handleEditSlot = () => {
    if (!editingSlot) return;
    setAdSlots((prev) =>
      prev.map((slot) =>
        slot.id === editingSlot.id
          ? { ...slot, ...formData }
          : slot
      )
    );
    setEditingSlot(null);
    resetForm();
    toast({
      title: "Berhasil!",
      description: "Ad slot berhasil diperbarui",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "leaderboard",
      adCode: "",
      width: 728,
      height: 90,
      device: "all",
    });
  };

  const openEditDialog = (slot: AdSlotConfig) => {
    setEditingSlot(slot);
    setFormData({
      name: slot.name,
      position: slot.position,
      adCode: slot.adCode,
      width: slot.width,
      height: slot.height,
      device: slot.device,
    });
  };

  const getPositionLabel = (position: string) => {
    return positionOptions.find((p) => p.value === position)?.label || position;
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const totalActive = adSlots.filter((s) => s.isActive).length;
  const totalRevenue = "$1,234.56"; // Demo revenue

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Ad Slots</h1>
          <p className="text-muted-foreground">Kelola slot iklan Google AdSense</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Ad Slot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tambah Ad Slot Baru</DialogTitle>
              <DialogDescription>
                Konfigurasi slot iklan baru untuk website
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Slot</Label>
                <Input
                  id="name"
                  placeholder="cth: Leaderboard Top"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Posisi</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => {
                    const preset = sizePresets[value];
                    setFormData({
                      ...formData,
                      position: value,
                      width: preset?.width || formData.width,
                      height: preset?.height || formData.height,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih posisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {positionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Lebar (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Tinggi (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="device">Target Perangkat</Label>
                <Select
                  value={formData.device}
                  onValueChange={(value: "all" | "desktop" | "mobile") =>
                    setFormData({ ...formData, device: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Perangkat</SelectItem>
                    <SelectItem value="desktop">Desktop Only</SelectItem>
                    <SelectItem value="mobile">Mobile Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adCode">Ad Code (Google AdSense)</Label>
                <Textarea
                  id="adCode"
                  placeholder="Paste kode AdSense di sini..."
                  value={formData.adCode}
                  onChange={(e) => setFormData({ ...formData, adCode: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddSlot} className="bg-teal-600 hover:bg-teal-700">
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalRevenue}</p>
                <p className="text-xs text-muted-foreground">Estimasi Pendapatan Bulan Ini</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <ToggleRight className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalActive}</p>
                <p className="text-xs text-muted-foreground">Active Ad Slots</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Layout className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{adSlots.length}</p>
                <p className="text-xs text-muted-foreground">Total Ad Slots</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ad Slots Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Ad Slot</CardTitle>
          <CardDescription>
            Kelola semua slot iklan yang terpasang di website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Posisi</TableHead>
                  <TableHead>Ukuran</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adSlots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{slot.name}</p>
                        <p className="text-xs text-muted-foreground">{slot.createdAt}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getPositionLabel(slot.position)}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {slot.width} x {slot.height}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getDeviceIcon(slot.device)}
                        <span className="text-sm capitalize">{slot.device}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={slot.isActive}
                          onCheckedChange={() => handleToggleActive(slot.id)}
                        />
                        {slot.isActive ? (
                          <Badge className="bg-green-600">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyCode(slot.id, slot.adCode)}
                          title="Copy Ad Code"
                        >
                          {copiedId === slot.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(slot)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Edit Ad Slot</DialogTitle>
                              <DialogDescription>
                                Perbarui konfigurasi slot iklan
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Nama Slot</Label>
                                <Input
                                  id="edit-name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-position">Posisi</Label>
                                <Select
                                  value={formData.position}
                                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {positionOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-width">Lebar (px)</Label>
                                  <Input
                                    id="edit-width"
                                    type="number"
                                    value={formData.width}
                                    onChange={(e) => setFormData({ ...formData, width: parseInt(e.target.value) })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-height">Tinggi (px)</Label>
                                  <Input
                                    id="edit-height"
                                    type="number"
                                    value={formData.height}
                                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-device">Target Perangkat</Label>
                                <Select
                                  value={formData.device}
                                  onValueChange={(value: "all" | "desktop" | "mobile") =>
                                    setFormData({ ...formData, device: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">Semua Perangkat</SelectItem>
                                    <SelectItem value="desktop">Desktop Only</SelectItem>
                                    <SelectItem value="mobile">Mobile Only</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-adCode">Ad Code</Label>
                                <Textarea
                                  id="edit-adCode"
                                  value={formData.adCode}
                                  onChange={(e) => setFormData({ ...formData, adCode: e.target.value })}
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingSlot(null)}>
                                Batal
                              </Button>
                              <Button onClick={handleEditSlot} className="bg-teal-600 hover:bg-teal-700">
                                Simpan
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Ad Slot?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Ad slot &quot;{slot.name}&quot; akan dihapus permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => handleDelete(slot.id)}
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* AdSense Integration Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Panduan Integrasi Google AdSense</CardTitle>
          <CardDescription>
            Langkah-langkah untuk menghubungkan Google AdSense
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Daftar Google AdSense</p>
                <p className="text-sm text-muted-foreground">
                  Kunjungi google.com/adsense dan daftarkan website Anda
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Dapatkan Kode AdSense</p>
                <p className="text-sm text-muted-foreground">
                  Setelah disetujui, salin kode iklan dari dashboard AdSense
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Paste Kode di Ad Slot</p>
                <p className="text-sm text-muted-foreground">
                  Tambahkan ad slot baru dan paste kode AdSense di field &quot;Ad Code&quot;
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <p className="font-medium">Aktifkan dan Monitor</p>
                <p className="text-sm text-muted-foreground">
                  Aktifkan ad slot dan pantau performa di dashboard Analytics
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
