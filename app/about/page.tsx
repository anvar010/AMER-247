import Link from "next/link";
import { Outfit } from "next/font/google";
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
  Layers,
  ShieldCheck,
} from "lucide-react";
import styles from "./about.module.css";
import mstyles from "@/components/MobileAboutScreen/MobileAboutScreen.module.css";
import CountUp from "@/components/CountUp/CountUp";
import { OG_IMAGE } from "@/lib/ogImage";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const stats = [
  { value: <CountUp to={2017} />, label: "Established", icon: CalendarCheck },
  { value: <><CountUp to={24} />/<CountUp to={7} /></>, label: "Availability", icon: MapPin },
  { value: <CountUp to={2} prefix="0" />, label: "Branches", icon: Building2 },
  { value: <CountUp to={100} suffix="%" />, label: "Government Backed", icon: ShieldCheck },
];

const objectives = [
  {
    icon: Clock,
    title: "We care about your valuable time",
    body: "",
  },
  {
    icon: Heart,
    title: "We care about your satisfaction",
    body: "",
  },
  {
    icon: Sparkles,
    title: "We put all our effort and experience to give you satisfaction",
    body: "",
  },
];

const differences = [
  {
    icon: Clock,
    title: "Amer 24/7 is the first and only center available 24/7 to assist you with our services",
    body: "",
  },
  {
    icon: MapPin,
    title: "We have two branches: Deira (behind Abu Baker Al Siddique Metro Station), JLT (One JLT Building)",
    body: "",
  },
  {
    icon: Truck,
    title: "Collection and delivery of the transactions within the same day.",
    body: "",
  },
  {
    icon: CalendarCheck,
    title: "Complete the transactions at the earliest possible time; subject to approval.",
    body: "",
  },
  {
    icon: Zap,
    title: "Fast turn around and delivery time.",
    body: "",
  },
];

