import Link from "next/link";
import {
  Clock,
  Heart,
  Sparkles,
  Building2,
  MapPin,
  Truck,
  Zap,
  CalendarCheck,
  ArrowRight,
  Quote,
} from "lucide-react";
import styles from "./about.module.css";

const stats = [
  { value: "2017", label: "Established" },
  { value: "24/7", label: "Availability" },
  { value: "02", label: "Branches" },
  { value: "100%", label: "Government Backed" },
];

const objectives = [
  {
    icon: Clock,
    title: "We Value Your Time",
    body: "Every minute matters — our workflows are built to keep yours protected.",
  },
  {
    icon: Heart,
    title: "We Care About Satisfaction",
    body: "Outcomes that earn your trust, not just transactions that close.",
  },
  {
    icon: Sparkles,
    title: "Effort & Experience",
    body: "Years of expertise channelled into a single, frictionless service.",
  },
];

const differences = [
  {
    icon: Clock,
    title: "First & only 24/7 center",
    body: "Around the clock — the first of our kind to assist you any hour, any day.",
  },
  {
    icon: MapPin,
    title: "Two prime locations",
    body: "Deira (behind Abu Baker Al Siddique Metro Station) and JLT (One JLT Building).",
  },
  {
    icon: Truck,
    title: "Same-day collection & delivery",
    body: "Transactions are picked up and delivered within the same business day.",
  },
  {
    icon: CalendarCheck,
    title: "Earliest possible turnaround",
    body: "We complete approvals at the soonest possible moment — subject to authority.",
  },
  {
    icon: Zap,
    title: "Fast delivery, every time",
    body: "Quick, dependable turnaround you can plan your day around.",
  },
];

export const metadata = {
  title: "About — Amer 24/7",
  description:
    "Amer 24/7 is a semi-government organization helping residents complete Visa and Residency transactions, established in 2017 in collaboration with the GDRFA.",
};

