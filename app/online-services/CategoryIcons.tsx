/* Inline SVG illustrations for the online-services category tabs.
   Each is a 48×48 viewBox optimized for crisp display at any size. */

type IconProps = { size?: number; className?: string };

const baseProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

const stroke = "currentColor";
const accent = "var(--brand-gold, #C9A24B)";

export function AmerIcon({ size = 36, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} aria-hidden="true">
      {/* badge backdrop */}
      <rect x="4" y="4" width="40" height="40" rx="9"
        stroke={stroke} strokeWidth="1.6" />
      {/* stylized "A" mark */}
      <path d="M14 34 L22 14 L30 34" stroke={stroke} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5 27 L26.5 27" stroke={stroke} strokeWidth="2"
        strokeLinecap="round" />
      {/* gold accent dot */}
      <circle cx="35" cy="14" r="2.6" fill={accent} />
      {/* base bar */}
      <path d="M12 38 L36 38" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function EmiratesIdIcon({ size = 36, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} aria-hidden="true">
      {/* card outline */}
      <rect x="5" y="10" width="38" height="28" rx="3.5"
        stroke={stroke} strokeWidth="1.6" />
      {/* top notch / chip strip */}
      <path d="M5 18 H43" stroke={stroke} strokeWidth="1.2" opacity="0.55" />
      {/* portrait circle */}
      <circle cx="16" cy="26" r="3.4" stroke={stroke} strokeWidth="1.6" />
      <path d="M10.5 33.5 C11.5 30.5 14.5 29 16 29 C17.5 29 20.5 30.5 21.5 33.5"
        stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      {/* info lines */}
      <path d="M27 23 H39" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M27 28 H37" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M27 33 H35" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
      {/* small globe accent */}
      <circle cx="38" cy="12" r="2.2" fill={accent} opacity="0.9" />
    </svg>
  );
}

export function GoldenVisaIcon({ size = 36, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} aria-hidden="true">
      {/* passport */}
      <rect x="10" y="5" width="28" height="38" rx="2.5"
        stroke={stroke} strokeWidth="1.6" />
      <path d="M14 5 V43" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
      {/* globe emblem */}
      <circle cx="26" cy="18" r="5.5" stroke={stroke} strokeWidth="1.6" />
      <ellipse cx="26" cy="18" rx="2.2" ry="5.5" stroke={stroke} strokeWidth="1.2" />
      <path d="M20.5 18 H31.5" stroke={stroke} strokeWidth="1.2" />
      {/* star accent (golden) */}
      <path d="M26 28.5 L27 31 L29.6 31.2 L27.6 33 L28.2 35.6 L26 34.2 L23.8 35.6 L24.4 33 L22.4 31.2 L25 31 Z"
        fill={accent} />
      {/* lines */}
      <path d="M17 39 H35" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 42 H30" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function TasheelIcon({ size = 36, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} aria-hidden="true">
      {/* document */}
      <path d="M11 6 H30 L37 13 V42 H11 Z" stroke={stroke} strokeWidth="1.6"
        strokeLinejoin="round" />
      <path d="M30 6 V13 H37" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      {/* stamp / signature mark */}
      <circle cx="18" cy="23" r="3.6" stroke={accent} strokeWidth="1.8" />
      <path d="M14.5 28 L21.5 21" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
      {/* lines */}
      <path d="M25 22 H33" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 33 H33" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <path d="M14 37 H28" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function MedicalIcon({ size = 36, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} aria-hidden="true">
      {/* report */}
      <rect x="6" y="6" width="24" height="36" rx="2.5"
        stroke={stroke} strokeWidth="1.6" />
      {/* clip */}
      <rect x="14" y="3.5" width="8" height="5" rx="1.2"
        stroke={stroke} strokeWidth="1.4" />
      {/* heartbeat line */}
      <path d="M10 18 H14 L16 14 L19 22 L21 17 L26 17"
        stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* lines */}
      <path d="M10 26 H26" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      <path d="M10 30 H22" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      {/* test tube */}
      <path d="M33 14 V32 A4 4 0 0 0 41 32 V14"
        stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M31.5 14 H42.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M33 28 V32 A4 4 0 0 0 41 32 V28 Z" fill={accent} opacity="0.85" />
    </svg>
  );
}

export function InsuranceIcon({ size = 36, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} aria-hidden="true">
      {/* shield */}
      <path d="M24 5 L40 10 V22 C40 31 33 38 24 42 C15 38 8 31 8 22 V10 Z"
        stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      {/* cross */}
      <path d="M24 16 V28" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 22 H30" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
      {/* envelope hint */}
      <path d="M14 32 L24 36 L34 32" stroke={stroke} strokeWidth="1.3"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </svg>
  );
}
