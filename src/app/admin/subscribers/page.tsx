"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Download,
  Trash2,
  Search,
  Filter,
  Send,
  MoreVertical,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  source: string | null;
  createdAt: string;
}

// Demo subscribers
const demoSubscribers: Subscriber[] = [
  {
    id: "1",
    email: "ahmad.rizky@email.com",
    name: "Ahmad Rizky",
    isActive: true,
    source: "homepage",
    createdAt: "2026-03-15T08:30:00Z",
  },
  {
    id: "2",
    email: "rina.marlina@email.com",
    name: "Rina Marlina",
    isActive: true,
    source: "article",
    createdAt: "2026-03-14T14:20:00Z",
  },
  {
    id: "3",
    email: "budi.santoso@email.com",
    name: "Budi Santoso",
    isActive: true,
    source: "homepage",
    createdAt: "2026-03-13T10:15:00Z",
  },
  {
    id: "4",
    email: "dewi.sartika@email.com",
    name: "Dewi Sartika",
    isActive: false,
    source: "popup",
    createdAt: "2026-03-12T16:45:00Z",
  },
  {
    id: "5",
    email: "yoga.pratama@email.com",
    name: "Yoga Pratama",
    isActive: true,
    source: "article",
    createdAt: "2026-03-11T09:00:00Z",
  },
  {
    id: "6",
    email: "andi.wijaya@email.com",
    name: "Andi Wijaya",
    isActive: true,
    source: "homepage",
    createdAt: "2026-03-10T11:30:00Z",
  },
  {
    id: "7",
    email: "siti.nurhaliza@email.com",
    name: "Siti Nurhaliza",
    isActive: true,
    source: "footer",
    createdAt: "2026-03-09T15:20:00Z",
  },
  {
    id: "8",
    email: "agus.prabowo@email.com",
    name: "Agus Prabowo",
    isActive: false,
    source: "homepage",
    createdAt: "2026-03-08T08:10:00Z",
  },
];

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(demoSubscribers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [filterSource, setFilterSource] = useState<string>("all");

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && sub.isActive) ||
      (filterStatus === "inactive" && !sub.isActive);
    const matchesSource = filterSource === "all" || sub.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const uniqueSources = [...new Set(subscribers.map((s) => s.source).filter(Boolean))];

  const handleToggleActive = (id: string) => {
    setSubscribers((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
      )
    );
    const sub = subscribers.find((s) => s.id === id);
    toast({
      title: "Status Diperbarui",
      description: `${sub?.email} ${sub?.isActive ? "dinonaktifkan" : "diaktifkan"}`,
    });
  };

  const handleDelete = (id: string) => {
    setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
    toast({
      title: "Berhasil!",
      description: "Subscriber berhasil dihapus",
    });
  };

  const handleExport = () => {
    const csv = [
      ["Email", "Name", "Status", "Source", "Subscribed At"].join(","),
      ...filteredSubscribers.map((sub) =>
        [
          sub.email,
          sub.name || "",
          sub.isActive ? "Active" : "Inactive",
          sub.source || "",
          new Date(sub.createdAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Berhasil!",
      description: `${filteredSubscribers.length} subscribers diekspor ke CSV`,
    });
  };

  const handleSendNewsletter = () => {
    toast({
      title: "Newsletter",
      description: "Fitur kirim newsletter akan segera tersedia",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const totalActive = subscribers.filter((s) => s.isActive).length;
  const totalInactive = subscribers.filter((s) => !s.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Subscriber</h1>
          <p className="text-muted-foreground">Kelola daftar subscriber newsletter</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={handleSendNewsletter}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Kirim Newsletter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <Users className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{subscribers.length}</p>
                <p className="text-xs text-muted-foreground">Total Subscriber</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalActive}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalInactive}</p>
                <p className="text-xs text-muted-foreground">Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari subscriber..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filterStatus}
                onValueChange={(value: "all" | "active" | "inactive") =>
                  setFilterStatus(value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSource} onValueChange={setFilterSource}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Source</SelectItem>
                  {uniqueSources.map((source) => (
                    <SelectItem key={source} value={source!}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bergabung</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="font-medium">{subscriber.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{subscriber.name || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {subscriber.source || "unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {subscriber.isActive ? (
                        <Badge className="bg-green-600">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(subscriber.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(subscriber.id)}
                          title={subscriber.isActive ? "Nonaktifkan" : "Aktifkan"}
                        >
                          {subscriber.isActive ? (
                            <XCircle className="w-4 h-4 text-red-500" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </Button>
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
                              <AlertDialogTitle>Hapus Subscriber?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Subscriber &quot;{subscriber.email}&quot; akan dihapus permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => handleDelete(subscriber.id)}
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

      {/* Empty State */}
      {filteredSubscribers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Tidak ada subscriber ditemukan</h3>
          <p className="text-muted-foreground">
            {searchQuery || filterStatus !== "all"
              ? "Coba ubah filter pencarian"
              : "Subscriber baru akan muncul di sini"}
          </p>
        </div>
      )}
    </div>
  );
}
