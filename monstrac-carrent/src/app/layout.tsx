import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SimpleHeader } from "@/components/layout/simple-header";
import { SimpleFooter } from "@/components/layout/simple-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Monstrac CarRent - Premium Car Rental Service",
  description: "Experience premium car rentals with our world-class fleet. From economy to luxury, we provide safe, reliable, and affordable transportation solutions.",
  keywords: "car rental, luxury cars, economy cars, vehicle rental, transportation, travel",
  authors: [{ name: "Monstrac CarRent" }],
  creator: "Monstrac CarRent",
  publisher: "Monstrac CarRent",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://monstraccarrent.com",
    title: "Monstrac CarRent - Premium Car Rental Service",
    description: "Experience premium car rentals with our world-class fleet. From economy to luxury, we provide safe, reliable, and affordable transportation solutions.",
    siteName: "Monstrac CarRent",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monstrac CarRent - Premium Car Rental Service",
    description: "Experience premium car rentals with our world-class fleet. From economy to luxury, we provide safe, reliable, and affordable transportation solutions.",
    creator: "@monstraccarrent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${montserrat.variable} antialiased min-h-screen bg-black text-white`}>
        <SimpleHeader />
        <main className="pt-16">
          {children}
        </main>
        <SimpleFooter />
      </body>
    </html>
  );
}