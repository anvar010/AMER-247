import Link from "next/link";
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Outfit } from "next/font/google";
import styles from "./MobileAppFooter.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const pageLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Careers", href: "/career" },
  // Covid Testing hidden for now.
  // { label: "Covid Testing", href: "/covid-testing" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: Facebook, url: "https://www.facebook.com/Amer247service/" },
  { icon: Instagram, url: "https://www.instagram.com/amer_247/?hl=en" },
  { icon: Youtube, url: "https://www.youtube.com/@amer247-visaandresidencyse3" },
  { icon: Twitter, url: "https://x.com/amer24_7?lang=en" },
];

export default function MobileAppFooter() {
  return (
    <div className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.card}>
        <img src="/logos/amernew-cropped.webp" alt="Amer 24/7" className={styles.logo} />
        <p className={styles.tag}>We are open 24 hours, all days.</p>

        <div className={styles.rows}>
          <div className={styles.row}>
            <MapPin size={16} className={styles.icon} />
            <span className={styles.rowTxt}>
              17 A Street – Al Khabaisi, Deira – Dubai, UAE. P.O. Box 81143
            </span>
          </div>
          <div className={styles.row}>
            <Mail size={16} className={styles.icon} />
            <span className={styles.rowTxt}>info@amer247.com</span>
          </div>
          <div className={styles.row}>
            <Phone size={16} className={styles.icon} />
            <span className={styles.rowTxt}>+971 4 2300500</span>
          </div>
        </div>

        <div className={styles.links}>
          {pageLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
          ))}
        </div>

        <div className={styles.socials}>
          {socials.map(({ icon: Icon, url }, i) => (
            <Link key={i} href={url} target="_blank" rel="noopener noreferrer" className={styles.social}>
              <Icon size={16} />
            </Link>
          ))}
        </div>
      </div>

      <p className={styles.legal}>© {new Date().getFullYear()} Amer 24/7. All rights reserved.</p>
    </div>
  );
}
