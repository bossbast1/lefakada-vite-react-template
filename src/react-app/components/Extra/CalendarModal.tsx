
import React, { useEffect, useState } from "react";

interface CalendarModalProps {
  open: boolean;
  onClose: () => void;
  calendarUrl: string;
}


const CalendarModal: React.FC<CalendarModalProps> = ({ open, onClose, calendarUrl }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsFullscreen(w < 700 || h < 700);
      setIsPortrait(h < w ? false : true); // portrait: h >= w
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!open) return null;

  // Overlay for fullscreen mode
  const overlayClass = isFullscreen ? "calendar-overlay-fullscreen" : "gallery-overlay";

  // Only show the close/Booking overlay on the bigger side, but do NOT overlap the iframe
  let overlayDiv = null;
  if (isFullscreen) {
    if (isPortrait) {
      // Portrait: overlay on top right (X in right corner, Booking vertical)
      overlayDiv = (
        <div className="calendar-side-overlay calendar-side-top">
          <div className="calendar-booking-text portrait">Booking</div>
          <button className="calendar-close portrait" onClick={onClose}>&times;</button>
        </div>
      );
    } else {
      // Landscape: overlay on right
      overlayDiv = (
        <div className="calendar-side-overlay calendar-side-right">
          <button className="calendar-close" onClick={onClose}>&times;</button>
          <div className="calendar-booking-text">Booking</div>
        </div>
      );
    }
  } else {
    // Desktop: show close button as before
    overlayDiv = (
      <button className="gallery-close" onClick={onClose}>&times;</button>
    );
  }

  return (
    <div className={overlayClass}>
      <div
        className="gallery-img-wrap calendar-img-wrap"
        style={
          isFullscreen
            ? {
                maxWidth: '100vw',
                maxHeight: '100vh',
                width: '100%',
                height: '100%',
                borderRadius: 0,
                display: 'flex',
                flexDirection: isPortrait ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                overflow: 'hidden',
              }
            : {
                justifyContent: 'center',
                alignItems: 'center',
                width: '90vw',
                height: '90vh',
                maxWidth: 900,
                maxHeight: 700,
                position: 'relative',
              }
        }
      >
        {isFullscreen && isPortrait && (
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: '0 0 auto', maxWidth: '100vw'}}>
            {overlayDiv}
          </div>
        )}
        <iframe
          src={calendarUrl}
          title="Reservation Calendar"
          className="calendar-iframe"
          allowFullScreen
        />
        {isFullscreen && !isPortrait && overlayDiv}
      </div>
      {/* Desktop: show close button outside image wrap */}
      {!isFullscreen && overlayDiv}
    </div>
  );
};

export default CalendarModal;
