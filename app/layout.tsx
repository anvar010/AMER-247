import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import MobileBottomNav from "@/components/MobileBottomNav/MobileBottomNav";
import { OG_IMAGE } from "@/lib/ogImage";


// history across the two sites.
const GA_ID = "G-QLXBYED5DJ";

export const metadata: Metadata = {
  metadataBase: new URL("https://amer247.com"),
  title: "Amer Center Dubai – Visa Renewal & Emirates ID | Open 24/7",
  description:
    "Amer247 – Amer center & typing center in Deira, Dubai open 24 hours. Residence visa renewal, new visa, Emirates ID renewal & medical typing. Apply online now.",
  openGraph: {
    title: "Amer Center Dubai – Visa Renewal & Emirates ID | Open 24/7",
    description:
      "Dubai's only 24-hour Amer center. Visa renewal, Emirates ID, medical typing & all GDRFA services online or in Deira, near Abu Baker Al Siddique Metro.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
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
