import React from "react";

interface GasStation {
  name: string;
  description: string;
  note: string;
  mapLink?: string;
}

interface GasStationsListProps {
  stations: GasStation[];
}

const GasStationsList: React.FC<GasStationsListProps> = ({ stations }) => (
  <div className="transport-gas">
    <h3>Gas Stations</h3>
    <ul>
      {stations.map((station, i) => (
        <li key={i}>
          <strong>{station.name}</strong> – {station.description} <span style={{ color: "black" /* '#888' */ }}>{station.note}</span>
          {station.mapLink && (
            <a href={station.mapLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>Map</a>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default GasStationsList;
