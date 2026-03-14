"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Link2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  color: string;
}

const colorMap: Record<string, string> = {
  teal: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  rose: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
};

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [author, setAuthor] = useState("NewsPedia Team");
  const [readTime, setReadTime] = useState(5);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
        toast({
          title: "Berhasil!",
          description: "Gambar berhasil diupload",
        });
      } else {
        toast({
          title: "Info",
          description: "Upload ke server gagal. Silakan gunakan URL dari ImgBB",
        });
      }
    } catch {
      toast({
        title: "Info",
        description: "Gunakan URL gambar dari ImgBB (i.ibb.co)",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !excerpt || !content || !categoryId) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          imageUrl,
          imageAlt,
          author,
          readTime,
          isFeatured,
          isPublished,
          categoryId,
          tags,
          metaTitle: metaTitle || title,
          metaDesc: metaDesc || excerpt,
        }),
      });

      if (res.ok) {
        toast({
          title: "Berhasil!",
          description: "Artikel berhasil disimpan",
        });
        router.push("/ruangkerja");
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      toast({
        title: "Error",
        description: "Gagal menyimpan artikel",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = "";

    switch (format) {
      case "bold":
        newText = `**${selectedText}**`;
        break;
      case "italic":
        newText = `*${selectedText}*`;
        break;
      case "h2":
        newText = `\n## ${selectedText}`;
        break;
      case "h3":
        newText = `\n### ${selectedText}`;
        break;
      case "ul":
        newText = `\n- ${selectedText}`;
        break;
      case "ol":
        newText = `\n1. ${selectedText}`;
        break;
      case "quote":
        newText = `\n> ${selectedText}`;
        break;
      case "link":
        newText = `[${selectedText}](url)`;
        break;
      case "image":
        const url = prompt("Masukkan URL gambar (dari ImgBB):");
        const alt = prompt("Masukkan deskripsi gambar:") || "Gambar";
        if (url) {
          newText = `\n![${alt}](${url})\n`;
        } else {
          newText = selectedText;
        }
        break;
      default:
        newText = selectedText;
    }

    setContent(content.substring(0, start) + newText + content.substring(end));
  };

  const selectedCategory = categories.find((c) => c.id === categoryId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/ruangkerja">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display">Tambah Berita Baru</h1>
          <p className="text-muted-foreground">Upload gambar, lalu isi judul dan konten</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* =============== FOTO UTAMA - DI PALING ATAS =============== */}
            <Card className="border-2 border-teal-200 dark:border-teal-800">
              <CardHeader className="bg-teal-50 dark:bg-teal-950/30">
                <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                  <ImageIcon className="w-5 h-5" />
                  📷 FOTO UTAMA (Upload Dulu!)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {imageUrl ? (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt={imageAlt || "Featured image"}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setImageUrl("")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-teal-300 dark:border-teal-700 rounded-lg p-8 text-center bg-teal-50/50 dark:bg-teal-950/20">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        {uploading ? (
                          <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
                        ) : (
                          <Upload className="w-12 h-12 text-teal-600" />
                        )}
                        <p className="mt-3 text-lg font-medium text-teal-700 dark:text-teal-300">
                          Klik untuk Upload Foto
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          atau gunakan URL dari ImgBB
                        </p>
                      </label>
                    </div>
                  )}

                  {/* Manual URL Input - untuk ImgBB */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl" className="font-medium">
                      URL Gambar (dari ImgBB)
                    </Label>
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://i.ibb.co/xxxxx/nama-gambar.jpg"
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground bg-teal-50 dark:bg-teal-950/30 p-2 rounded">
                      <strong>Format ImgBB yang benar:</strong><br />
                      ✅ https://i.ibb.co/ABC123/foto-saya.jpg<br />
                      ❌ https://ibb.co/ABC123 (salah, tidak akan tampil)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="imageAlt">Deskripsi Gambar (untuk SEO)</Label>
                    <Input
                      id="imageAlt"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Deskripsi gambar..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Title */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-base font-semibold">
                      Judul Berita <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Masukkan judul berita..."
                      className="text-lg font-bold mt-2"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {title.length}/100 karakter (optimal untuk SEO)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Ringkasan</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Ringkasan singkat berita..."
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Konten Artikel</CardTitle>
                  <div className="flex gap-1 flex-wrap">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("bold")}
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("italic")}
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-8 mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("h2")}
                      title="Heading 2"
                    >
                      <Heading2 className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("h3")}
                      title="Heading 3"
                    >
                      <Heading3 className="w-4 h-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-8 mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("ul")}
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("ol")}
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("quote")}
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-8 mx-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("link")}
                      title="Link"
                    >
                      <Link2 className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting("image")}
                      title="📷 Insert Gambar di Konten"
                      className="text-teal-600"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tulis konten artikel di sini... Gunakan toolbar untuk formatting."
                  rows={15}
                  className="font-mono"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Gunakan **text** untuk bold, *text* untuk italic, ## untuk heading. Klik ikon gambar 📷 untuk insert gambar di tengah artikel.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Kategori</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Pilih Kategori <span className="text-red-500">*</span></Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Pilih kategori..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <Badge className={colorMap[cat.color] || ""}>
                              {cat.name}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCategory && (
                    <Badge className={`mt-2 ${colorMap[selectedCategory.color] || ""}`}>
                      {selectedCategory.name}
                    </Badge>
                  )}
                </div>

                <div>
                  <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="teknologi, AI, tutorial..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Author */}
            <Card>
              <CardHeader>
                <CardTitle>Penulis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Nama Penulis</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nama penulis..."
                  />
                </div>
                <div>
                  <Label htmlFor="readTime">Estimasi Waktu Baca (menit)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    value={readTime}
                    onChange={(e) => setReadTime(parseInt(e.target.value) || 5)}
                    min={1}
                    max={60}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Publikasikan</Label>
                    <p className="text-xs text-muted-foreground">
                      Tampilkan di website
                    </p>
                  </div>
                  <Switch
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Featured</Label>
                    <p className="text-xs text-muted-foreground">
                      Tampilkan di carousel
                    </p>
                  </div>
                  <Switch
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || "Meta title..."}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Kosongkan untuk menggunakan judul
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaDesc">Meta Description</Label>
                  <Textarea
                    id="metaDesc"
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    placeholder={excerpt || "Meta description..."}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Artikel
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}