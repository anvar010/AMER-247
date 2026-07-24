"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, Home, FileText, Plane, Info, Grid3x3, Tag,
  Newspaper, Briefcase, Phone, User, BookOpen
} from "lucide-react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/useBodyScrollLock";
import { needsOpaqueHeader, needsOpaqueHeaderStatic } from "@/lib/headerRoutes";
import styles from "./Header.module.css";

const menuItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Services", href: "/amer247-services", icon: Grid3x3 },
  { label: "UAE Tourist Visa", href: "/uae-tourist-visa", icon: Plane },
  { label: "Pricing", href: "/pricing-list", icon: Tag },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Blogs", href: "/blogs", icon: BookOpen },
  { label: "Online Services", href: "/online-services", icon: FileText },
  { label: "Career", href: "/career", icon: Briefcase },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function Header() {
  const pathname = usePathname();
  // Starts opaque immediately (no transparent flash on first paint) on
  // routes with no dark hero to justify a transparent header.
  const [scrolled, setScrolled] = useState(() => needsOpaqueHeaderStatic(pathname));
  const [menuOpen, setMenuOpen] = useState(false);
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
    let ticking = false;

    const evaluate = () => {
      const y = window.scrollY;

      // The splash stays transparent for its whole scroll range, but that
      // range ends where the "#mobile-header-opaque-start" marker sits in
      // the DOM (right after MobileHomeHero's own dark hero image, on both
      // mobile and desktop — hidden on desktop so it contributes no height
      // there, same effective position as before) — reading its real
      // position is exact on every device, unlike the previous viewport
      // -height guess, which could fall short (opaque header mid-animation)
      // or, if forced to never trigger, leave the header transparent for the
      // rest of the page too. This is a distinct marker from
      // "#mobile-home-start" (which Skip/quick-links scroll to) since that
      // one must stay right where the pinned animation releases, not
      // further down past the greeting section.
      const isHome = pathnameRef.current === "/";
      if (needsOpaqueHeader(pathnameRef.current)) {
        // The apply form has a light background with no dark hero to
        // contrast against, so the header needs its solid background from
        // the very top of the page, not just after scrolling.
        setScrolled(true);
      } else if (isHome) {
        const marker = document.getElementById("mobile-header-opaque-start");
        setScrolled(marker ? marker.getBoundingClientRect().top <= 0 : y > 40);
      } else {
        setScrolled(y > 40);
      }
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
    const isHome = pathname === "/";
    if (needsOpaqueHeader(pathname)) {
      setScrolled(true);
    } else if (isHome) {
      const marker = document.getElementById("mobile-header-opaque-start");
      setScrolled(marker ? marker.getBoundingClientRect().top <= 0 : y > 40);
    } else {
      setScrolled(y > 40);
    }
  }, [pathname]);

  // Close the menu on route change and always release the scroll lock on
  // unmount, in case navigation ever happens without the link's own onClick.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const menuLockedRef = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      if (!menuLockedRef.current) { lockBodyScroll(); menuLockedRef.current = true; }
    } else if (menuLockedRef.current) {
      unlockBodyScroll();
      menuLockedRef.current = false;
    }
  }, [menuOpen]);
  useEffect(() => () => {
    if (menuLockedRef.current) { unlockBodyScroll(); menuLockedRef.current = false; }
  }, []);

  const nav = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/amer247-services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Price", href: "/pricing-list" },
    { label: "News", href: "/news" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

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
          <Link href="/uae-tourist-visa" className={styles.btnPrimary}>
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
          {/* No accounts page yet - button disabled for now.
          <button onClick={() => alert("This feature will be available soon")} className={styles.accountBtn} aria-label="Account">
            <User size={19} />
          </button>
          */}
          <button
            className={styles.menu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`${styles.menuOverlay} ${menuOpen ? styles.menuOverlayOn : ""}`} onClick={() => setMenuOpen(false)}>
        <nav
          className={`${styles.menuPanel} ${menuOpen ? styles.menuPanelOn : ""}`}
          onClick={(e) => e.stopPropagation()}
          aria-label="Main menu"
        >
          <div className={styles.menuPanelHead}>
            <img src="/logos/amernew-cropped-dark.png" alt="Amer 24/7" className={styles.menuPanelLogo} />
            <button className={styles.menuClose} onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          <ul className={styles.menuList}>
            {menuItems.map((m) => (
              <li key={m.label}>
                <Link
                  href={m.href}
                  aria-current={isActive(m.href) ? "page" : undefined}
                  className={`${styles.menuLink} ${isActive(m.href) ? styles.menuLinkActive : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <m.icon size={19} className={styles.menuLinkIcon} />
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
