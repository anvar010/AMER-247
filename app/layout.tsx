import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import MobileBottomNav from "@/components/MobileBottomNav/MobileBottomNav";

export const metadata: Metadata = {
  title: "Amer 24/7 — UAE Visa & Immigration Services",
  description:
    "Amer 24/7 operates 24 hours a day, 7 days a week to make your visa and immigration journey simple, fast and hassle-free.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
          <MobileBottomNav />
        </SmoothScroll>
      </body>
    </html>
  );
}
