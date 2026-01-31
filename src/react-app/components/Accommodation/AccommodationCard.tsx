import React from "react";
import type { GalleryImage } from "../Extra/Gallery";

export interface AccommodationFeature {
  icon: React.ReactNode;
  label: string;
  description?: string;
}

export interface AccommodationCardProps {
  title: string;
  images: GalleryImage[];
  tags: AccommodationFeature[];
  description: string;
  points: { title: string; detail: string }[];
  gps: { lat: number; lng: number; label: string; embedUrl: string; gmapsUrl: string; fromAirportUrl: string };
  onGalleryClick: (images: GalleryImage[], startIdx: number) => void;
  onMapEmbed: (embedUrl: string, name: string) => void;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  title,
  images,
  tags,
  description,
  points,
  gps,
  onGalleryClick,
  onMapEmbed,
}) => (
  <div className="accommodation-card">
    <div className="accommodation-img-wrap" style={{ cursor: 'pointer' }} onClick={() => onGalleryClick(images, 0)}>
      <img src={images[0].src} alt={title} className="accommodation-img" />
    </div>
    <div className="accommodation-info">
      <h3>{title}</h3>
      <div className="accommodation-tags">
        {tags.map((tag, i) => (
          <span className="accommodation-tag" key={i} title={tag.description}>
            {tag.icon} {tag.label}
          </span>
        ))}
      </div>
      <div className="accommodation-description">{description}</div>
      <ul className="accommodation-points">
        {points.map((p, i) => (
          <li key={i}>
            <strong>{p.title}:</strong> {p.detail}
          </li>
        ))}
      </ul>
      <div className="accommodation-gps">
        <div><strong>GPS:</strong> {gps.lat}, {gps.lng}</div>
        <div style={{ margin: '0.5rem 0 0.7rem 0', display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <button className="gray-action-btn" onClick={() => onMapEmbed(gps.embedUrl, title)}>Show on Map</button>
          <a className="gray-action-btn" href={gps.gmapsUrl} target="_blank" rel="noopener noreferrer">Directions from current location</a>
          <a className="gray-action-btn" href={gps.fromAirportUrl} target="_blank" rel="noopener noreferrer">From Preveza Aktio Airport</a>
          <a
            className="gray-action-btn"
            href={`https://www.google.com/search?q=${encodeURIComponent(title + ' accommodation lefkada')}&udm=50`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask Google AI
          </a>
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              className="reserve-btn"
              style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(67,233,123,0.15)' }}
              onClick={() => typeof (window as any).onReserveClick === 'function' && (window as any).onReserveClick()}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AccommodationCard;
