import { ShieldCheck } from "lucide-react";
import { MEDICAL_CENTRES, EMIRATES_ORDER } from "@/lib/medicalCentres";
import MedicalCentresExplorer from "./MedicalCentresExplorer";
import styles from "./medical-centres.module.css";

export default function MedicalCentresPage() {
  return (
    <>
      {/* Original Hero for Mobile */}
      <section className={styles.heroMobile}>
        <div className={styles.heroBgMobile} aria-hidden="true">
          <span className={styles.heroOrbAMobile} />
          <span className={styles.heroOrbBMobile} />
        </div>
        <div className={styles.heroInnerMobile}>
          <span className={styles.eyebrowMobile}>
            <span className={styles.eyebrowLineMobile} />
            247 Medical Services
          </span>
          <h1 className={styles.heroTitleMobile}>DHA-Approved Medical Fitness Test Centres</h1>
          <p className={styles.heroCopyMobile}>
            Complete your visa medical fitness test at any approved centre below — no need to visit
            a specific one.
          </p>
        </div>
      </section>

      {/* New Hero for Desktop */}
      <section className={styles.heroDesktop}>
        <div className={styles.heroBgDesktop} aria-hidden="true">
          <div className={styles.heroGridDesktop} />
          <span className={styles.heroOrbADesktop} />
          <span className={styles.heroOrbBDesktop} />
          <span className={styles.heroOrbCDesktop} />
        </div>
        <div className={styles.heroInnerDesktop}>
          <div className={styles.badgeWrapperDesktop}>
            <div className={styles.badgeIconDesktop}>
              <ShieldCheck size={14} strokeWidth={2.5} />
            </div>
            <span className={styles.eyebrowDesktop}>247 Medical Services</span>
          </div>
          
          <h1 className={styles.heroTitleDesktop}>
            DHA-Approved<br />
            <span className={styles.heroTitleHighlightDesktop}>Medical Fitness</span> Test Centres
          </h1>
          
          <p className={styles.heroCopyDesktop}>
            Complete your visa medical fitness test at any approved centre below — no need to visit
            a specific one. Fast, secure, and officially recognized across the UAE.
          </p>

          <div className={styles.heroStatsDesktop}>
            <div className={styles.statItemDesktop}>
              <span className={styles.statValueDesktop}>100%</span>
              <span className={styles.statLabelDesktop}>DHA Compliant</span>
            </div>
            <div className={styles.statDividerDesktop} />
            <div className={styles.statItemDesktop}>
              <span className={styles.statValueDesktop}>Fast</span>
              <span className={styles.statLabelDesktop}>Processing</span>
            </div>
            <div className={styles.statDividerDesktop} />
            <div className={styles.statItemDesktop}>
              <span className={styles.statValueDesktop}>Any</span>
              <span className={styles.statLabelDesktop}>Approved Centre</span>
            </div>
          </div>
        </div>
      </section>

      <div className={`container ${styles.body}`}>
        <section className={styles.introCard}>
          <span className={styles.introIco}><ShieldCheck size={22} /></span>
          <div>
            <p className={styles.introText}>
              Every centre listed here is approved to issue the medical fitness certificate required
              for UAE residency visas. The certificate is accepted the same regardless of which
              approved centre you choose.
            </p>
            <div className={styles.statRow}>
              <span className={styles.stat}><b>{MEDICAL_CENTRES.length}</b> Approved Centres</span>
              <span className={styles.statDivider} />
              <span className={styles.stat}><b>{EMIRATES_ORDER.length}</b> Emirates Covered</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <MedicalCentresExplorer centres={MEDICAL_CENTRES} />
        </section>
      </div>
    </>
  );
}
