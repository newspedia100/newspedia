import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami - NewsPedia",
  description: "NewsPedia adalah portal berita terkini dan terpercaya yang menyajikan informasi seputar Teknologi, Gaming, Tips & Trik, dan AI Tools.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Tentang NewsPedia</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Portal berita terkini dan terpercaya untuk informasi teknologi, gaming, dan digital lifestyle.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 text-teal-600">Visi & Misi Kami</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NewsPedia hadir sebagai sumber informasi terpercaya di era digital. Kami berkomitmen untuk menyajikan berita berkualitas, akurat, dan up-to-date bagi pembaca di seluruh Indonesia.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Misi kami adalah menjadi portal berita terdepan yang memberikan insight bernilai dan membantu pembaca tetap terinformasi tentang perkembangan teknologi, gaming, dan tools digital terbaru.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Akurat & Terpercaya</h3>
                  <p className="text-sm text-muted-foreground">
                    Setiap berita kami diteliti dan diverifikasi untuk memastikan akurasi informasi.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Update Berkala</h3>
                  <p className="text-sm text-muted-foreground">
                    Konten diperbarui secara rutin untuk memberikan informasi terkini.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tim Profesional</h3>
                  <p className="text-sm text-muted-foreground">
                    Dikelola oleh tim penulis dan editor berpengalaman di bidangnya.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Kualitas Terbaik</h3>
                  <p className="text-sm text-muted-foreground">
                    Konten dibuat dengan standar jurnalisme digital yang tinggi.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 text-teal-600">Kategori Konten</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">🖥️ Teknologi</h3>
                  <p className="text-sm text-muted-foreground">
                    Berita terkini seputar gadget, software, dan perkembangan teknologi.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">🎮 Gaming</h3>
                  <p className="text-sm text-muted-foreground">
                    Review game, tips gaming, dan berita industri game terbaru.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">💡 Tips & Trik</h3>
                  <p className="text-sm text-muted-foreground">
                    Tutorial dan panduan praktis untuk produktivitas digital.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">🤖 AI Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Eksplorasi tools AI dan bagaimana memanfaatkannya secara optimal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 md:p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-teal-600">Hubungi Kami</h2>
              <p className="text-muted-foreground mb-4">
                Punya pertanyaan, saran, atau ingin berkolaborasi?
              </p>
              <p className="text-muted-foreground">
                📧 Email: contact@newspedia.my.id
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}