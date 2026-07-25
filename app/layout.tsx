import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import MobileBottomNav from "@/components/MobileBottomNav/MobileBottomNav";

export const metadata: Metadata = {
  title: "AMER247 - Immigration Services | Dubai Visa Applications/Renewal",
  description:
    "Amer247 is a Semi Government Organization operating 24 hrs, allowing residents to complete all Visa and Residency transactions. Apply Online!",
  openGraph: {
    title: "AMER247 - Immigration Services | Dubai Visa Applications/Renewal",
    description:
      "Amer247 is a Semi Government Organization operating 24 hrs, allowing residents to complete all Visa and Residency transactions. Apply Online!",
  },
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