export const metadata = {
  title: "About Amer247 – 24 Hour Amer Center Near Deira City Centre",
  description:
    "Amer247 is a semi-government Amer & Tasheel services center in Deira, Dubai — the only Amer office open 24 hours for visa, residency & Emirates ID services.",
  openGraph: {
    title: "About Amer247 – 24 Hour Amer Center in Deira, Dubai",
    description:
      "The only Amer center in Dubai open 24/7. Semi-government transaction center simplifying UAE visa, residency and Emirates ID services.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Mobile-only — same content/data as the desktop sections below (this
          file is the single source of truth for both), the app's own card
          design instead of the desktop's cinematic dark-image sections.
          Visibility is CSS-driven (mstyles.wrap: display:none above 768px). */}
      <div className={`${mstyles.wrap} ${outfit.className}`}>
        <div className={mstyles.hubTop}>
          <span className={mstyles.glowGold} aria-hidden />
          <span className={mstyles.glowWhite} aria-hidden />
          <span className={mstyles.eyebrow}>About Amer 24/7</span>
          <h1 className={mstyles.title}>
            AMER 247 is a Semi-Government Organization which allows residents to complete all Visa and Residency Transaction
          </h1>
          <p className={mstyles.blurb}>
            Amer 24/7 Center Was established in 2017 in collaboration with the General Directorate of Residency and Foreigners Affairs and the experience was a direct application of the strategy of the Federal Government advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum, Prime Minister and Ruler of Dubai.
          </p>
          <div className={mstyles.statsGrid}>
            {stats.map(({ value, label }) => (
              <div key={label} className={mstyles.statCard}>
                <span className={mstyles.statValue}>{value}</span>
                <span className={mstyles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={mstyles.body}>
          <div className={mstyles.videoCard}>
            <video
              className={mstyles.video}
              src="/images/Amerwebvideo.mp4"
              autoPlay loop muted playsInline preload="metadata"
              poster="/images/dubai.webp"
              aria-label="Amer 24/7 brand video"
            />
            <div className={mstyles.videoOverlay} />
            <span className={mstyles.liveBadge}>
              <span className={mstyles.liveDot} />
              Live
            </span>
            <div className={mstyles.videoBadge}>
              <span className={mstyles.videoBadgeLabel}>Established</span>
              <span className={mstyles.videoBadgeYear}>2017</span>
            </div>
          </div>

          <span className={mstyles.eyebrowRow}>What We Do</span>
          <h2 className={mstyles.sectionTitle}>Amer 24/7 Provides Services</h2>
          <p className={mstyles.storyLead}>
            Provides services ranging from issuing entry permits, issuing and renewals of a
            residency visa, visa cancellation and other related services provided by other
            Government institutions and departments. The introduction of the private sector as a
            strategic partner of the various Government ministries and sectors to provide
            Government and federal services and raise the level of customer satisfaction.
          </p>
          <p className={mstyles.storyProse}>
            It catered to the idea of establishing service centers of specialized services, in
            cooperation with the private sector to accomplish all Government department and federal
            transactions.
          </p>

          <span className={mstyles.eyebrowRow}>Our Objective</span>
          <h2 className={mstyles.sectionTitle}>
            Making your life <span className={mstyles.accent}>easy</span> — so you can focus on your business.
          </h2>

          <div className={mstyles.listStack}>
            {objectives.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className={mstyles.listCard}>
                <span className={mstyles.listNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={mstyles.listIco}>
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <div className={mstyles.listBody}>
                  <p className={mstyles.listTitle}>{title}</p>
                  {body && <p className={mstyles.listDesc}>{body}</p>}
                </div>
              </div>
            ))}
          </div>

          <span className={mstyles.eyebrowRow}>How We Are Different</span>
          <h2 className={mstyles.sectionTitle}>
            Built different — <span className={mstyles.accent}>on purpose.</span>
          </h2>
          <p className={mstyles.paragraph}>
            Five things that set Amer 24/7 apart from any other service center in Dubai.
          </p>

          <div className={mstyles.listStack}>
            {differences.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className={mstyles.listCard}>
                <span className={mstyles.listNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={mstyles.listIco}>
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <div className={mstyles.listBody}>
                  <p className={mstyles.listTitle}>{title}</p>
                  {body && <p className={mstyles.listDesc}>{body}</p>}
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>

      {/* ===================== Hero — premium white/maroon+gold ===================== */}
      <section className={styles.hero}>
        <span className={styles.heroDotsPattern} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTopRow}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              About Amer 24/7
            </span>
            <span className={styles.heroMeta}>
              <MapPin size={13} /> Dubai · United Arab Emirates
            </span>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <h1 className={styles.heroTitle}>
                AMER 24/7 is a
                <br />
                <span className={styles.titleMaroon}>Semi-Government</span>
                <br />
                <span className={styles.titleGold}>Organization</span>
              </h1>
              <p className={styles.heroTagline}>
                which allows residents to complete all Visa and Residency Transaction
              </p>

              <p className={styles.heroCopy}>
                Amer 24/7 Center Was established in 2017 in collaboration with the General Directorate of Residency and Foreigners Affairs and the experience was a direct application of the strategy of the Federal Government advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum, Prime Minister and Ruler of Dubai.
              </p>

              <a href="#story" className={styles.heroLearnMore}>
                Learn More <ArrowRight size={16} />
              </a>
            </div>

            <div className={styles.heroRight} aria-hidden="true">
              <span className={styles.heroRingGold} />
              <span className={styles.heroRingMaroon} />
              <div className={styles.heroLogoCircle}>
                <img
                  src="/logos/amernew-cropped-dark.webp"
                  alt="Amer 24/7"
                  className={styles.heroLogoImg}
                />
              </div>
            </div>
          </div>

          <div className={styles.heroStats}>
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className={styles.statItem}>
                <span className={styles.statIconWrap}>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== Story — split with image ===================== */}
      <section id="story" className={styles.story}>
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
                poster="/images/dubai.webp"
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
              What We Do
            </span>
            <h2 className={styles.sectionTitle}>Amer 24/7 Provides Services</h2>
            <p className={styles.storyLead}>
              Provides services ranging from issuing entry permits, issuing and
              renewals of a residency visa, visa cancellation and other related
              services provided by other Government institutions and
              departments. The introduction of the private sector as a
              strategic partner of the various Government ministries and
              sectors to provide Government and federal services and raise the
              level of customer satisfaction.
            </p>
            <p className={styles.storyProse}>
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
                  {body && <p className={styles.objRowBody}>{body}</p>}
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
                  {body && <p className={styles.diffBody}>{body}</p>}
                </div>
                <span className={styles.diffArrow} aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
