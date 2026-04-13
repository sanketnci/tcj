import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/providers/MotionProvider";
import "./globals.css";

const oldLondon = localFont({
  src: "../fonts/OldLondon.ttf",
  variable: "--font-old-london",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Car Journal | Premium Automotive Reviews & News",
  description: "Your destination for expert automotive reviews, industry news, and automotive photography. Experience the thrill of driving through our editorial lens.",
  keywords: ["car reviews", "automotive news", "luxury cars", "car photography", "road tests"],
  authors: [{ name: "The Car Journal" }],
  openGraph: {
    title: "The Car Journal | Premium Automotive Reviews",
    description: "Expert automotive reviews and industry news",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${oldLondon.variable} ${cormorant.variable} ${manrope.variable} ${jetbrains.variable} min-h-screen flex flex-col`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
