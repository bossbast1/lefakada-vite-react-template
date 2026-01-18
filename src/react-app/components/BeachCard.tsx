import React from "react";
import Gallery, { GalleryImage } from "./Gallery";

interface Beach {
  id: string;
  name: string;
  img: string;
  desc: string;
  access: string[];
  notes?: string;
  gallery?: GalleryImage[];
  mapUrl?: string;
  directionsToKomilion?: string;
  directionsFromMyLocation?: string;
}

interface BeachCardProps {
  beach: Beach;
  onCardClick: (beach: Beach) => void;
  onMapClick: (beach: Beach) => void;
  onDirectionsToKomilion: (beach: Beach) => void;
  onDirectionsFromMyLocation: (beach: Beach) => void;
}

const BeachCard: React.FC<BeachCardProps> = ({
  beach,
  onCardClick,
  onMapClick,
  onDirectionsToKomilion,
  onDirectionsFromMyLocation,
}) => (
  <div className="beach-card" key={beach.id}>
    <div
      className="beach-img-wrap"
      onClick={() => onCardClick(beach)}
      style={{
        height: "200px",
        width: "100%",
        padding: 0,
        margin: 0,
        background: "none",
        position: "relative"
      }}
    >
      <img
        src={import.meta.env.BASE_URL + "src/react-app/assets/" + beach.img}
        alt={beach.name}
        className="beach-img"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          background: "none",
        }}
      />
      <span className="beach-finger-icon">
        <img src={import.meta.env.BASE_URL + "src/react-app/assets/finger.svg"} alt="Tap to view" style={{width: 32, height: 32, opacity: 0.7, display: 'none'}} className="beach-finger-img" />
      </span>
    </div>
    <div className="beach-info">
      <h3>{beach.name}</h3>
      <p>{beach.desc}</p>
      <ul className="beach-access">
        {beach.access.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
      {beach.notes && <div className="beach-notes">{beach.notes}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginTop: 8 }}>
        {beach.mapUrl && (
          <button className="gray-action-btn" onClick={() => onMapClick(beach)}>
            View on Map
          </button>
        )}
        {beach.directionsToKomilion && (
          <button className="gray-action-btn" onClick={() => onDirectionsToKomilion(beach)}>
            Directions to Komilio
          </button>
        )}
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(beach.name + ' beach lefkada')}&udm=50`}
          target="_blank"
          rel="noopener noreferrer"
          className="gray-action-btn"
        >
          Ask Google AI
        </a>
      </div>
    </div>
  </div>
);

export default BeachCard;
