import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import MobileBottomNav from "@/components/MobileBottomNav/MobileBottomNav";

// Same GA property as the master project, for continuity of analytics
// history across the two sites.
const GA_ID = "G-QLXBYED5DJ";

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
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
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
