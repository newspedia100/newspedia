"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface MarqueeItem {
  id: string;
  text: string;
  link: string | null;
  isActive: boolean;
  order: number;
}

// Default fallback items when no items from database
const defaultItems: MarqueeItem[] = [
  { id: "1", text: "Pemilu Legislatif 2026", link: null, isActive: true, order: 1 },
  { id: "2", text: "GTA 6 Resmi Rilis", link: null, isActive: true, order: 2 },
  { id: "3", text: "GPT-5 Terbaru", link: null, isActive: true, order: 3 },
];

export function NewsMarquee() {
  const [items, setItems] = useState<MarqueeItem[]>(defaultItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use a flag to track if component is still mounted
    let isMounted = true;
    
    const fetchMarqueeNews = async () => {
      try {
        const res = await fetch("/api/marquee?active=true");
        const data = await res.json();
        if (isMounted && data.marqueeNews && data.marqueeNews.length > 0) {
          setItems(data.marqueeNews);
        }
      } catch (error) {
        console.error("Failed to fetch marquee news:", error);
      }
    };
    
    // Set mounted after initial render (prevents hydration mismatch)
    // Using requestAnimationFrame to defer setState outside effect body
    requestAnimationFrame(() => {
      if (isMounted) {
        setMounted(true);
      }
    });
    
    fetchMarqueeNews();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Create duplicated content for seamless loop
  const displayItems = [...items, ...items];

  return (
    <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 text-white py-1.5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Label */}
        <div className="flex items-center gap-2 flex-shrink-0 pr-4">
          <span className="bg-white text-teal-600 px-3 py-0.5 rounded-full text-xs font-bold">
            INFO
          </span>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative">
          <div 
            className={`flex gap-8 whitespace-nowrap ${mounted ? 'marquee-animate' : ''}`}
          >
            {displayItems.map((item, index) => (
              <span 
                key={`${item.id}-${index}`} 
                className="flex-shrink-0 text-sm font-medium flex items-center gap-2"
              >
                {item.link ? (
                  <Link
                    href={item.link}
                    className="hover:text-orange-300 transition-colors"
                  >
                    {item.text}
                  </Link>
                ) : (
                  item.text
                )}
                <span className="text-white/60">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
