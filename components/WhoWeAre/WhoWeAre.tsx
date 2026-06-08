"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Building2 } from "lucide-react";
import { FileText, IdCard, Gem, Stethoscope } from "lucide-react";
import styles from "./WhoWeAre.module.css";

const services = [
  { icon: FileText, title: "Immigration\nServices" },
  { icon: Gem, title: "Golden\nVisa" },
  { icon: IdCard, title: "Emirates Identity\nAuthority" },
  { icon: Stethoscope, title: "Medical Test\nApplications" },
];

export default function WhoWeAre() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* Header Row */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow}>
              <Sparkles size={16} />
              <span>ABOUT AMER247</span>
            </div>
            <h2 className={styles.title}>Who We Are</h2>
          </div>
          <p className={styles.description}>
            Amer247 Center was established in 2017 in collaboration with the General Directorate of Residency and Foreigners Affairs. Our experience is a direct application of the strategy of the Federal Government advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum, Prime Minister and Ruler of Dubai.
          </p>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          
          {/* Main Huge Card: 4 Services Grid */}
          <div className={`${styles.card} ${styles.mainCard}`}>
            <div className={styles.servicesGrid}>
              {services.map((service, i) => (
                <div key={i} className={styles.serviceItem}>
                  <div className={styles.serviceIcon}>
                    <service.icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className={styles.serviceLabel}>
                    {service.title.split("\n").map((line, j) => (
                      <span key={j} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </span>
                  <Link href="#" className={styles.serviceLink}>
                    View Service <ArrowRight size={16} style={{ marginLeft: "0.25rem" }} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            
            {/* Dark Card */}
            <div className={`${styles.card} ${styles.darkCard}`}>
              <div className={styles.darkCardIcon}>
                <Building2 size={28} strokeWidth={1.5} />
              </div>
              <h3 className={styles.darkCardTitle}>
                Trusted Government<br />Partner
              </h3>
              <p className={styles.darkCardText}>
                We streamline all government processes to ensure efficient, stress-free clearance for your business and personal needs.
              </p>
              <Link href="/about" className={styles.button}>
                Learn more about us <ArrowRight size={16} style={{ marginLeft: "0.25rem" }} />
              </Link>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
