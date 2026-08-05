import React, { useEffect, useState } from "react";
import LanguageSwitcher, { Lang } from "./LanguageSwitcher";
import HamburgerMenu from "../Extra/HamburgerMenu";

interface HeaderProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  sections: { id: string; label: string }[];
  active: string;
  onNavigate: (id: string) => void;
  onReserve: () => void;
  reserveLabel: string;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({
  lang,
  onLangChange,
  sections,
  active,
  onNavigate,
  onReserve,
  reserveLabel,
  isMobile,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-header site-header-solid" : "site-header"}>
      <div className="site-header-utility">
        <span className="site-header-tagline">AGAVE VILLAS · KOMILIO · LEFKADA</span>
        <LanguageSwitcher lang={lang} onChange={onLangChange} />
      </div>
      <div className="site-header-main">
        {isMobile ? (
          <>
            <button
              type="button"
              className="site-header-burger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
            <button type="button" className="site-header-wordmark" onClick={() => onNavigate("home")}>
              AGAVE VILLAS
            </button>
            <button type="button" className="site-header-reserve" onClick={onReserve}>
              {reserveLabel}
            </button>
            <HamburgerMenu
              open={menuOpen}
              sections={sections}
              current={active}
              onSelect={(id) => {
                onNavigate(id);
                setMenuOpen(false);
              }}
              onClose={() => setMenuOpen(false)}
            />
          </>
        ) : (
          <>
            <button type="button" className="site-header-wordmark" onClick={() => onNavigate("home")}>
              AGAVE VILLAS
            </button>
            <nav className="site-header-nav" aria-label="Main">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  className={active === sec.id ? "site-header-link active" : "site-header-link"}
                  onClick={() => onNavigate(sec.id)}
                >
                  {sec.label}
                </button>
              ))}
            </nav>
            <button type="button" className="site-header-reserve" onClick={onReserve}>
              {reserveLabel}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
