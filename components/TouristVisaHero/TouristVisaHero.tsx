"use client";

import { Plane, Clock, ShieldCheck, Zap, ArrowDown, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { PRICES } from "@/lib/prices";
import styles from "./TouristVisaHero.module.css";

// Desktop-only hero for /uae-tourist-visa (hidden below 769px — mobile keeps
// MobileHubScreen's own hero). Travel-editorial take on the site's premium
// white/red language: left editorial column, right a CSS-built "boarding
// pass" ticket standing in for the usual hero imagery.
const DURATIONS = ["96 Hours", "14 Days", "30 Days", "60 Days", "90 Days"];

// The illustrative "boarding pass" card below represents the 30 Days
// (Popular) item — pulling its price from lib/prices.ts instead of a second
// hardcoded value keeps this in sync if that price ever changes.
const TICKET_PRICE = PRICES["30_days_tourist_visa_popular"]?.single ?? "650.00 AED";

export default function TouristVisaHero({
  title,
  blurb,
}: {
  title: string;
  blurb: string;
}) {
  const scrollToVisaList = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    const target = document.getElementById("tourist-visa-list");
    if (lenis) lenis.scrollTo("#tourist-visa-list", { duration: 1.4 });
    else target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <span className={styles.dots} aria-hidden />
      <span className={styles.blob} aria-hidden />

      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>
            <Plane size={13} />
            UAE Tourist Visa
          </span>

          <h1 className={styles.title}>{title}</h1>
          <span className={styles.accentBar} aria-hidden />
          <p className={styles.blurb}>{blurb}</p>

          <div className={styles.durations} aria-label="Available visa durations">
            {DURATIONS.map((d) => (
              <span key={d} className={styles.durationChip}>{d}</span>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <a href="#tourist-visa-list" className={styles.ctaPrimary} onClick={scrollToVisaList}>
              Browse Visas <ArrowDown size={15} />
            </a>
            <span className={styles.heroContactIcons}>
              <a href="https://wa.me/971547800500" className={styles.heroContactPill} aria-label="Chat on WhatsApp">
                <WhatsAppIcon size={17} />
                +971 54 780 0500
              </a>
              <a href="tel:+971527276699" className={styles.heroContactPill} aria-label="Call us">
                <Phone size={17} />
                +971 52 727 6699
              </a>
            </span>
            <div className={styles.trustRow}>
              <span className={styles.trustItem}><Clock size={14} /> 24/7 Support</span>
              <span className={styles.trustDot} aria-hidden />
              <span className={styles.trustItem}><Zap size={14} /> Fast Confirmation</span>
              <span className={styles.trustDot} aria-hidden />
              <span className={styles.trustItem}><ShieldCheck size={14} /> Govt. Backed</span>
            </div>
          </div>
        </div>

        {/* Boarding-pass ticket — pure CSS, no imagery */}
        <div className={styles.right} aria-hidden>
          <div className={styles.ticket}>
            <div className={styles.ticketTop}>
              <div className={styles.ticketBrand}>
                <span className={styles.ticketBrandName}>AMER 24/7</span>
                <span className={styles.ticketBrandSub}>UAE e-Visa</span>
              </div>
              <span className={styles.ticketClass}>VISIT VISA</span>
            </div>

            <div className={styles.route}>
              <div className={styles.routeEnd}>
                <span className={styles.routeCode}>YOU</span>
                <span className={styles.routeCity}>Anywhere</span>
              </div>
              <div className={styles.routeLine}>
                <span className={styles.routePlane}><Plane size={17} /></span>
              </div>
              <div className={styles.routeEnd}>
                <span className={styles.routeCode}>UAE</span>
                <span className={styles.routeCity}>All Emirates</span>
              </div>
            </div>

            <div className={styles.perforation} />

            <div className={styles.ticketFields}>
              <div className={styles.ticketField}>
                <span className={styles.fieldLabel}>Visa</span>
                <span className={styles.fieldValue}>30 Days</span>
              </div>
              <div className={styles.ticketField}>
                <span className={styles.fieldLabel}>Entry</span>
                <span className={styles.fieldValue}>Single</span>
              </div>
              <div className={styles.ticketField}>
                <span className={styles.fieldLabel}>Processing</span>
                <span className={styles.fieldValue}>2–4 Days</span>
              </div>
              <div className={styles.ticketField}>
                <span className={styles.fieldLabel}>From</span>
                <span className={`${styles.fieldValue} ${styles.fieldPrice}`}>{TICKET_PRICE}</span>
              </div>
            </div>

            <div className={styles.barcode} />
          </div>

          <span className={styles.stamp}>
            <span className={styles.stampInner}>
              Approved
              <em>Amer 24/7 · Dubai</em>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
