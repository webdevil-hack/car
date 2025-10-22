import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import TopNav from "@/components/nav/TopNav";
import { Footer } from "@/components/nav/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Monstrac CarRent",
  description: "Dark-theme, animated car rentals portal",
  metadataBase: new URL("https://monstrac.local")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TopNav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
