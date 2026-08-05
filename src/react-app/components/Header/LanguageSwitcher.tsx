import React, { useEffect, useRef, useState } from "react";
import { FlagEN, FlagGR } from "./flags";

export type Lang = "en" | "gr";

const LANGS: { code: Lang; label: string; Flag: React.FC<{ size?: number }> }[] = [
  { code: "en", label: "English", Flag: FlagEN },
  { code: "gr", label: "Ελληνικά", Flag: FlagGR },
];

interface LanguageSwitcherProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lang, onChange }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-switcher-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={current.label}
        onClick={() => setOpen((o) => !o)}
      >
        <current.Flag size={22} />
        <svg
          className={open ? "lang-caret lang-caret-open" : "lang-caret"}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label="Language">
          {LANGS.map(({ code, label, Flag }) => (
            <li key={code} role="option" aria-selected={code === lang}>
              <button
                type="button"
                className={code === lang ? "lang-option lang-option-active" : "lang-option"}
                onClick={() => {
                  onChange(code);
                  setOpen(false);
                }}
              >
                <Flag size={20} />
                <span>{label}</span>
                {code === lang && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
