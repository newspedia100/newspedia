"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { articles, formatViews } from "@/lib/data/articles";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const trendingSearches = [
  "iPhone 16 Pro",
  "GTA 6",
  "AI Tools Gratis",
  "Tips Baterai Android",
  "ChatGPT vs Claude",
];

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.length >= 2) {
      return articles
        .filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5);
    }
    return [];
  }, [query]);

  const handleSelect = () => {
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Cari Artikel</DialogTitle>
        </DialogHeader>
        <div className="relative border-b border-border">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari artikel, topik, atau tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 pl-12 pr-4 py-6 text-lg"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        <ScrollArea className="max-h-[60vh]">
          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-2"
              >
                <div className="text-xs text-muted-foreground px-3 py-2">
                  {results.length} hasil ditemukan
                </div>
                {results.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${article.slug}`}
                    onClick={handleSelect}
                    className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={article.imageUrl}
                        alt={article.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium line-clamp-2 text-sm">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime} min
                        </span>
                        <span>•</span>
                        <span>{formatViews(article.views)} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            ) : query.length >= 2 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 text-center"
              >
                <p className="text-muted-foreground">
                  Tidak ada hasil untuk "{query}"
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="trending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Pencarian Populer</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
