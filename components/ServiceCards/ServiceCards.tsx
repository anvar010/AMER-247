"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookUser, ClipboardPlus, IdCard, ShieldCheck, ArrowRight } from "lucide-react";
import styles from "./ServiceCards.module.css";

const services = [
  {
    id: 1,
    title: "Immigration Services",
    description: "Complete assistance with visas, entry permits, and residency processing across the UAE.",
    icon: BookUser,
    link: "/services/immigration"
  },
  {
    id: 2,
    title: "Medical Test Applications",
    description: "Fast-tracked medical typing and application processing for residency visas.",
    icon: ClipboardPlus,
    link: "/services/medical"
  },
  {
    id: 3,
    title: "Emirates Identity",
    description: "Seamless Emirates ID typing, renewal, and biometrics coordination services.",
    icon: IdCard,
    link: "/services/emirates-id"
  },
  {
    id: 4,
    title: "Insurance Services",
    description: "Mandatory health insurance processing and policy generation for all visa types.",
    icon: ShieldCheck,
    link: "/services/insurance"
  }
];

export default function ServiceCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      {services.map((svc) => (
        <div 
          key={svc.id} 
          className={styles.card}
          onMouseEnter={() => setHoveredCard(svc.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.iconWrap}>
                <svc.icon size={22} />
              </div>
              <h3 className={styles.title}>
                {svc.title}
              </h3>
            </div>
            
            <div className={styles.details}>
              <p className={styles.description}>{svc.description}</p>
              
              <Link href={svc.link} className={styles.checkService}>
                Check Service <ArrowRight size={14} className={styles.arrow} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
