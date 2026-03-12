import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Insert default marquee news
  const defaultMarquee = [
    { text: "Pemilu Legislatif 2026", order: 1 },
    { text: "GTA 6 Resmi Rilis", order: 2 },
    { text: "GPT-5 Terbaru", order: 3 },
  ];

  for (const item of defaultMarquee) {
    await prisma.marqueeNews.create({
      data: {
        text: item.text,
        isActive: true,
        order: item.order,
      },
    });
  }

  console.log("Default marquee news inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
