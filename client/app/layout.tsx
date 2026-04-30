import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://veilverse.adilhusain.xyz"),
  title: "VeilVerse | Redefining Modesty",
  description: "Experience elegance in motion with our premium collection.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "VeilVerse | Redefining Modesty",
    description: "Experience elegance in motion with our premium collection.",
    siteName: "VeilVerse",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "VeilVerse OG Image",
      },
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "VeilVerse OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VeilVerse | Redefining Modesty",
    description: "Experience elegance in motion with our premium collection.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
