"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, MousePointerClick, Plane, Headset } from "lucide-react";
import styles from "./MobileBottomNav.module.css";
import { Outfit } from "next/font/google";
import { isApplyFormRoute } from "@/lib/applyLink";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function MobileBottomNav() {
  const pathname = usePathname();
  const isSplash = pathname === "/";

  // On "/", the splash's pinned scroll animation takes over the full screen
  // first — the tab bar only appears once scrolled past it into the merged
  // home content below (#mobile-home-start). Everywhere else it's just
  // hidden on the sub-flow screens (login/apply), same as before.
  const [pastSplash, setPastSplash] = useState(false);
  const showNav = isSplash ? pastSplash : pathname !== "/login" && !isApplyFormRoute(pathname);

  useEffect(() => {
    if (!isSplash) {
      setPastSplash(false);
      return;
    }
    let ticking = false;
    const evaluate = () => {
      const marker = document.getElementById("mobile-home-start");
      if (!marker) return;
      const markerTop = marker.getBoundingClientRect().top + window.scrollY;
      setPastSplash(window.scrollY >= markerTop);
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { evaluate(); ticking = false; });
        ticking = true;
      }
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSplash]);

  useEffect(() => {
    document.body.classList.toggle("has-bottom-nav", showNav);
    return () => document.body.classList.remove("has-bottom-nav");
  }, [showNav]);

  if (!showNav) return null;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className={`${styles.mobileNav} ${outfit.className}`}>
      <Link href="/" className={`${styles.navItem} ${isActive("/") ? styles.active : ""}`}>
        <Home size={22} strokeWidth={isActive("/") ? 2.2 : 1.9} />
        <span>Home</span>
      </Link>

      <Link href="/amer247-services" className={`${styles.navItem} ${isActive("/amer247-services") ? styles.active : ""}`}>
        <Compass size={22} strokeWidth={isActive("/amer247-services") ? 2.2 : 1.9} />
        <span>Services</span>
      </Link>

      <Link href="/online-services" className={styles.applyItem} aria-label="Apply Online">
        <span className={styles.applyOuter}>
          <MousePointerClick size={24} />
        </span>
        <span className={styles.applyLabel}>Apply Online</span>
      </Link>

      <Link href="/uae-tourist-visa" className={`${styles.navItem} ${isActive("/uae-tourist-visa") ? styles.active : ""}`}>
        <Plane size={22} strokeWidth={isActive("/uae-tourist-visa") ? 2.2 : 1.9} />
        <span>Tourist Visa</span>
      </Link>

      <Link href="/contact" className={styles.navItem}>
        <Headset size={22} strokeWidth={1.9} />
        <span>Support</span>
      </Link>
    </nav>
  );
}
