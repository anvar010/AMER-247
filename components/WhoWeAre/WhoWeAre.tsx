"use client";

import React from "react";
import { Outfit } from "next/font/google";
import { Sparkles, Quote, ShieldCheck, ArrowRight, FileText, Gem, IdCard, Stethoscope } from "lucide-react";
import styles from "./WhoWeAre.module.css";
import mstyles from "@/components/MobileWhoWeAre/MobileWhoWeAre.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const mobileOutfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const STORY_LEAD =
  "Amer247 Center was established in 2017 in collaboration with the General Directorate of Residency and Foreigners Affairs.";
const STORY_BODY =
  "The experience was a direct application of the strategy of the Federal Government advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum, Prime Minister and Ruler of Dubai.";
const QUOTE_TEXT =
  "Our experience is a direct application of the strategy of the Federal Government advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum, Prime Minister and Ruler of Dubai.";

const TAGS = [
  { icon: FileText, label: "Immigration Services" },
  { icon: Gem, label: "Golden Visa" },
  { icon: IdCard, label: "Emirates Identity Authority" },
  { icon: Stethoscope, label: "Medical Test Applications" },
];

export default function WhoWeAre() {
  return (
    <>
    <section className={`${styles.section} ${outfit.className}`}>
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
            <p className={styles.storyLead}>{STORY_LEAD}</p>
            <p className={styles.storyBody}>{STORY_BODY}</p>

            {/* Expertise Tags */}
            <div className={styles.tagsContainer}>
              {TAGS.map((t) => (
                <span key={t.label} className={styles.tag}>
                  <t.icon className={styles.tagIcon} size={22} /> {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* Center Column: Visual Anchor */}
          <div className={styles.centerCol}>
            <div className={styles.imageCard}>
              <video
                src="/images/FNL-web.mp4"
                poster="/images/center-office.webp"
                autoPlay
                muted
                loop
                playsInline
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
              <p className={styles.quoteText}>&quot;{QUOTE_TEXT}&quot;</p>
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

    {/* Mobile-only — same data as above, app card design instead of the
        desktop bento grid. Visibility is CSS-driven (mstyles.wrap). */}
    <section className={`${mstyles.wrap} ${mobileOutfit.className}`}>
      <div className={mstyles.eyebrowRow}>
        <Sparkles size={13} />
        Who We Are
      </div>
      <h2 className={mstyles.title}>
        Redefining the <span className={mstyles.accent}>government</span> experience.
      </h2>

      <p className={mstyles.storyLead}>{STORY_LEAD}</p>
      <p className={mstyles.storyBody}>{STORY_BODY}</p>

      <div className={mstyles.tagsGrid}>
        {TAGS.map((t) => (
          <span key={t.label} className={mstyles.tag}>
            <t.icon size={18} className={mstyles.tagIcon} />
            {t.label}
          </span>
        ))}
      </div>

      <div className={mstyles.imageCard}>
        <img src="/images/amer-lounge-interior.webp" alt="Amer247 Center" className={mstyles.image} />
        <div className={mstyles.imageOverlay} />
        <div className={mstyles.badge}>
          <span className={mstyles.badgeNum}>24/7</span>
          <span className={mstyles.badgeLbl}>Operations</span>
        </div>
      </div>

      <div className={mstyles.quoteBox}>
        <Quote size={28} className={mstyles.quoteIcon} />
        <p className={mstyles.quoteText}>&quot;{QUOTE_TEXT}&quot;</p>
        <div className={mstyles.authorRow}>
          <span className={mstyles.authorBadge}>
            <ShieldCheck size={17} />
          </span>
          <span className={mstyles.authorInfo}>
            <span className={mstyles.authorTitle}>Authorized Partner</span>
            <span className={mstyles.authorSub}>GDRFA Dubai</span>
          </span>
        </div>
      </div>

      <div className={mstyles.highlightCard}>
        <span className={mstyles.highlightInfo}>
          <span className={mstyles.highlightLabel}>Customer Happiness</span>
          <span className={mstyles.highlightValue}>Priority #1</span>
        </span>
        <span className={mstyles.highlightArrow}>
          <ArrowRight size={18} />
        </span>
      </div>
    </section>
    </>
  );
}
