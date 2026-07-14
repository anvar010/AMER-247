"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, MousePointerClick, User, Headset } from "lucide-react";
import styles from "./MobileBottomNav.module.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function MobileBottomNav() {
  const pathname = usePathname();
  // The splash screen ("/") and pushed sub-flow screens (login, apply) are
  // their own full-screen views in the app — no tab bar underneath them,
  // only on the 5 main tabs.
  const showNav = pathname !== "/" && pathname !== "/login" && pathname !== "/apply";

  useEffect(() => {
    document.body.classList.toggle("has-bottom-nav", showNav);
    return () => document.body.classList.remove("has-bottom-nav");
  }, [showNav]);

  if (!showNav) return null;

  const isActive = (href: string) =>
    href === "/home" ? pathname === "/home" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className={`${styles.mobileNav} ${outfit.className}`}>
      <Link href="/home" className={`${styles.navItem} ${isActive("/home") ? styles.active : ""}`}>
        <Home size={22} strokeWidth={isActive("/home") ? 2.2 : 1.9} />
        <span>Home</span>
      </Link>

      <Link href="/services" className={`${styles.navItem} ${isActive("/services") ? styles.active : ""}`}>
        <Compass size={22} strokeWidth={isActive("/services") ? 2.2 : 1.9} />
        <span>Services</span>
      </Link>

      <Link href="/services" className={styles.applyOuter} aria-label="Apply Online">
        <MousePointerClick size={24} />
      </Link>

      <Link href="/account" className={`${styles.navItem} ${isActive("/account") ? styles.active : ""}`}>
        <User size={22} strokeWidth={isActive("/account") ? 2.2 : 1.9} />
        <span>Account</span>
      </Link>

      <Link href="/contact" className={styles.navItem}>
        <Headset size={22} strokeWidth={1.9} />
        <span>Support</span>
      </Link>
    </nav>
  );
}
