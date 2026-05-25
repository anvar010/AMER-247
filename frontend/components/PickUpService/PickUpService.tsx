import { Check, Clock, ArrowRight } from "lucide-react";
import styles from "./PickUpService.module.css";
import Link from "next/link";

const features = [
    "The only Government services center operating 24 hours in the UAE.",
    "The only Government services center operating on Friday and public holidays.",
    "There are sufficient parking space available in the area.",
    "One stop shop (you can finish all your Government transactions at Amer 24/7)",
    "Our customer happiness consultants are well trained to cater to all your needs.",
];

export default function PickUpService() {
    return (
        <section className={styles.section}>
            <div className={styles.bgGridLeft} />

            <div className={`container ${styles.grid}`}>
                {/* Left Col */}
                <div className={styles.leftCol}>
                    <div className={styles.imageWrap}>
                        <div className={styles.imageOutline} />
                        <img src="/images/img.svg" alt="Amer 24/7 Service Area" className={styles.mainImage} />

                        <div className={styles.overlayBox}>
                            <div className={styles.clockGraphic}>
                                <Clock size={28} className={styles.clockIcon} strokeWidth={2} />
                            </div>
                            <div>
                                <div className={styles.overlayTitle}>24/7</div>
                                <div className={styles.overlaySub}>SERVICE</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col */}
                <div className={styles.rightCol}>
                    <div className={styles.eyebrow}>
                        <span className={styles.eyebrowLine} />
                        <Clock size={18} strokeWidth={2.5} />
                        <span>ALWAYS HERE FOR YOU</span>
                    </div>

                    <div className={styles.titleWrap}>
                        <h2 className={styles.title}>
                            Amer 24/7 provides documents pick up and drop off service
                        </h2>
                    </div>

                    <div className={styles.featuresList}>
                        {features.map((feature, i) => (
                            <div key={i} className={styles.featureItem} style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}>
                                <span className={styles.checkWrap}>
                                    <Check size={16} strokeWidth={3} className={styles.checkIcon} />
                                </span>
                                <span className={styles.featureDivider} />
                                <span className={styles.featureText}>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.ctaWrap}>
                        <Link href="/services" className={styles.cta}>
                            <span>Learn More</span>
                            <ArrowRight size={20} strokeWidth={1.5} className={styles.ctaArrow} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
