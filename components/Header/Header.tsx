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

  // Whether we've scrolled past this page's "#mobile-header-opaque-start"
  // marker (right after its hero section) — kept in a ref, updated by the
  // IntersectionObserver below, instead of being read via
  // marker.getBoundingClientRect() on every scroll frame. Doing that read on
  // every frame forces a synchronous layout whenever it lands in the same
  // frame as Lenis's own scroll-position tracking (confirmed via Chrome's
  // forced-reflow profiler — this was measurable scroll jank).
  const pastMarkerRef = useRef(false);
  // Not every route renders the marker — pages without one fall back to the
  // plain "y > 40" threshold below, same as before this marker existed.
  const hasMarkerRef = useRef(false);
  useEffect(() => {
    const marker = document.getElementById("mobile-header-opaque-start");
    if (!marker) {
      hasMarkerRef.current = false;
      return;
    }
    hasMarkerRef.current = true;
    pastMarkerRef.current = marker.getBoundingClientRect().top <= 0;

    // Default root (the full viewport, no rootMargin) — a zero-height
    // marker counts as "intersecting" for the entire stretch its position
    // (0 < top < viewport height) falls inside the viewport, so leaving via
    // the top edge (top crossing 0) and re-entering are both ordinary,
    // reliably-fired transitions. An earlier version shrank the observed
    // root to a 0-height line at y=0 to try to catch that crossing more
    // "precisely" — but a 0-height marker crossing a 0-height line is a
    // vanishing window that the browser's async intersection checks mostly
    // never landed on, so the callback almost never fired after the first.
    const observer = new IntersectionObserver(
      ([entry]) => {
        pastMarkerRef.current = entry.boundingClientRect.top <= 0;
        if (!needsOpaqueHeader(pathnameRef.current)) {
          setScrolled(pastMarkerRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const evaluate = () => {
      // A hero's transparent header stays that way for its whole scroll
      // range, but that range ends where the page's own
      // "#mobile-header-opaque-start" marker sits in the DOM (right after
      // the hero section) — reading its real position is exact on every
      // device, unlike a generic scroll-distance guess, which could turn
      // the header opaque mid-hero (visibly overlapping the hero's own
      // heading) or, if tuned too conservatively, leave it transparent too
      // long. This is a distinct marker from "#mobile-home-start" (which
      // Skip/quick-links scroll to on the home page) since that one must
      // stay right where the pinned animation releases, not further down
      // past the greeting section.
      if (needsOpaqueHeader(pathnameRef.current)) {
        // The apply form has a light background with no dark hero to
        // contrast against, so the header needs its solid background from
        // the very top of the page, not just after scrolling.
        setScrolled(true);
      } else if (hasMarkerRef.current) {
        setScrolled(pastMarkerRef.current);
      } else {
        setScrolled(window.scrollY > 40);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { evaluate(); ticking = false; });
        ticking = true;
      }
    };

    // needsOpaqueHeader's desktop-only routes depend on window.innerWidth —
    // without this, resizing the window (e.g. crossing the 769px breakpoint)
    // without also scrolling or navigating left the header stuck in
    // whichever opaque/transparent state it last evaluated at.
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Re-evaluate immediately on every route change — a client-side nav (e.g.
  // tapping the logo from a scrolled /home back to "/") may not fire a
  // native 'scroll' event even though the scroll position resets, which
  // otherwise left the previous page's stale "scrolled" state visible on
  // the new page until the user scrolled again.
  useEffect(() => {
    if (needsOpaqueHeader(pathname)) {
      setScrolled(true);
    } else if (hasMarkerRef.current) {
      setScrolled(pastMarkerRef.current);
    } else {
      setScrolled(window.scrollY > 40);
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
            src={scrolled ? "/logos/amernew-cropped-dark.webp" : "/logos/amernew-cropped.webp"}
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
            <img src="/logos/amernew-cropped-dark.webp" alt="Amer 24/7" className={styles.menuPanelLogo} />
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
