import type { Metadata } from "next";
import { Urbanist, Syne } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import TranslationProvider from "@/components/TranslationProvider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chrona E-Commerce",
  description: "Premium full-stack e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TranslationProvider>
          <TopBar />
          <Header />
          <CategoryNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
