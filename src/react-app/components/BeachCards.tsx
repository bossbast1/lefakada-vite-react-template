import React from "react";
import BeachCard from "./BeachCard";
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

interface BeachCardsProps {
  beaches: Beach[];
  onCardClick: (beach: Beach) => void;
  onMapClick: (beach: Beach) => void;
  onDirectionsToKomilion: (beach: Beach) => void;
  onDirectionsFromMyLocation: (beach: Beach) => void;
}

const BeachCards: React.FC<BeachCardsProps> = ({
  beaches,
  onCardClick,
  onMapClick,
  onDirectionsToKomilion,
  onDirectionsFromMyLocation,
}) => (
  <div className="beach-cards">
    {beaches.map((beach) => (
      <BeachCard
        key={beach.id}
        beach={beach}
        onCardClick={onCardClick}
        onMapClick={onMapClick}
        onDirectionsToKomilion={onDirectionsToKomilion}
        onDirectionsFromMyLocation={onDirectionsFromMyLocation}
      />
    ))}
  </div>
);

export default BeachCards;
