import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NewsPedia - Portal Berita Terkini & Terpercaya",
  description: "NewsPedia menyajikan berita terkini seputar Teknologi, Gaming, Tips & Trik, dan AI Tools. Dapatkan informasi akurat dan insight berkualitas untuk memaksimalkan produktivitas Anda.",
  keywords: ["NewsPedia", "Berita Teknologi", "Gaming News", "Tips dan Trik", "AI Tools", "Tutorial", "Review Gadget", "Software"],
  authors: [{ name: "NewsPedia Team" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "NewsPedia - Portal Berita Terkini",
    description: "Berita terkini seputar Teknologi, Gaming, Tips & Trik, dan AI Tools",
    url: "https://newspedia.com",
    siteName: "NewsPedia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewsPedia - Portal Berita Terkini",
    description: "Berita terkini seputar Teknologi, Gaming, Tips & Trik, dan AI Tools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8920157708840209"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${plusJakarta.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
