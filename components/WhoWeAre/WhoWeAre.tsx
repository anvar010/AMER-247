"use client";

import React from "react";
import { Outfit } from "next/font/google";
import { Sparkles, Quote, ShieldCheck, ArrowRight } from "lucide-react";
import styles from "./WhoWeAre.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className={`${styles.section} ${outfit.className}`}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Sparkles className={styles.sparkleIcon} size={14} /> Who We Are
          </div>
          <h2 className={styles.title}>
            Redefining the <span className={styles.titleGradient}>government</span> experience.
          </h2>
        </div>

        <div className={styles.grid}>
          
          {/* Left Column: The Story */}
          <div className={styles.leftCol}>
            <p className={styles.storyLead}>
              Established in 2017, AMER247 was built on a single, unwavering principle: <span className={styles.highlightText}>absolute convenience.</span>
            </p>
            <p className={styles.storyBody}>
              We understand the challenges that come with paperwork, long queues, and confusing processes. Our mission is to eliminate these hurdles entirely, acting as a seamless bridge between you and UAE government entities.
            </p>
            
            {/* Expertise Tags */}
            <div className={styles.tagsContainer}>
              <span className={styles.tag}>Golden Visa</span>
              <span className={styles.tag}>Emirates ID</span>
              <span className={styles.tag}>Company Setup</span>
              <span className={styles.tag}>Medical Tests</span>
            </div>
          </div>

          {/* Center Column: Visual Anchor */}
          <div className={styles.centerCol}>
            <div className={styles.imageCard}>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                alt="Premium Office"
                className={styles.image}
              />
              {/* Overlay gradient */}
              <div className={styles.imageOverlay} />
              
              {/* Center Badge */}
              <div className={styles.badgeContainer}>
                <div className={styles.badgeNumber}>24/7</div>
                <div className={styles.badgeLabel}>Operations</div>
              </div>
            </div>
          </div>

          {/* Right Column: The Quote & Authority */}
          <div className={styles.rightCol}>
            {/* Quote Box */}
            <div className={styles.quoteBox}>
              <Quote className={styles.quoteIcon} size={40} />
              <p className={styles.quoteText}>
                "Our experience is a direct application of the strategy of the Federal Government advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum, Prime Minister and Ruler of Dubai."
              </p>
              <div className={styles.authorContainer}>
                <div className={styles.authorBadge}>
                  <ShieldCheck className={styles.shieldIcon} size={24} />
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorTitle}>Authorized Partner</div>
                  <div className={styles.authorSubtitle}>GDRFA Dubai</div>
                </div>
              </div>
            </div>

            {/* Mini Highlight Card */}
            <div className={styles.highlightCard}>
              <div className={styles.highlightInfo}>
                <div className={styles.highlightLabel}>Customer Happiness</div>
                <div className={styles.highlightValue}>Priority #1</div>
              </div>
              <div className={styles.highlightArrowWrap}>
                <ArrowRight className={styles.arrowIcon} size={20} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
