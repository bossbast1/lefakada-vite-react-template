import React from "react";

interface ExtraServicesProps {
  services: { title: string; detail: string }[];
}

const ExtraServices: React.FC<ExtraServicesProps> = ({ services }) => (
  <div className="accommodation-extra-services">
    <h3>What else we can provide</h3>
    <ul>
      {services.map((s, i) => (
        <li key={i}><strong>{s.title}:</strong> {s.detail}</li>
      ))}
    </ul>
  </div>
);

export default ExtraServices;
