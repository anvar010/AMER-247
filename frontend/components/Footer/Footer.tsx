import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const useful = [
    "Privacy Policy",
    "Refund Policy",
    "Terms & Conditions",
    "Careers",
    "Covid Testing",
    "Contact",
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <img src="/logos/amer.webp" alt="Amer 24/7" className={styles.logo} />
          <p className={styles.tagline}>We are open 24 hrs all days.</p>
          <p className={styles.copy}>
            We take pride in simplifying visa and immigration application
            procedures and thus making your life easier. The only Amer center
            to operate 24 hours every day.
          </p>
          <div className={styles.socials}>
            <Link href="#" aria-label="Facebook" className={styles.social}><Facebook size={16} /></Link>
            <Link href="#" aria-label="X" className={styles.social}><Twitter size={16} /></Link>
            <Link href="#" aria-label="Instagram" className={styles.social}><Instagram size={16} /></Link>
            <Link href="#" aria-label="YouTube" className={styles.social}><Youtube size={16} /></Link>
          </div>
        </div>

        <div>
          <h4 className={styles.heading}>Useful Links</h4>
          <ul className={styles.list}>
            {useful.map((l) => (
              <li key={l}><Link href="#" className={styles.link}>{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Contact Info</h4>
          <ul className={styles.contactList}>
            <li><span className={styles.tag}>E:</span> info@amer247.com</li>
            <li><span className={styles.tag}>P:</span> +971 4 2300500</li>
            <li className={styles.fax}>
              <span className={styles.faxBar}></span>
              <span><span className={styles.tag}>F:</span> +971 4 2300510</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Address</h4>
          <p className={styles.address}>
            24 Seven Government Transaction Center LLC 17 A Street – Al Khabaisi
            (Behind Abu Baker Al Siddique Metro Station ) – Deira – Dubai,
            UAE.P.O.Box: 81143
          </p>
          <div className={styles.mapWrap}>
            <span className={styles.mapBar}></span>
            <Link href="#" className={styles.mapLink}>
              Follow Map <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.pay}>
        <p className={styles.payText}>
          We accept payments online using Visa and MasterCard credit/debit card in AED
        </p>
        <div className={styles.payLogos}>
          <span className={styles.payCard} aria-label="Visa">
            <svg viewBox="0 0 80 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <text x="40" y="20" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="22" letterSpacing="1" fill="#1A1F71">VISA</text>
            </svg>
          </span>
          <span className={styles.payCard} aria-label="Mastercard">
            <svg viewBox="0 0 48 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="19" cy="15" r="11" fill="#EB001B" />
              <circle cx="29" cy="15" r="11" fill="#F79E1B" fillOpacity="0.9" />
              <path d="M24 7.5a11 11 0 0 1 0 15 11 11 0 0 1 0-15z" fill="#FF5F00" />
            </svg>
          </span>
          <span className={styles.payCard} aria-label="American Express">
            <svg viewBox="0 0 80 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="80" height="26" rx="3" fill="#1F72CD" />
              <text x="40" y="18" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight="900" fontSize="11" letterSpacing="1" fill="#fff">AMERICAN</text>
              <text x="40" y="24" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontWeight="900" fontSize="6" letterSpacing="2" fill="#fff">EXPRESS</text>
            </svg>
          </span>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <div>© {new Date().getFullYear()} Amer 24/7. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
