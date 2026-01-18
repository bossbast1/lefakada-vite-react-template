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
      <div className="gallery-img-wrap" style={{ justifyContent: 'center', alignItems: 'center', width: '90vw', height: '90vh', maxWidth: 900, maxHeight: 700 }}>
        <iframe
          src={mapUrl}
          title={name}
          style={{ border: 0, width: '100%', height: '100%', minHeight: 300, borderRadius: 8 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapModal;
