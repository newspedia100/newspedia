"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Eye, ArrowRight, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article, formatViews, formatDate, categories } from "@/lib/data/articles";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "horizontal";
  index?: number;
}

const colorMap: Record<string, string> = {
  // Tech & Lifestyle
  teknologi: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  gaming: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "tips-trik": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "ai-tools": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  // News
  politik: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  hukum: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  sosial: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "news-video": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
};

export function ArticleCard({ article, variant = "default", index = 0 }: ArticleCardProps) {
  const category = categories.find((c) => c.id === article.category);
  const categoryColor = colorMap[article.category] || "bg-muted text-muted-foreground";
  const isVideo = article.category === "news-video";

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link href={`/${article.slug}`}>
          <Card className="group overflow-hidden card-hover border-0 shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Video Badge */}
              {isVideo && (
                <div className="absolute top-4 right-4 bg-rose-500 text-white p-2 rounded-full">
                  <Play className="w-5 h-5 fill-white" />
                </div>
              )}
              
              <div className="absolute top-4 left-4">
                <Badge className={categoryColor}>{category?.name}</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-200 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-gray-300 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isVideo ? "Video" : `${article.readTime} menit`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {formatViews(article.views)}
                  </span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  }

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <Link href={`/${article.slug}`}>
          <Card className="group overflow-hidden card-hover flex flex-row border-0 shadow-md">
            <div className="relative w-32 h-24 sm:w-48 sm:h-32 flex-shrink-0 overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              )}
            </div>
            <CardContent className="flex-1 p-3 sm:p-4">
              <Badge className={`text-xs mb-2 ${categoryColor}`}>{category?.name}</Badge>
              <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-teal-600 transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 text-muted-foreground text-xs mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {isVideo ? "Video" : `${article.readTime} min`}
                </span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    );
  }

  // Default card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/${article.slug}`}>
        <Card className="group overflow-hidden card-hover border-0 shadow-md h-full">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                <Play className="w-12 h-12 text-white fill-white" />
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge className={`text-xs ${categoryColor}`}>{category?.name}</Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-base line-clamp-2 group-hover:text-teal-600 transition-colors mb-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{article.excerpt}</p>
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {isVideo ? "Video" : `${article.readTime} min`}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {formatViews(article.views)}
                </span>
              </div>
              <span className="text-teal-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                {isVideo ? "Tonton" : "Baca"} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
