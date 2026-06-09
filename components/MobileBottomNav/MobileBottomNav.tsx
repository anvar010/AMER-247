"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Plane } from "lucide-react";
import styles from "./MobileBottomNav.module.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className={`${styles.mobileNav} ${outfit.className}`}>
      <Link 
        href="/" 
        className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}
      >
        <Home size={26} strokeWidth={1.5} />
        <span>Home</span>
      </Link>
      
      <Link 
        href="/online-services" 
        className={`${styles.navItem} ${pathname === '/online-services' ? styles.active : ''}`}
      >
        <FileText size={26} strokeWidth={1.5} />
        <span>Apply Online</span>
      </Link>

      <Link 
        href="/services" 
        className={`${styles.navItem} ${pathname === '/services' ? styles.active : ''}`}
      >
        <Plane size={26} strokeWidth={1.5} />
        <span>UAE Tourist Visa</span>
      </Link>
    </nav>
  );
}
