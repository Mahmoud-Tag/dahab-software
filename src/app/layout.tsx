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
  alternates: { canonical: "/" },
  openGraph: {
    title: "دهب سوفت وير | حلول برمجية احترافية",
    description:
      "شريك تقني موثوق لبناء مواقع الشركات، الأنظمة الإدارية، وتطبيقات الذكاء الاصطناعي.",
    url: "https://dahabsoftware.com",
    siteName: "دهب سوفت وير",
    locale: "ar_AR",
    type: "website",
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
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicon/site.webmanifest",
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
