import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Amer 24/7 — UAE Visa & Immigration Services",
  description:
    "Amer 24/7 operates 24 hours a day, 7 days a week to make your visa and immigration journey simple, fast and hassle-free.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
