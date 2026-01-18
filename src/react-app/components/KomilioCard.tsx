import React from "react";

interface KomilioCardProps {
  title?: string;
  desc?: string;
  children?: React.ReactNode;
}

const KomilioCard: React.FC<KomilioCardProps> = ({ title, desc, children }) => (
  <div className="komilio-card">
    {title && <h3>{title}</h3>}
    {desc && <p>{desc}</p>}
    {children}
  </div>
);

export default KomilioCard;
