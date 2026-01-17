import React from "react";

interface MapModalProps {
  open: boolean;
  onClose: () => void;
  mapUrl: string;
  name: string;
}

const MapModal: React.FC<MapModalProps> = ({ open, onClose, mapUrl, name }) => {
  if (!open) return null;
  return (
    <div className="gallery-overlay">
      <button className="gallery-close" onClick={onClose}>&times;</button>
      <div className="gallery-img-wrap" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <iframe
          src={mapUrl}
          title={name}
          width="90%"
          height="500"
          style={{ border: 0, borderRadius: '1rem', boxShadow: '0 4px 32px rgba(0,0,0,0.25)', background: '#fff' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapModal;
