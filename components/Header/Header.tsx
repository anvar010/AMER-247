"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home, FileText, Plane } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hideMobileBar, setHideMobileBar] = useState(false);
  const pathname = usePathname();
  const isSplash = pathname === "/";

  // The scroll listener below is only ever set up once (mount), so it must
  // read the CURRENT pathname via a ref rather than closing over the value
  // from whatever page was active on mount — otherwise navigating (e.g. the
  // logo back to "/") keeps using stale route logic (wrong scroll threshold),
  // which is what caused the splash header to sometimes render opaque.
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const evaluate = () => {
      const y = window.scrollY;

      // On mobile homepage, keep header transparent until scrolling past the 400vh pinned video
      const isMobile = window.innerWidth <= 768;
      const isHome = pathnameRef.current === "/";
      const threshold = (isHome && isMobile) ? window.innerHeight * 4.2 : 40;

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

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { evaluate(); ticking = false; });
        ticking = true;
      }
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-evaluate immediately on every route change — a client-side nav (e.g.
  // tapping the logo from a scrolled /home back to "/") may not fire a
  // native 'scroll' event even though the scroll position resets, which
  // otherwise left the previous page's stale "scrolled" state visible on
  // the new page until the user scrolled again.
  useEffect(() => {
    const y = window.scrollY;
    const isMobile = window.innerWidth <= 768;
    const isHome = pathname === "/";
    const threshold = (isHome && isMobile) ? window.innerHeight * 4.2 : 40;
    setScrolled(y > threshold);
  }, [pathname]);

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

  // The Apply form has its own full top bar (close button, title, back to
  // Services) — a second persistent header on top of it was pure redundancy.
  if (pathname === "/apply") return null;

  return (
    <header className={`${styles.header} ${scrolled ? (isSplash ? styles.scrolled : styles.scrolledLight) : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logos}>
          <img
            id="global-header-logo"
            src={scrolled ? "/logos/amernew-cropped-dark.png" : "/logos/amernew-cropped.png"}
            alt="Amer 24/7"
            className={styles.logoImg}
          />
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
