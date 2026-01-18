import React from "react";
import AirportCard from "./AirportCard";
import CarRentalsList from "./CarRentalsList";
import GasStationsList from "./GasStationsList";

interface TransportSectionProps {
  airports: { name: string; mapsUrl: string; website: string }[];
  carRentals: { name: string; url: string }[];
  gasStations: any[];
  sectionRef?: (el: HTMLElement | null) => void;
}

const TransportSection: React.FC<TransportSectionProps> = ({ airports, carRentals, gasStations, sectionRef }) => (
  <section
    id="transport"
    ref={sectionRef}
    className="lefka-section"
  >
    <h2>Transport</h2>
    <div className="transport-airports">
      <h3>Airports</h3>
      {airports.map((airport, i) => (
        <AirportCard key={i} name={airport.name} mapsUrl={airport.mapsUrl} website={airport.website} />
      ))}
    </div>
    <CarRentalsList rentals={carRentals} />
    <GasStationsList stations={gasStations} />
  </section>
);

export default TransportSection;
