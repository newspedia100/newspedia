"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Zap, Landmark, Scale, Users, Video, Loader2 } from "lucide-react";

import { Navbar } from "@/components/newspedia/Navbar";
import { Footer } from "@/components/newspedia/Footer";
import { ReadingProgressBar } from "@/components/newspedia/ReadingProgressBar";
import { ArticleCard } from "@/components/newspedia/ArticleCard";
import { CategoryFilter } from "@/components/newspedia/CategoryFilter";
import { AdSlot } from "@/components/newspedia/AdSlot";
import { PrivacyPolicyModal } from "@/components/newspedia/LegalModals";
import { DisclaimerModal } from "@/components/newspedia/LegalModals";
import { NewsletterModal } from "@/components/newspedia/NewsletterModal";
import { SearchModal } from "@/components/newspedia/SearchModal";

import {
  articles as staticArticles,
  getFeaturedArticles,
  CategoryType,
  Article,
} from "@/lib/data/articles";

interface DatabaseArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
  imageAlt: string | null;
  author: string;
  authorAvatar: string | null;
  readTime: number;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  tags: string | null;
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType | "all">("all");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [dbArticles, setDbArticles] = useState<DatabaseArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from database
  useEffect(() => {
    const fetchDbArticles = async () => {
      try {
        const res = await fetch("/api/articles?limit=50");
        const data = await res.json();
        if (data.articles) {
          setDbArticles(data.articles);
        }
      } catch (error) {
        console.error("Failed to fetch database articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDbArticles();
  }, []);

  // Convert database articles to Article format
  const convertedDbArticles: Article[] = dbArticles.map((dbArticle) => ({
    id: dbArticle.id,
    title: dbArticle.title,
    slug: dbArticle.slug,
    excerpt: dbArticle.excerpt,
    content: dbArticle.content,
    imageUrl: dbArticle.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop",
    imageAlt: dbArticle.imageAlt || dbArticle.title,
    author: dbArticle.author,
    authorAvatar: dbArticle.authorAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=newspedia",
    readTime: dbArticle.readTime,
    views: dbArticle.views,
    isFeatured: dbArticle.isFeatured,
    category: dbArticle.category.slug as CategoryType,
    tags: dbArticle.tags ? dbArticle.tags.split(",").map((t) => t.trim()) : [],
    publishedAt: dbArticle.publishedAt,
  }));

  // Combine static and database articles (database articles first, then static)
  const allArticles: Article[] = [...convertedDbArticles, ...staticArticles];

  const handleSubscribe = (email: string) => {
    setSubscriberEmail(email);
    setShowNewsletter(true);
  };

  const featuredArticles = allArticles.filter((a) => a.isFeatured).slice(0, 4);
  const filteredArticles =
    activeCategory === "all"
      ? allArticles
      : allArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Navbar */}
      <Navbar onOpenSearch={() => setShowSearch(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-orange-50 dark:from-teal-950/20 dark:via-cyan-950/20 dark:to-orange-950/20 py-8 sm:py-12">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-64 h-64 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-72 h-72 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl animate-float-delayed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            />
            <motion.div
              className="absolute top-40 right-1/4 w-48 h-48 bg-cyan-200/30 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Hero Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
                <span className="gradient-text">Portal Berita</span>
                <br />
                <span className="text-foreground">Teknologi, Lifestyle & Berita Terkini</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dapatkan informasi terkini seputar Teknologi, Gaming, Politik, Hukum, dan Sosial.
                Semua yang perlu Anda ketahui dalam satu tempat.
              </p>
            </motion.div>

            {/* Leaderboard Ad */}
            <div className="mb-8">
              <AdSlot position="leaderboard" />
            </div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </motion.div>
          </div>
        </section>

        {/* Featured Articles Section */}
        {activeCategory === "all" && featuredArticles.length > 0 && (
          <section className="py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold font-display">Artikel Pilihan</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="featured"
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest Articles Section */}
        <section className="py-8 sm:py-12 bg-muted/30" id="artikel-terbaru">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                <h2 className="text-2xl font-bold font-display">
                  {activeCategory === "all" ? "Artikel Terbaru" : `Artikel ${activeCategory}`}
                </h2>
              </div>
              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memuat...
                </div>
              )}
            </div>

            {/* In-Article Ad */}
            <div className="mb-8">
              <AdSlot position="in-article" />
            </div>

            {filteredArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredArticles.map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      variant="default"
                      index={index}
                    />
                  ))}
                </div>

                {/* Below Article Ad */}
                <div className="mt-8">
                  <AdSlot position="below-article" />
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-full hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Zap className="w-5 h-5" />
                    Lihat Lebih Banyak
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Tidak ada artikel ditemukan</p>
              </div>
            )}
          </div>
        </section>

        {/* Categories Sections */}
        {activeCategory === "all" && (
          <>
            {/* ==================== TECH & LIFESTYLE ==================== */}
            
            {/* Tech News */}
            <section className="py-8 sm:py-12" id="teknologi">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full" />
                    Teknologi
                  </h2>
                  <button
                    onClick={() => setActiveCategory("teknologi")}
                    className="text-sm text-teal-600 hover:underline"
                  >
                    Lihat Semua →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allArticles
                    .filter((a) => a.category === "teknologi")
                    .slice(0, 4)
                    .map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        index={index}
                      />
                    ))}
                </div>
              </div>
            </section>

            {/* Gaming & AI Tools */}
            <section className="py-8 sm:py-12 bg-muted/30" id="gaming">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Gaming */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold font-display flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full" />
                        Gaming
                      </h2>
                      <button
                        onClick={() => setActiveCategory("gaming")}
                        className="text-sm text-purple-600 hover:underline"
                      >
                        Lihat Semua →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {allArticles
                        .filter((a) => a.category === "gaming")
                        .slice(0, 2)
                        .map((article, index) => (
                          <ArticleCard
                            key={article.id}
                            article={article}
                            variant="horizontal"
                            index={index}
                          />
                        ))}
                    </div>
                  </div>

                  {/* AI Tools */}
                  <div id="ai-tools">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold font-display flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                        AI Tools
                      </h2>
                      <button
                        onClick={() => setActiveCategory("ai-tools")}
                        className="text-sm text-cyan-600 hover:underline"
                      >
                        Lihat Semua →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {allArticles
                        .filter((a) => a.category === "ai-tools")
                        .slice(0, 2)
                        .map((article, index) => (
                          <ArticleCard
                            key={article.id}
                            article={article}
                            variant="horizontal"
                            index={index}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips & Trik */}
            <section className="py-8 sm:py-12" id="tips-trik">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    Tips & Trik
                  </h2>
                  <button
                    onClick={() => setActiveCategory("tips-trik")}
                    className="text-sm text-orange-600 hover:underline"
                  >
                    Lihat Semua →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allArticles
                    .filter((a) => a.category === "tips-trik")
                    .slice(0, 2)
                    .map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        variant="horizontal"
                        index={index}
                      />
                    ))}
                </div>
              </div>
            </section>

            {/* ==================== BERITA SECTION ==================== */}
            
            {/* Breaking News Banner */}
            <section className="py-6 bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                  <span className="bg-white text-red-600 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                    BREAKING
                  </span>
                  <p className="text-white font-medium truncate">
                    Pemilu Legislatif 2026: Quick Count Menunjukkan Persaingan Ketat • MA Tetapkan Putusan UU ITE
                  </p>
                </div>
              </div>
            </section>

            {/* Politik */}
            <section className="py-8 sm:py-12" id="politik">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                    <Landmark className="w-6 h-6 text-red-500" />
                    Politik
                  </h2>
                  <button
                    onClick={() => setActiveCategory("politik")}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Lihat Semua →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allArticles
                    .filter((a) => a.category === "politik")
                    .slice(0, 4)
                    .map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        index={index}
                      />
                    ))}
                </div>
              </div>
            </section>

            {/* Hukum & Sosial */}
            <section className="py-8 sm:py-12 bg-muted/30" id="hukum">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Hukum */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold font-display flex items-center gap-2">
                        <Scale className="w-5 h-5 text-blue-500" />
                        Hukum
                      </h2>
                      <button
                        onClick={() => setActiveCategory("hukum")}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Lihat Semua →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {allArticles
                        .filter((a) => a.category === "hukum")
                        .slice(0, 4)
                        .map((article, index) => (
                          <ArticleCard
                            key={article.id}
                            article={article}
                            variant="horizontal"
                            index={index}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Sosial */}
                  <div id="sosial">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold font-display flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-500" />
                        Sosial
                      </h2>
                      <button
                        onClick={() => setActiveCategory("sosial")}
                        className="text-sm text-green-600 hover:underline"
                      >
                        Lihat Semua →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {allArticles
                        .filter((a) => a.category === "sosial")
                        .slice(0, 4)
                        .map((article, index) => (
                          <ArticleCard
                            key={article.id}
                            article={article}
                            variant="horizontal"
                            index={index}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* News Video */}
            <section className="py-8 sm:py-12" id="news-video">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                    <Video className="w-6 h-6 text-rose-500" />
                    News Video
                  </h2>
                  <button
                    onClick={() => setActiveCategory("news-video")}
                    className="text-sm text-rose-600 hover:underline"
                  >
                    Lihat Semua →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allArticles
                    .filter((a) => a.category === "news-video")
                    .slice(0, 4)
                    .map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        index={index}
                      />
                    ))}
                </div>
              </div>
            </section>

            {/* Ad Banner */}
            <section className="py-8 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AdSlot position="leaderboard" />
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setShowPrivacy(true)}
        onOpenDisclaimer={() => setShowDisclaimer(true)}
        onSubscribe={handleSubscribe}
      />

      {/* Modals */}
      <PrivacyPolicyModal open={showPrivacy} onOpenChange={setShowPrivacy} />
      <DisclaimerModal open={showDisclaimer} onOpenChange={setShowDisclaimer} />
      <NewsletterModal
        open={showNewsletter}
        onOpenChange={setShowNewsletter}
        email={subscriberEmail}
      />
      <SearchModal open={showSearch} onOpenChange={setShowSearch} />
    </div>
  );
}
