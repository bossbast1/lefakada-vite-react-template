import React from "react";

interface TripsSectionProps {
  t: any;
  sectionRef?: (el: HTMLElement | null) => void;
}

const TripsSection: React.FC<TripsSectionProps> = ({ t, sectionRef }) => (
  <section
    id="trips"
    ref={sectionRef}
    className="lefka-section"
  >
    <h2>{t.tripsTitle}</h2>
    <p>{t.tripsDesc}</p>
  </section>
);

export default TripsSection;
