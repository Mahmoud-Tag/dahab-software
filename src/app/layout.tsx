import type { Metadata } from "next";
import "@/styles/globals.css";
import SkipToContent from "@/components/SkipToContent";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  metadataBase: new URL("https://dahabsoftware.com"),
  title: {
    default: "دهب سوفت وير | حلول برمجية احترافية",
    template: "%s | دهب سوفت وير",
  },
  description:
    "دهب سوفت وير - نصمم حلول برمجية احترافية تدعم نمو أعمالك عبر الويب، التطبيقات، والذكاء الاصطناعي.",
  keywords: [
    "دهب سوفت وير",
    "تطوير برمجيات",
    "تطوير مواقع الشركات",
    "تطبيقات الجوال",
    "الذكاء الاصطناعي",
    "أنظمة ERP",
    "حوكمة رقمية",
    "حلول سحابية",
    "SEO",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,

      'max-video-preview': 'large',
    },
  },
  applicationName: "دهب سوفت وير",
  authors: [{ name: "دهب سوفت وير" }],
  creator: "دهب سوفت وير",
  publisher: "دهب سوفت وير",
  category: "Software Development",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",

  alternates: {
    canonical: "https://dahabsoftware.com/",
    languages: {
      ar: "https://dahabsoftware.com/",
    },
  },

  themeColor: "#0f172a",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "any" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    type: "website",
    url: "https://dahabsoftware.com/",
    title: "دهب سوفت وير | حلول برمجية احترافية",
    description:
      "شريك تقني موثوق لبناء مواقع الشركات، الأنظمة الإدارية، وتطبيقات الذكاء الاصطناعي.",
    siteName: "دهب سوفت وير",
    locale: "ar_AR",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "دهب سوفت وير - شعار الشركة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "دهب سوفت وير | حلول برمجية احترافية",
    description: "نحوّل الأفكار إلى منتجات رقمية قوية ومؤثرة.",
    images: ["/logo.png"],
    creator: "@dahabsoftware",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        <SkipToContent />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
