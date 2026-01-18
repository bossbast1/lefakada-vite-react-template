import React from "react";

interface AirportCardProps {
  name: string;
  mapsUrl: string;
  website: string;
}

const AirportCard: React.FC<AirportCardProps> = ({ name, mapsUrl, website }) => (
  <div className="airport-card">
    <strong>{name}</strong><br />
    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps</a> | <a href={website} target="_blank" rel="noopener noreferrer">Official Website</a>
  </div>
);

export default AirportCard;
