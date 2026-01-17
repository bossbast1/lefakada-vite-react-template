import React from "react";

import type { GalleryImage } from "./Gallery";
import AccommodationCard, { AccommodationFeature } from "./AccommodationCard";

export interface AccommodationData {
  title: string;
  images: GalleryImage[];
  tags: AccommodationFeature[];
  description: string;
  points: { title: string; detail: string }[];
  gps: { lat: number; lng: number; label: string; embedUrl: string; gmapsUrl: string; fromAirportUrl: string };
}

interface AccommodationCardsProps {
  data: AccommodationData[];
  onGalleryClick: (images: GalleryImage[], startIdx: number) => void;
  onMapEmbed: (embedUrl: string, name: string) => void;
}

const AccommodationCards: React.FC<AccommodationCardsProps> = ({ data, onGalleryClick, onMapEmbed }) => (
  <div className="accommodation-cards">
    {data.map((accom, i) => (
      <AccommodationCard
        key={i}
        {...accom}
        onGalleryClick={onGalleryClick}
        onMapEmbed={onMapEmbed}
      />
    ))}
  </div>
);

export default AccommodationCards;
