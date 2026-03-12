"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Gamepad2, 
  Lightbulb, 
  Sparkles,
  Landmark,
  Scale,
  Users,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/lib/data/articles";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu: Cpu,
  Gamepad2: Gamepad2,
  Lightbulb: Lightbulb,
  Sparkles: Sparkles,
  Landmark: Landmark,
  Scale: Scale,
  Users: Users,
  Video: Video,
};

// All categories for the filter
const allCategories = [
  { id: "all" as const, name: "Semua", icon: null },
  { id: "teknologi" as CategoryType, name: "Teknologi", icon: "Cpu" },
  { id: "gaming" as CategoryType, name: "Gaming", icon: "Gamepad2" },
  { id: "tips-trik" as CategoryType, name: "Tips & Trik", icon: "Lightbulb" },
  { id: "ai-tools" as CategoryType, name: "AI Tools", icon: "Sparkles" },
  { id: "politik" as CategoryType, name: "Politik", icon: "Landmark" },
  { id: "hukum" as CategoryType, name: "Hukum", icon: "Scale" },
  { id: "sosial" as CategoryType, name: "Sosial", icon: "Users" },
  { id: "news-video" as CategoryType, name: "News Video", icon: "Video" },
];

interface CategoryFilterProps {
  activeCategory: CategoryType | "all";
  onCategoryChange: (category: CategoryType | "all") => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {allCategories.map((category, index) => {
        const IconComponent = category.icon ? iconMap[category.icon] : null;
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + index * 0.03 }}
          >
            <Button
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              size="sm"
              className={`rounded-full px-3 sm:px-4 gap-1.5 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
                  : "hover:bg-teal-50 dark:hover:bg-teal-900/20"
              }`}
            >
              {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(' ')[0]}</span>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
