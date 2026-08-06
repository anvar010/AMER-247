"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import styles from "./SearchableSelect.module.css";

// Full-width searchable dropdown — same search/keyboard/outside-click
// pattern as CountryCodeSelect, but for plain string options (no
// flag/dial code) sized to fill a normal form field instead of a
// compact inline trigger.
export default function SearchableSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  error = false,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [query, options]);

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
        id={id}
        type="button"
        className={`${styles.trigger} ${error ? styles.triggerError : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value ? styles.triggerValue : styles.triggerPlaceholder}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={styles.chev} />
      </button>

      {open && (
        <div className={styles.panel} data-lenis-prevent>
          <div className={styles.searchRow}>
            <Search size={14} className={styles.searchIco} />
            <input
              autoFocus
              type="text"
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ul className={styles.list} role="listbox">
            {results.map((o) => (
              <li key={o}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o === value}
                  className={`${styles.option} ${o === value ? styles.optionOn : ""}`}
                  onClick={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                >
                  <span className={styles.optionName}>{o}</span>
                  {o === value && <Check size={15} className={styles.optionCheck} />}
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
