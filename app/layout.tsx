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
  title: "Wriggle — Discover Books You'll Actually Love",
  description:
    "Wriggle is the free book discovery app. Swipe through personalised picks, join reading clubs with friends, and buy with one tap. No subscription. No ads.",
  keywords: ["book discovery", "reading app", "book clubs", "free books", "kindle", "wriggle"],
  openGraph: {
    title: "Wriggle — Discover Books You'll Actually Love",
    description: "Swipe through personalised book picks, join reading clubs, and buy with one tap. Completely free.",
    siteName: "Wriggle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wriggle — Discover Books You'll Actually Love",
    description: "The free book discovery app. Swipe. Save. Read.",
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
