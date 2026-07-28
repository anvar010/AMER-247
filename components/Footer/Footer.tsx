"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import MobileAppFooter from "@/components/MobileAppFooter/MobileAppFooter";
import styles from "./Footer.module.css";

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  // "/" used to be the splash-only screen on mobile with nothing below it
  // (no footer made sense there) — it now also renders the merged home
  // content beneath the splash, so it gets the footer like every other
  // page. "/contact" (MobileSupportScreen) already embeds its own
  // app-style footer card, so rendering another one would duplicate it.
  // The classic (desert/cream) footer below stays desktop-only throughout.
  const hasOwnMobileFooter = pathname === "/contact";
  const showAppFooter = !hasOwnMobileFooter;

  const useful = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Careers", href: "/career" },
    // Covid Testing hidden for now.
    // { label: "Covid Testing", href: "/covid-testing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {showAppFooter && <MobileAppFooter />}
      <footer className={`${styles.footer} ${styles.hideOnMobile}`}>
      <span className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.top}`}>
        <AnimatedContainer className={styles.brand}>
          <img src="/logos/amernew-cropped.webp" alt="Amer 24/7" className={styles.logo} />
          <p className={styles.wordmark}>AMER 24/7</p>
          <p className={styles.tagline}>We are open 24 hrs all days.</p>
          <p className={styles.copy}>
            We take pride in simplifying visa and immigration application
            procedures and thus making your life easier. The only Amer center
            to operate 24 hours every day.
          </p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/Amer247service/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.social}><Facebook size={16} /></a>
            <a href="https://twitter.com/amer24_7?lang=en" target="_blank" rel="noopener noreferrer" aria-label="X" className={styles.social}><Twitter size={16} /></a>
            <a href="https://www.instagram.com/amer_247/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.social}><Instagram size={16} /></a>
            <a href="https://www.youtube.com/@amer247-visaandresidencyse3?app=desktop" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.social}><Youtube size={16} /></a>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.15}>
          <h4 className={styles.heading}>Useful Links</h4>
          <ul className={styles.list}>
            {useful.map((l) => (
              <li key={l.label}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </AnimatedContainer>

        <AnimatedContainer delay={0.25}>
          <h4 className={styles.heading}>Contact Info</h4>
          <ul className={styles.contactList}>
            <li><span className={styles.tag}>E:</span> info@amer247.com</li>
            <li><span className={styles.tag}>P:</span> +971 4 2300500</li>
            <li className={styles.fax}>
              <span className={styles.faxBar}></span>
              <span><span className={styles.tag}>F:</span> +971 4 2300510</span>
            </li>
          </ul>
        </AnimatedContainer>

        <AnimatedContainer delay={0.35}>
          <h4 className={styles.heading}>Address</h4>
          <p className={styles.address}>
            24 Seven Government Transaction Center LLC 17 A Street – Al Khabaisi
            (Behind Abu Baker Al Siddique Metro Station ) – Deira – Dubai,
            UAE.P.O.Box: 81143
          </p>
          <div className={styles.mapWrap}>
            <span className={styles.mapBar}></span>
            <Link
              href="https://maps.app.goo.gl/xbg3hDWXjzAZKzMNA"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Follow Map <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedContainer>
      </div>

      <div className={styles.pay}>
        <p className={styles.payText}>
          We accept payments online using Visa and MasterCard credit/debit card in AED
        </p>
        <div className={styles.payLogos}>
          <span className={styles.payCard} aria-label="Visa, Mastercard, Apple Pay, Samsung Pay">
            <img src="/payments-Photoroom.png" alt="Visa, Mastercard, Apple Pay, Samsung Pay" className={styles.payImg} />
          </span>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <div>© {new Date().getFullYear()} Amer 24/7. All rights reserved.</div>
        </div>
      </div>
      </footer>
    </>
  );
}
