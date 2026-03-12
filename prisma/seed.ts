import { db } from "@/lib/db";

const categories = [
  {
    id: "cat-tech",
    name: "Teknologi",
    slug: "teknologi",
    description: "Berita terkini seputar gadget, software, dan inovasi teknologi",
    color: "teal",
    icon: "Cpu",
  },
  {
    id: "cat-gaming",
    name: "Gaming",
    slug: "gaming",
    description: "Review game, tips gaming, dan berita esports",
    color: "purple",
    icon: "Gamepad2",
  },
  {
    id: "cat-tips",
    name: "Tips & Trik",
    slug: "tips-trik",
    description: "Tutorial praktis dan tips produktivitas untuk kehidupan sehari-hari",
    color: "orange",
    icon: "Lightbulb",
  },
  {
    id: "cat-ai",
    name: "AI Tools",
    slug: "ai-tools",
    description: "Review dan tutorial AI tools terbaru untuk produktivitas maksimal",
    color: "cyan",
    icon: "Sparkles",
  },
  {
    id: "cat-politik",
    name: "Politik",
    slug: "politik",
    description: "Berita politik terkini dari dalam dan luar negeri",
    color: "red",
    icon: "Landmark",
  },
  {
    id: "cat-hukum",
    name: "Hukum",
    slug: "hukum",
    description: "Kasus hukum, peraturan baru, dan update legislatif",
    color: "blue",
    icon: "Scale",
  },
  {
    id: "cat-sosial",
    name: "Sosial",
    slug: "sosial",
    description: "Isu sosial, komunitas, dan kehidupan masyarakat",
    color: "green",
    icon: "Users",
  },
  {
    id: "cat-video",
    name: "News Video",
    slug: "news-video",
    description: "Video berita terkini dan dokumenter singkat",
    color: "rose",
    icon: "Video",
  },
];

async function main() {
  console.log("Seeding database...");

  // Create categories
  for (const category of categories) {
    await db.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });
    console.log(`Created category: ${category.name}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
