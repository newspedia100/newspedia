import { Metadata } from "next";
import ArticleContent from "./ArticleContent";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to fetch article from API
  let article = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://newspedia.my.id"}/api/articles/slug/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      article = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch article for metadata:", error);
  }

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan - NewsPedia",
      description: "Maaf, artikel yang Anda cari tidak tersedia.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://newspedia.my.id";
  const articleUrl = `${siteUrl}/${article.slug}`;
  const imageUrl = article.imageUrl || `${siteUrl}/og-default.png`;

  return {
    title: `${article.title} - NewsPedia`,
    description: article.excerpt,
    keywords: article.tags?.split(",").map((t: string) => t.trim()) || [],
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      url: articleUrl,
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: [article.author],
      siteName: "NewsPedia",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newspedia",
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  return <ArticleContent slug={slug} />;
}
