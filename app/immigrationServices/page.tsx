import { Target, HeartHandshake, Eye, Check, MapPin, Mail, Phone, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero/PageHero";
import { MISSION_CARDS, COUNTRIES_WE_SERVE, WE_HELP_WITH, WHY_GLOBAL_AXIS_COPY } from "@/lib/immigrationContent";
import styles from "./immigrationServices.module.css";

export const metadata = {
  alternates: {
    canonical: "/immigrationServices",
  },
};

const MISSION_ICONS = [Target, HeartHandshake, Eye];

// Split the source paragraph into an editorial lede (first sentence, with
// "21 years" pulled out as a highlight) + the remaining body copy, so the
// section reads as a styled intro instead of one flat gray block.
const [WHY_LEDE, ...WHY_REST] = WHY_GLOBAL_AXIS_COPY.split(". ");
const WHY_BODY = WHY_REST.join(". ");
const [WHY_LEDE_BEFORE, WHY_LEDE_AFTER] = WHY_LEDE.split("21 years");

export default function ImmigrationServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="THE GLOBAL AXIS"
        title="Immigration Services"
        subtitle="We are a team of well-trained and refined immigration experts to guide you through your immigration process to any country you aspire to settle."
      />

      <section className={styles.mission}>
        <div className={`container ${styles.missionInner}`}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Our Foundation
          </span>
          <div className={styles.missionGrid}>
            {MISSION_CARDS.map((c, i) => {
              const Icon = MISSION_ICONS[i];
              return (
                <div key={c.heading} className={styles.missionCard}>
                  <span className={styles.missionIco}><Icon size={24} /></span>
                  <h3 className={styles.missionHeading}>{c.heading}</h3>
                  <p className={styles.missionText}>{c.statement}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.needs}>
        <div className={`container ${styles.needsInner}`}>
          <div>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              End-to-End Support
            </span>
            <h2 className={styles.h2}>One stop shop for all your immigration needs</h2>
            <p className={styles.copy}>
              With our unrivalled knowledge, experience and expertise we will guide you through
              each step of the way. Our well-trained and refined immigration experts will
              skilfully guide you through your immigration process to any country you aspire to
              settle.
            </p>
            <h3 className={styles.h3}>Countries we serve in</h3>
            <div className={styles.countryChips}>
              {COUNTRIES_WE_SERVE.map((c) => (
                <span key={c} className={styles.countryChip}>
                  <Check size={14} className={styles.checkIco} />
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.badgeCard}>
            <span className={styles.badgeGlow} aria-hidden="true" />
            <span className={styles.badgeIcoWrap}>
              <span className={styles.badgeIcoRing} aria-hidden="true" />
              <span className={styles.badgeIco}><ShieldCheck size={26} /></span>
            </span>
            <span className={styles.badgeEyebrow}>Government Affiliated</span>
            <p className={styles.badgeText}>
              First Immigration company affiliated by Government of UAE
            </p>
            <span className={styles.badgeDivider} />
            <p className={styles.badgeSub}>Trusted, licensed &amp; government-recognized.</p>
          </div>
        </div>
      </section>

      <section className={styles.why}>
        <div className={`container ${styles.whyInner}`}>
          <img src="/images/immigration-services-illustration.webp" alt="" className={styles.whyImage} />
          <div className={styles.whyBody}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              Why Choose Us
            </span>
            <h2 className={styles.h2}>Why work with The Global Axis</h2>
            <p className={styles.whyLede}>
              {WHY_LEDE_BEFORE}
              <span className={styles.whyHighlight}>21 years</span>
              {WHY_LEDE_AFTER}.
            </p>
            <p className={styles.whyText}>{WHY_BODY}</p>
          </div>
        </div>
      </section>

      <section className={styles.helpWith}>
        <div className="container">
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Our Expertise
          </span>
          <h2 className={styles.h2}>Our immigration consultants help with</h2>
          <div className={styles.helpGrid}>
            {WE_HELP_WITH.map((c) => (
              <div key={c} className={styles.helpChip}>
                <span className={styles.helpChipIco}><Check size={16} /></span>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <div className="container">
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Get In Touch
          </span>
          <h2 className={styles.h2}>Contact Global Axis now</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <span className={styles.contactIco}><MapPin size={20} /></span>
              <h3 className={styles.contactHeading}>Address</h3>
              <p className={styles.contactCopy}>
                Bank Street Building - M11 Khalid Bin Al Waleed Rd - Al Mankhool - Dubai
              </p>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactIco}><Phone size={20} /></span>
              <h3 className={styles.contactHeading}>Contact Info</h3>
              <p className={styles.contactCopy}>
                <Mail size={15} /> info@amer247.com
              </p>
              <p className={styles.contactCopy}>
                <Phone size={15} /> +971 4 546 8555 / +971 50 564 4132
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
