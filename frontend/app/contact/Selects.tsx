"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import styles from "./contact.module.css";

/* ===========================================================
   Country code select (with flag images)
   =========================================================== */

export type Country = { code: string; iso: string; name: string };

export const countries: Country[] = [
  { code: "+971", iso: "ae", name: "United Arab Emirates" },
  { code: "+966", iso: "sa", name: "Saudi Arabia" },
  { code: "+974", iso: "qa", name: "Qatar" },
  { code: "+973", iso: "bh", name: "Bahrain" },
  { code: "+965", iso: "kw", name: "Kuwait" },
  { code: "+968", iso: "om", name: "Oman" },
  { code: "+1",   iso: "us", name: "United States" },
  { code: "+44",  iso: "gb", name: "United Kingdom" },
  { code: "+91",  iso: "in", name: "India" },
  { code: "+92",  iso: "pk", name: "Pakistan" },
  { code: "+63",  iso: "ph", name: "Philippines" },
  { code: "+20",  iso: "eg", name: "Egypt" },
  { code: "+962", iso: "jo", name: "Jordan" },
  { code: "+961", iso: "lb", name: "Lebanon" },
  { code: "+90",  iso: "tr", name: "Turkey" },
  { code: "+49",  iso: "de", name: "Germany" },
  { code: "+33",  iso: "fr", name: "France" },
  { code: "+39",  iso: "it", name: "Italy" },
  { code: "+34",  iso: "es", name: "Spain" },
  { code: "+86",  iso: "cn", name: "China" },
  { code: "+81",  iso: "jp", name: "Japan" },
  { code: "+82",  iso: "kr", name: "South Korea" },
  { code: "+61",  iso: "au", name: "Australia" },
  { code: "+1",   iso: "ca", name: "Canada" },
  { code: "+27",  iso: "za", name: "South Africa" },
  { code: "+234", iso: "ng", name: "Nigeria" },
  { code: "+880", iso: "bd", name: "Bangladesh" },
  { code: "+94",  iso: "lk", name: "Sri Lanka" },
  { code: "+977", iso: "np", name: "Nepal" },
  { code: "+62",  iso: "id", name: "Indonesia" },
  { code: "+60",  iso: "my", name: "Malaysia" },
  { code: "+65",  iso: "sg", name: "Singapore" },
];

function flagSrc(iso: string) {
  return `https://flagcdn.com/w40/${iso}.png`;
}
function flagSrcSet(iso: string) {
  return `https://flagcdn.com/w40/${iso}.png 1x, https://flagcdn.com/w80/${iso}.png 2x`;
}

export function CountryCodeSelect({
  name = "countryCode",
  defaultIso = "ae",
}: {
  name?: string;
  defaultIso?: string;
}) {
  const initial = countries.find((c) => c.iso === defaultIso) ?? countries[0];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Country>(initial);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.cs} ${open ? styles.csOpen : ""}`}>
      <button
        type="button"
        className={styles.csBtn}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img
          src={flagSrc(selected.iso)}
          srcSet={flagSrcSet(selected.iso)}
          alt=""
          width={22}
          height={16}
          className={styles.csFlag}
          loading="lazy"
        />
        <span className={styles.csCode}>{selected.code}</span>
        <ChevronDown size={14} className={styles.csChevron} aria-hidden="true" />
      </button>
      <input type="hidden" name={name} value={selected.code} />

      {open && (
        <ul className={styles.csPanel} role="listbox">
          {countries.map((c) => (
            <li key={`${c.iso}-${c.code}`}>
              <button
                type="button"
                role="option"
                aria-selected={selected.iso === c.iso}
                className={`${styles.csOption} ${selected.iso === c.iso ? styles.csOptionActive : ""}`}
                onClick={() => {
                  setSelected(c);
                  setOpen(false);
                }}
              >
                <img
                  src={flagSrc(c.iso)}
                  srcSet={flagSrcSet(c.iso)}
                  alt=""
                  width={22}
                  height={16}
                  className={styles.csFlag}
                  loading="lazy"
                />
                <span className={styles.csOptionName}>{c.name}</span>
                <span className={styles.csOptionCode}>{c.code}</span>
                {selected.iso === c.iso && (
                  <Check size={14} className={styles.csCheck} aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ===========================================================
   Generic option select (used by "Reason for contact")
   =========================================================== */

export function OptionSelect({
  name,
  options,
  placeholder = "Select an option…",
  required = false,
}: {
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.cs} ${styles.csWide} ${open ? styles.csOpen : ""}`}>
      <button
        type="button"
        className={`${styles.csBtn} ${styles.csBtnWide}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`${styles.csValue} ${!selected ? styles.csPlaceholder : ""}`}>
          {selected || placeholder}
        </span>
        <ChevronDown size={16} className={styles.csChevron} aria-hidden="true" />
      </button>
      <input type="hidden" name={name} value={selected} required={required} />

      {open && (
        <ul className={`${styles.csPanel} ${styles.csPanelWide}`} role="listbox">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={selected === opt}
                className={`${styles.csOption} ${selected === opt ? styles.csOptionActive : ""}`}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
              >
                <span className={styles.csOptionName}>{opt}</span>
                {selected === opt && (
                  <Check size={14} className={styles.csCheck} aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
