import { Check, ShieldCheck, Fingerprint, FileText, Clock } from 'lucide-react';
import styles from "./online-services.module.css";
import ApplicationTracker from './ApplicationTracker';
import CategoryTabs from "./CategoryTabs";
import MobileOnlineServicesScreen from "@/components/MobileOnlineServicesScreen/MobileOnlineServicesScreen";

export const metadata = {
  title: "Online Services — Amer 24/7",
  description:
    "AMER 24/7's online services. Apply online for AMER services, Emirates ID, Golden Visa, Tas-heel services, medical tests, and insurance.",
};

export default function OnlineServicesPage() {
  return (
    <>
      {/* Mobile-only — same URL, app-matching card design instead of the
          desktop hero + dark-image-card tabs below. */}
      <MobileOnlineServicesScreen />

      {/* ===================== Hero (desktop-only) ===================== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.glowBlob} />
        </div>
        
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTextSide}>
            <div className={styles.pillBadge}>
              <span className={styles.pillDot} />
              AMER 24/7 Official Portal
            </div>
            
            <h1 className={styles.heroTitle}>
              Seamless <span className={styles.heroHighlight}>Online Services</span><br />
              &amp; Secure Payments
            </h1>
            
            <p className={styles.heroSubtitle}>
              Stay updated with the latest application fees and requirements. Experience effortless digital processing for all your governmental needs in the UAE.
            </p>
            
            <div className={styles.heroActions}>
              <button className={styles.btnModernPrimary}>Explore Services</button>
              <button className={styles.btnModernSecondary}>View Pricing</button>
            </div>
          </div>

          <div className={styles.heroVisualSide}>
            <div className={styles.cleanVisual}>
              
              {/* Main Dashboard Widget */}
              <ApplicationTracker />

              {/* Overlapping Premium Visa Card */}
              <div className={styles.visaCard}>
                <div className={styles.visaCardTop}>
                  <span className={styles.visaCountry}>UNITED ARAB EMIRATES</span>
                  <div className={styles.visaGoldChip} />
                </div>
                <div className={styles.visaCardBody}>
                  <h3 className={styles.visaName}>Golden Visa</h3>
                  <p className={styles.visaDuration}>10 Years • Long-Term Residency</p>
                </div>
                <div className={styles.visaCardBottom}>
                  <div className={styles.visaBarcode}>
                     <div className={styles.bar1}/>
                     <div className={styles.bar2}/>
                     <div className={styles.bar3}/>
                     <div className={styles.bar4}/>
                     <div className={styles.bar5}/>
                     <div className={styles.bar6}/>
                  </div>
                </div>
              </div>

              {/* Small Floating Notification */}
              <div className={styles.successFloat}>
                <div className={styles.successIconPulse}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <span>Ready to Download</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===================== Category Tabs ===================== */}
      <CategoryTabs />
    </>
  );
}
