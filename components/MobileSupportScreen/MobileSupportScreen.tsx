"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, ChevronDown } from "lucide-react";
import MobileScreenHead from "@/components/MobileScreenHead/MobileScreenHead";
import MobileMenuRow from "@/components/MobileMenuRow/MobileMenuRow";
import MobileAppFooter from "@/components/MobileAppFooter/MobileAppFooter";
import { Outfit } from "next/font/google";
import styles from "./MobileSupportScreen.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"] });

const contacts = [
  { icon: Phone, label: "Call us", sub: "+971 4 2300500", href: "tel:+97142300500" },
  { icon: MessageCircle, label: "WhatsApp", sub: "Chat with a consultant", href: "https://wa.me/97142300500" },
  { icon: Mail, label: "Email", sub: "info@amer247.com", href: "mailto:info@amer247.com" },
];

const faqs = [
  { q: "Are you open 24 hours?", a: "Yes — AMER 24/7 is the only government services centre in the UAE operating 24 hours a day, every day, except Fridays from 12:00–2:30 PM." },
  { q: "Do I have to be inside the UAE to apply?", a: "Many services can be started from inside or outside the UAE — fees differ (shown as “in” / “out”). Our consultants guide you through either route." },
  { q: "Are express services available?", a: "Yes. Medical fitness tests and select applications offer VIP / VVIP express processing for an added fee." },
  { q: "How can I pay?", a: "We accept Visa and Mastercard credit/debit cards online, in AED." },
];

export default function MobileSupportScreen() {
  const [open, setOpen] = useState(0);

  return (
    <div className={`${styles.wrap} ${outfit.className}`}>
      <MobileScreenHead
        kicker="WE'RE HERE, ALWAYS"
        title="Support"
        sub="Trained happiness consultants, ready 24/7 — call, chat or visit us."
      />

      <div className={styles.menu}>
        {contacts.map((c) => (
          <MobileMenuRow key={c.label} icon={c.icon} iconBg="primary" label={c.label} sub={c.sub} href={c.href} external />
        ))}
      </div>

      <div className={styles.secHead}>
        <h2 className={styles.h2}>Visit us · open 24/7</h2>
      </div>
      <MobileAppFooter />

      <div className={styles.secHead}>
        <h2 className={styles.h2}>Good to know</h2>
      </div>
      <div className={styles.faqList}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={styles.faq}>
              <button className={styles.faqQ} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className={`${styles.faqQTxt} ${isOpen ? styles.faqQTxtOn : ""}`}>{f.q}</span>
                <ChevronDown size={17} className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOn : ""}`} />
              </button>
              {isOpen && <p className={styles.faqA}>{f.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
