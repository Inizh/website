import type { Metadata } from "next";
import { Inter, Noto_Sans_Tamil } from "next/font/google";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tamil",
});

export const metadata: Metadata = {
  title: `${BRAND.nameLatin} | Indie Game Studio`,
  description: `${BRAND.nameLatin} (${BRAND.nameTa}) is an indie game studio based in India. New games coming soon.`,
  icons: {
    icon: BRAND.logoSrc,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`${inter.variable} ${notoTamil.variable} ${inter.className} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
