"use client";

import Link from "next/link";
import { Outfit } from "next/font/google"; 
import { ArrowRight, Sparkles } from "lucide-react";
import { FileText, IdCard, Gem, Stethoscope } from "lucide-react";
import styles from "./WhoWeAre.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

const services = [
  { icon: FileText, title: "Immigration Services", desc: "Expert handling of all immigration and residency procedures." },
  { icon: Gem, title: "Golden Visa", desc: "Secure your long-term residency in the UAE effortlessly." },
  { icon: IdCard, title: "Emirates Identity Authority", desc: "Fast-track processing for new and renewed Emirates IDs." },
  { icon: Stethoscope, title: "Medical Test Applications", desc: "Hassle-free medical fitness test scheduling and results." },
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className={`${styles.section} ${outfit.className}`}>
      <div className={styles.container}>
        
        <div className={styles.bentoGrid}>
          
          {/* Main Bento Box (Spans 2x2) */}
          <div className={`${styles.bentoBox} ${styles.mainBox}`}>
            <div className={styles.eyebrow}>
              <Sparkles size={16} aria-hidden="true" />
              <span>ABOUT AMER247</span>
            </div>
            
            <h2 className={styles.title}>
              Who <span className={styles.titleHighlight}>We</span> Are
            </h2>
            
            <p className={styles.description}>
              Amer247 Center Was established in 2017 in collaboration with the General Directorate of Residency and Foreigners Affairs, and the experience was a direct application of the strategy of the Federal Government advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum, Prime Minister and Ruler of Dubai.
            </p>

            <Link href="/about" className={styles.ctaButton} aria-label="Discover Our Story">
              Discover Our Story <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          {/* 4 Service Bento Boxes */}
          {services.map((service, i) => (
            <div key={i} className={`${styles.bentoBox} ${styles.serviceBox}`}>
              <div className={styles.iconWrap}>
                <service.icon size={28} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.desc}</p>
              
              <Link href="#" className={styles.serviceLink} aria-label={`Learn more about ${service.title}`}>
                Learn More <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          ))}

        </div>
        
      </div>
    </section>
  );
}
