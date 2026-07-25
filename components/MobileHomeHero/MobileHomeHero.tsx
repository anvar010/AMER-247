"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Outfit } from "next/font/google";
import styles from "./MobileHomeHero.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

function greet(): string {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function MobileHomeHero() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    setGreeting(greet());
  }, []);

  return (
    <section className={`${styles.head} ${outfit.className}`}>
      <video
        className={styles.bg}
        autoPlay muted loop playsInline
        poster="/images/dubai.webp"
      >
        <source src="/images/AMER-hero.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} />

      <Link href="/account" className={styles.avatar} aria-label="Account">
        <User size={19} />
        <span className={styles.bellDot} />
      </Link>

      <div className={styles.greetRow}>
        <div className={styles.greetHi}>{greeting}</div>
        <div className={styles.greetName}>Welcome <span>👋</span></div>
      </div>

      <p className={styles.tagline}>
        The UAE&apos;s only <strong>24/7</strong> government services centre — visas, residency &amp; Emirates ID, from your phone.
      </p>
    </section>
  );
}
