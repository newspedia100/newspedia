"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText } from "lucide-react";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyModal({ open, onOpenChange }: PrivacyPolicyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-6 h-6 text-teal-600" />
            Kebijakan Privasi
          </DialogTitle>
          <DialogDescription>
            Terakhir diperbarui: Desember 2024
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Di <strong className="text-foreground">NewsPedia</strong>, privasi pengunjung adalah prioritas utama kami. 
              Dokumen Kebijakan Privasi ini menguraikan jenis informasi pribadi yang diterima dan dikumpulkan oleh 
              NewsPedia dan bagaimana informasi tersebut digunakan.
            </p>

            <h3 className="text-lg font-semibold text-foreground">File Log</h3>
            <p>
              Seperti banyak situs web lain, kami menggunakan file log. Informasi di dalam file log mencakup 
              alamat protokol internet (IP), jenis browser, Internet Service Provider (ISP), stempel tanggal/waktu, 
              halaman rujukan/keluar, dan jumlah klik untuk menganalisis tren, mengelola situs, dan melacak 
              pergerakan pengguna di sekitar situs. Alamat IP dan informasi lainnya tidak terkait dengan informasi 
              apa pun yang dapat diidentifikasi secara pribadi.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Cookie dan Suar Web</h3>
            <p>
              Kami menggunakan cookie untuk menyimpan informasi tentang preferensi pengunjung, merekam informasi 
              spesifik pengguna pada halaman mana yang diakses atau dikunjungi, menyesuaikan konten halaman web 
              berdasarkan jenis browser pengunjung atau informasi lain yang dikirimkan pengunjung melalui browser mereka.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Cookie DART DoubleClick Google</h3>
            <p>
              Google, sebagai vendor pihak ketiga, menggunakan cookie untuk menayangkan iklan di situs kami. 
              Penggunaan cookie DART oleh Google memungkinkannya untuk menayangkan iklan kepada pengguna kami 
              berdasarkan kunjungan mereka ke situs kami dan situs lain di Internet. Pengguna dapat membatalkan 
              penggunaan cookie DART dengan mengunjungi kebijakan privasi jaringan iklan dan konten Google.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Pihak Ketiga</h3>
            <p>
              Beberapa iklan di situs ini mungkin berasal dari jaringan iklan pihak ketiga yang menggunakan 
              cookie untuk melacak kunjungan ke situs ini dan/atau situs lain. Anda dapat mempelajari lebih 
              lanjut tentang praktik iklan yang menarik minat Anda dengan mengunjungi halaman tentang perilaku 
              online dari Network Advertising Initiative (NAI).
            </p>

            <h3 className="text-lg font-semibold text-foreground">Hubungi Kami</h3>
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di{" "}
              <a href="mailto:privacy@newspedia.com" className="text-teal-600 hover:underline">
                privacy@newspedia.com
              </a>
            </p>
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)} className="bg-teal-600 hover:bg-teal-700">
            Saya Mengerti
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DisclaimerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DisclaimerModal({ open, onOpenChange }: DisclaimerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-6 h-6 text-orange-500" />
            Disclaimer (Sanggahan)
          </DialogTitle>
          <DialogDescription>
            Informasi penting tentang konten di NewsPedia
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Informasi yang terdapat di <strong className="text-foreground">NewsPedia</strong> adalah 
              untuk tujuan informasi umum saja. NewsPedia tidak membuat jaminan apa pun tentang kelengkapan, 
              keandalan, dan akurasi informasi ini.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Keterbatasan Tanggung Jawab</h3>
            <p>
              Tindakan apapun yang Anda lakukan atas informasi yang Anda temukan di situs ini, adalah 
              tanggung jawab Anda sendiri. NewsPedia tidak bertanggung jawab atas kerugian dan/atau 
              kerusakan yang timbul dari penggunaan situs kami.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Tautan Eksternal</h3>
            <p>
              Situs ini mungkin berisi tautan ke situs web eksternal yang tidak kami kontrol. Kami tidak 
              memiliki kontrol atas konten, kebijakan privasi, atau praktik situs pihak ketiga mana pun 
              dan tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik mereka.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Sanggahan Profesional</h3>
            <p>
              Situs ini tidak memberikan nasihat profesional. Konten tidak dimaksudkan sebagai pengganti 
              nasihat profesional, termasuk tetapi tidak terbatas pada nasihat medis, hukum, atau keuangan. 
              Selalu konsultasikan dengan profesional yang berkualifikasi untuk keputusan penting.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Pendapat Penulis</h3>
            <p>
              Pendapat yang diungkapkan dalam artikel adalah milik penulis masing-masing dan tidak 
              mencerminkan pandangan NewsPedia. NewsPedia berusaha untuk menyajikan informasi yang 
              akurat dan berimbang, namun kesalahan dan kelalaian dikecualikan.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Perubahan Konten</h3>
            <p>
              NewsPedia berhak untuk menambah, mengubah, atau menghapus konten dari situs ini kapan saja 
              tanpa pemberitahuan sebelumnya.
            </p>

            <h3 className="text-lg font-semibold text-foreground">Hubungi Kami</h3>
            <p>
              Jika Anda memerlukan informasi lebih lanjut, silakan hubungi kami di{" "}
              <a href="mailto:contact@newspedia.com" className="text-teal-600 hover:underline">
                contact@newspedia.com
              </a>
            </p>
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)} className="bg-orange-500 hover:bg-orange-600">
            Saya Mengerti
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
