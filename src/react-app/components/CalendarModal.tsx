import React from "react";

interface CalendarModalProps {
  open: boolean;
  onClose: () => void;
  calendarUrl: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ open, onClose, calendarUrl }) => {
  if (!open) return null;
  return (
    <div className="gallery-overlay">
      <button className="gallery-close" onClick={onClose}>&times;</button>
      <div className="gallery-img-wrap" style={{ justifyContent: 'center', alignItems: 'center', width: '90vw', height: '90vh', maxWidth: 900, maxHeight: 700 }}>
        <iframe
          src={calendarUrl}
          title="Reservation Calendar"
          style={{ border: 0, width: '100%', height: '100%', minHeight: 300, borderRadius: 8 }}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default CalendarModal;
