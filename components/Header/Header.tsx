"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home, FileText, Plane } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hideMobileBar, setHideMobileBar] = useState(false);
  const pathname = usePathname();

  // On the home page the hero is a long sticky-scroll runway, so the header
  // should stay transparent until the user has fully scrolled past it.
  const isHome = pathname === "/";

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const threshold = isHome ? window.innerHeight * 1.3 : 40;
      setScrolled(y > threshold);

      // Hide bottom bar on scroll down, show on scroll up / at top.
      const delta = y - lastY;
      if (y < 60) {
        setHideMobileBar(false);
      } else if (delta > 4) {
        setHideMobileBar(true);
      } else if (delta < -4) {
        setHideMobileBar(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const nav = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Price", href: "/pricing-list" },
    { label: "News", href: "/news" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logos}>
          <img src="/logos/amer.webp" alt="Amer 24/7" className={styles.logoImg} />
        </Link>

        <nav className={styles.nav}>
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`${styles.navLink} ${isActive(n.href) ? styles.active : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/tourist-visa" className={styles.btnPrimary}>
            UAE TOURIST VISA
          </Link>
          <Link href="/online-services" className={styles.btnPrimary}>
            APPLY ONLINE
          </Link>
          <img
            src="/logos/Tasheel-tawjeeh.webp"
            alt="Tasheel & Tawjeeh"
            className={styles.partnerLogo}
          />
          <button className={styles.menu} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile bottom navigation — visible only on small screens */}
      <nav
        className={`${styles.mobileBar} ${hideMobileBar ? styles.mobileBarHidden : ""}`}
        aria-label="Quick actions"
      >
        <Link
          href="/"
          className={`${styles.mobileItem} ${isActive("/") ? styles.mobileItemActive : ""}`}
          aria-current={isActive("/") ? "page" : undefined}
        >
          <Home size={20} strokeWidth={1.8} />
          <span>Home</span>
        </Link>
        <Link
          href="/online-services"
          className={`${styles.mobileItem} ${isActive("/online-services") ? styles.mobileItemActive : ""}`}
          aria-current={isActive("/online-services") ? "page" : undefined}
        >
          <FileText size={20} strokeWidth={1.8} />
          <span>Apply Online</span>
        </Link>
        <Link
          href="/tourist-visa"
          className={`${styles.mobileItem} ${isActive("/tourist-visa") ? styles.mobileItemActive : ""}`}
          aria-current={isActive("/tourist-visa") ? "page" : undefined}
        >
          <Plane size={20} strokeWidth={1.8} />
          <span>UAE Tourist Visa</span>
        </Link>
      </nav>
    </header>
  );
}
