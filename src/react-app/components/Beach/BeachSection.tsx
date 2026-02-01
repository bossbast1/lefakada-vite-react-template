import React from "react";
import BeachCards, { Beach } from "./BeachCards";

interface BeachSectionProps {
  t: any;
  onCardClick: (beach: Beach) => void;
  onMapClick: (beach: Beach) => void;
  sectionRef?: (el: HTMLElement | null) => void;
}

const BeachSection: React.FC<BeachSectionProps> = ({ t, onCardClick, onMapClick, sectionRef }) => (
  <section
    id="travel"
    ref={sectionRef}
    className="lefka-section"
    style={{ background: "#ffffff00", paddingLeft: 0, paddingRight: 0 }}
  >
    <h2>{t.travelTitle}</h2>
    <BeachCards
      beaches={t.travelBeaches}
      onCardClick={onCardClick}
      onMapClick={onMapClick}
      onDirectionsToKomilion={(beach: Beach) => window.open(beach.directionsToKomilion, "_blank")}
      onDirectionsFromMyLocation={(beach: Beach) => window.open(beach.directionsFromMyLocation, "_blank")}
    />
    <div className="beach-table-wrap">
      <h4 style={{color: "#f8f9e4"}}>{t.travelTableTitle}</h4>
      <table className="beach-table">
        <thead>
          <tr>
            {t.travelTable.headers.map((h: string, i: number) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.travelTable.rows.map((row: string[], i: number) => (
            <tr key={i}>
              {row.map((cell: string, j: number) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default BeachSection;
