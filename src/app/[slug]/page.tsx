"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Clock,
  Eye,
  Calendar,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Navbar } from "@/components/newspedia/Navbar";
import { Footer } from "@/components/newspedia/Footer";
import { ReadingProgressBar } from "@/components/newspedia/ReadingProgressBar";
import { ArticleCard } from "@/components/newspedia/ArticleCard";
import { AdSlot, BelowPostTitleAd, MatchedContentAd, NativeAd, AnchorAd } from "@/components/newspedia/AdSlot";
import { PrivacyPolicyModal } from "@/components/newspedia/LegalModals";
import { DisclaimerModal } from "@/components/newspedia/LegalModals";
import { NewsletterModal } from "@/components/newspedia/NewsletterModal";
import { SearchModal } from "@/components/newspedia/SearchModal";

import {
  getArticleBySlug,
  getRelatedArticles,
  formatViews,
  formatDate,
  categories,
  Article,
  CategoryType,
} from "@/lib/data/articles";

const colorMap: Record<string, string> = {
  teknologi: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  gaming: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "tips-trik": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "ai-tools": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  politik: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  hukum: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  sosial: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "news-video": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
};

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

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [dbArticle, setDbArticle] = useState<DatabaseArticle | null>(null);
  const [fetchComplete, setFetchComplete] = useState(false);

  // Try to get article from static data first
  const staticArticle = getArticleBySlug(slug);
  
  // Compute loading state: if we have static article, no loading needed
  // Otherwise, show loading until fetch is complete
  const isLoading = !staticArticle && !fetchComplete;
  
  // Fetch from database if not found in static data
  useEffect(() => {
    // If we have static article, no need to fetch
    if (staticArticle) {
      return;
    }

    let isMounted = true;
    
    // Fetch from API
    fetch(`/api/articles/slug/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted && data) {
          setDbArticle(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch article:", error);
      })
      .finally(() => {
        if (isMounted) {
          setFetchComplete(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug, staticArticle]);

  // Convert database article to Article format
  const article: Article | null = staticArticle || (dbArticle ? {
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
  } : null);

  const relatedArticles = article ? getRelatedArticles(article) : [];
  const category = article ? categories.find((c) => c.id === article.category) : null;

  const handleSubscribe = (email: string) => {
    setSubscriberEmail(email);
    setShowNewsletter(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "";
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat artikel...</p>
          </div>
        </main>
        <Footer
          onOpenPrivacy={() => setShowPrivacy(true)}
          onOpenDisclaimer={() => setShowDisclaimer(true)}
          onSubscribe={handleSubscribe}
        />
      </div>
    );
  }

  // Not found state - only show if fetch is complete and no article found
  if (fetchComplete && !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">
              Maaf, artikel yang Anda cari tidak tersedia.
            </p>
            <Link href="/">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </main>
        <Footer
          onOpenPrivacy={() => setShowPrivacy(true)}
          onOpenDisclaimer={() => setShowDisclaimer(true)}
          onSubscribe={handleSubscribe}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ReadingProgressBar />
      <Navbar onOpenSearch={() => setShowSearch(true)} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-teal-600 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/#${category?.slug}`}
                className="hover:text-teal-600 transition-colors"
              >
                {category?.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground line-clamp-1">{article.title}</span>
            </nav>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Badge className={`mb-4 ${colorMap[article.category] || "bg-gray-100 text-gray-800"}`}>
              {category?.name || article.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {/* Author */}
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={article.authorAvatar} alt={article.author} />
                  <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{article.author}</p>
                  <p className="text-xs">Penulis</p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-8 hidden sm:block" />

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} menit baca
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {formatViews(article.views)} views
                </span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-sm font-medium">Bagikan:</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare("facebook")}
                className="hover:bg-blue-100 hover:text-blue-600"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare("twitter")}
                className="hover:bg-sky-100 hover:text-sky-600"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare("linkedin")}
                className="hover:bg-blue-100 hover:text-blue-700"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="hover:bg-teal-100 hover:text-teal-600"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </motion.header>

          {/* Below Post Title Ad */}
          <BelowPostTitleAd className="mb-8" />

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-muted"
          >
            <Image
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Ad Slot - Leaderboard */}
          <div className="mb-8">
            <AdSlot position="leaderboard" />
          </div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* In-Article Ad */}
          <div className="my-8">
            <AdSlot position="in-article" />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="hover:bg-teal-100 hover:text-teal-800 cursor-pointer transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Ad Slot - Below Article */}
          <div className="my-8">
            <AdSlot position="below-article" />
          </div>

          {/* Native Ad */}
          <NativeAd className="mb-8" />

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-muted/50 rounded-xl p-6 mt-8"
          >
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={article.authorAvatar} alt={article.author} />
                <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{article.author}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Penulis di NewsPedia
                </p>
                <p className="text-sm text-muted-foreground">
                  Menulis tentang teknologi, gadget, dan tren digital terkini.
                  Menghadirkan informasi yang akurat dan mudah dipahami.
                </p>
              </div>
            </div>
          </motion.div>
        </article>

        {/* Matched Content Ad (looks like article recommendations) */}
        <section className="bg-muted/30 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MatchedContentAd />
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-muted/30 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold font-display mb-6">
                Artikel Terkait
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle, index) => (
                  <ArticleCard
                    key={relatedArticle.id}
                    article={relatedArticle}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

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

      {/* Anchor/Sticky Ad */}
      <AnchorAd />
    </div>
  );
}