export default function AboutPage() {
  return (
    <>
      {/* ===================== Hero — cinematic ===================== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <img src="/images/flag.jpg" alt="" className={styles.heroImg} />
          <span className={styles.heroOverlay} />
          <span className={styles.heroNoise} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTopRow}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              About Amer 24/7
            </span>
            <span className={styles.heroMeta}>Dubai · United Arab Emirates</span>
          </div>

          <h1 className={styles.heroTitle}>
            A semi-government partner
            <br />
            for every<em className={styles.titleEm}> Visa &amp; Residency</em>
            <br />
            milestone in Dubai.
          </h1>

          <p className={styles.heroCopy}>
            AMER 247 is a semi-government organization that allows residents to
            complete all Visa and Residency transactions — under one roof, on
            your schedule.
          </p>

          <div className={styles.heroStats}>
            {stats.map(({ value, label }) => (
              <div key={label} className={styles.statItem}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroScroll} aria-hidden="true">
          <span>Scroll</span>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ===================== Story — split with image ===================== */}
      <section className={styles.story}>
        <div className={`container ${styles.storyInner}`}>
          <div className={styles.storyMedia}>
            <div className={styles.storyImgWrap}>
              <video
                className={styles.storyImg}
                src="/images/Amerwebvideo.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/dubai.jpg"
                aria-label="Amer 24/7 brand video"
              />
              <span className={styles.storyImgFrame} aria-hidden="true" />
              <span className={styles.storyVideoBadge} aria-hidden="true">
                <span className={styles.storyVideoDot} />
                Live
              </span>
            </div>
            <div className={styles.storyBadge}>
              <span className={styles.storyBadgeLabel}>Established</span>
              <span className={styles.storyBadgeYear}>2017</span>
              <span className={styles.storyBadgeBar} />
              <span className={styles.storyBadgeTag}>GDRFA Collaboration</span>
            </div>
          </div>

          <div className={styles.storyText}>
            <span className={styles.sectionEyebrow}>
              <span className={styles.eyebrowLine} />
              Our Story
            </span>
            <h2 className={styles.sectionTitle}>
              A direct application of the
              <em className={styles.titleEm}> Federal Government&apos;s</em> strategy.
            </h2>
            <p className={styles.storyLead}>
              Amer 24/7 Center was established in 2017 in collaboration with
              the General Directorate of Residency and Foreigners Affairs.
            </p>
            <p className={styles.storyProse}>
              The experience was a direct application of the strategy of the
              Federal Government advocated by His Highness Sheikh Mohammed bin
              Rashid Al Maktoum, Prime Minister and Ruler of Dubai.
            </p>
            <div className={styles.storyQuote}>
              <Quote className={styles.storyQuoteIcon} size={22} />
              <span>
                Specialized service centers, in cooperation with the private
                sector, to accomplish all Government department and federal
                transactions.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Services intro ===================== */}
      <section className={styles.provide}>
        <div className={`container ${styles.provideInner}`}>
          <span className={styles.sectionEyebrow}>
            <span className={styles.eyebrowLine} />
            Amer 24/7 Provides Services
          </span>
          <h2 className={styles.provideTitle}>
            Government services,
            <em className={styles.titleEm}> reimagined</em> for the private sector.
          </h2>
          <div className={styles.provideGrid}>
            <p>
              Provides services ranging from issuing entry permits, issuing and
              renewals of a residency visa, visa cancellation and other related
              services provided by other Government institutions and
              departments. The introduction of the private sector as a
              strategic partner of the various Government ministries and
              sectors to provide Government and federal services and raise the
              level of customer satisfaction.
            </p>
            <p>
              It catered to the idea of establishing service centers of
              specialized services, in cooperation with the private sector to
              accomplish all Government department and federal transactions.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== Our Objective ===================== */}
      <section className={styles.objectives}>
        <span className={styles.objectivesGlow} aria-hidden="true" />
        <div className={`container ${styles.objectivesInner}`}>
          <aside className={styles.objAside}>
            <span className={styles.sectionEyebrow}>
              <span className={styles.eyebrowLine} />
              Our Objective
            </span>
            <h2 className={styles.objTitle2}>
              Making your life
              <em className={styles.titleEm}> easy</em> — so you can focus on
              your business.
            </h2>
            <p className={styles.objectivesLead}>
              Our aim is to make your life easy and allow you to focus on your
              business.
            </p>
          </aside>

          <ol className={styles.objList}>
            {objectives.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className={styles.objRow}
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                <span className={styles.objRowNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.objRowMain}>
                  <div className={styles.objRowHead}>
                    <span className={styles.objRowIconWrap}>
                      <Icon size={22} strokeWidth={1.6} className={styles.objRowIcon} />
                    </span>
                    <h3 className={styles.objRowTitle}>{title}</h3>
                  </div>
                  <p className={styles.objRowBody}>{body}</p>
                </div>
                <span className={styles.objRowArrow} aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== How We Are Different ===================== */}
      <section className={styles.diff}>
        <div className={`container ${styles.diffInner}`}>
          <header className={styles.diffHead}>
            <div>
              <span className={styles.sectionEyebrow}>
                <span className={styles.eyebrowLine} />
                How We Are Different
              </span>
              <h2 className={styles.sectionTitle}>
                Built different —
                <em className={styles.titleEm}> on purpose.</em>
              </h2>
            </div>
            <p className={styles.diffSub}>
              Five things that set Amer 24/7 apart from any other service
              center in Dubai.
            </p>
          </header>

          <ol className={styles.diffList}>
            {differences.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className={styles.diffItem}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className={styles.diffIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.diffIconWrap}>
                  <Icon size={22} strokeWidth={1.6} className={styles.diffIcon} />
                </span>
                <div className={styles.diffText}>
                  <h3 className={styles.diffTitle}>{title}</h3>
                  <p className={styles.diffBody}>{body}</p>
                </div>
                <span className={styles.diffArrow} aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== Closing ===================== */}
      <section className={styles.closing}>
        <div className={styles.closingBg} aria-hidden="true">
          <img src="/images/dubai.jpg" alt="" className={styles.closingImg} />
          <span className={styles.closingOverlay} />
        </div>
        <div className={`container ${styles.closingInner}`}>
          <div className={styles.closingText}>
            <span className={styles.sectionEyebrowOnDark}>
              <span className={styles.eyebrowLine} />
              What We Majorly Deal With
            </span>
            <h2 className={styles.closingTitle}>
              Entry permits, residency visas, cancellations
              <em className={styles.titleEm}> &amp; everything in between.</em>
            </h2>
            <p className={styles.closingCopy}>
              Provides services ranging from issuing entry permits, issuing and
              renewals of a residency visa, visa cancellation and other related
              services provided by other Government institutions and
              departments.
            </p>
          </div>
          <div className={styles.closingCta}>
            <Link href="/services" className={styles.btnGold}>
              Explore Services <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className={styles.btnGhost}>
              <Building2 size={16} /> Visit a Branch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
