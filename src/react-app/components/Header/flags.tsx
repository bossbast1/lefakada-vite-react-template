import React from "react";

interface FlagProps {
  size?: number;
}

export const FlagEN: React.FC<FlagProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" className="flag-icon" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="flag-clip-en">
        <circle cx="11" cy="11" r="11" />
      </clipPath>
    </defs>
    <g clipPath="url(#flag-clip-en)">
      <rect width="22" height="22" fill="#012169" />
      <path d="M0 0L22 22M22 0L0 22" stroke="#fff" strokeWidth="4" />
      <path d="M0 0L22 22M22 0L0 22" stroke="#C8102E" strokeWidth="2" />
      <path d="M11 0V22M0 11H22" stroke="#fff" strokeWidth="7" />
      <path d="M11 0V22M0 11H22" stroke="#C8102E" strokeWidth="4" />
    </g>
  </svg>
);

export const FlagGR: React.FC<FlagProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" className="flag-icon" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="flag-clip-gr">
        <circle cx="11" cy="11" r="11" />
      </clipPath>
    </defs>
    <g clipPath="url(#flag-clip-gr)">
      <rect width="22" height="22" fill="#0D5EAF" />
      <path d="M0 3.7H22M0 8.6H22M0 13.4H22M0 18.3H22" stroke="#fff" strokeWidth="2.4" />
      <rect width="10" height="10" fill="#0D5EAF" />
      <path d="M5 0V10M0 5H10" stroke="#fff" strokeWidth="2.4" />
    </g>
  </svg>
);
