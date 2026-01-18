import React from "react";

interface HamburgerMenuProps {
  open: boolean;
  sections: { id: string; label: string }[];
  current: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ open, sections, current, onSelect, onClose }) => {
  if (!open) return null;
  return (
    <div className="hamburger-menu-overlay" onClick={onClose}>
      <nav className="hamburger-menu" onClick={e => e.stopPropagation()}>
        {sections.map((sec) => (
          <button
            key={sec.id}
            className={sec.id === current ? "active" : ""}
            onClick={() => { onSelect(sec.id); onClose(); }}
          >
            {sec.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HamburgerMenu;
