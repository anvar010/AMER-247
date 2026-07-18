"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { COUNTRY_CODES, findCountry } from "@/lib/countryCodes";
import styles from "./CountryCodeSelect.module.css";

export default function CountryCodeSelect({
  value,
  onChange,
  label = "Country code",
}: {
  value: string;
  onChange: (iso2: string) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const current = findCountry(value);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRY_CODES;
    return COUNTRY_CODES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <div className={`${styles.root} ${open ? styles.rootOpen : ""}`} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
      >
        <img src={`https://flagcdn.com/w40/${current.iso2}.png`} alt="" className={styles.flag} />
        <span>{current.dial}</span>
        <ChevronDown size={14} className={styles.chev} />
      </button>

      {open && (
        <div className={styles.panel} data-lenis-prevent>
          <div className={styles.searchRow}>
            <Search size={14} className={styles.searchIco} />
            <input
              autoFocus
              type="text"
              className={styles.searchInput}
              placeholder="Search country or code…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ul className={styles.list} role="listbox">
            {results.map((c) => (
              <li key={c.iso2}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.iso2 === value}
                  className={`${styles.option} ${c.iso2 === value ? styles.optionOn : ""}`}
                  onClick={() => {
                    onChange(c.iso2);
                    setOpen(false);
                  }}
                >
                  <img src={`https://flagcdn.com/w40/${c.iso2}.png`} alt="" className={styles.flag} />
                  <span className={styles.optionName}>{c.name}</span>
                  <span className={styles.optionDial}>{c.dial}</span>
                  {c.iso2 === value && <Check size={15} className={styles.optionCheck} />}
                </button>
              </li>
            ))}
            {results.length === 0 && <li className={styles.empty}>No matches</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
