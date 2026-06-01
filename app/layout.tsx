import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wriggle — A place for people who love books",
  description:
    "Wriggle is a free app where book lovers connect. Get personal recommendations, chat with other readers, and build book clubs with your friends.",
  keywords: ["book discovery", "reading app", "book clubs", "book lovers", "wriggle"],
  openGraph: {
    title: "Wriggle — A place for people who love books",
    description: "Personal recommendations, reader chat, and book clubs. Completely free.",
    siteName: "Wriggle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wriggle — A place for people who love books",
    description: "A free app where book lovers connect.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream text-warm-text" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
