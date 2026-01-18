import React, { useRef, useEffect } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  open: boolean;
  onClose: () => void;
  current: number;
  setCurrent: (idx: number) => void;
  autoScroll?: boolean;
}


const Gallery: React.FC<GalleryProps> = ({ images, open, onClose, current, setCurrent, autoScroll }) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const dx = touchEndX.current - touchStartX.current;
      if (dx > 40) setCurrent((current - 1 + images.length) % images.length);
      else if (dx < -40) setCurrent((current + 1) % images.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-scroll for inline galleries (not modal)
  useEffect(() => {
    if (!open && autoScroll) {
      autoScrollRef.current = setInterval(() => {
        setCurrent((current + 1) % images.length);
      }, 5000);
      return () => {
        if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      };
    } else if (open && autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    return undefined;
  }, [open, autoScroll, images.length, setCurrent, current]);

  // Dot indicator
  const Dots = () => (
    <div className="gallery-dots">
      {images.map((_, i) => (
        <span key={i} className={i === current ? "dot active" : "dot"}></span>
      ))}
    </div>
  );

  // Modal gallery
  if (open) {
    return (
      <div className="gallery-overlay">
        <button className="gallery-close" onClick={onClose}>&times;</button>
        <button className="gallery-nav gallery-left" onClick={() => setCurrent((current - 1 + images.length) % images.length)}>&#8592;</button>
        <div className="gallery-img-wrap" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <img src={images[current].src} alt={images[current].alt} className="gallery-img" />
        </div>
        <button className="gallery-nav gallery-right" onClick={() => setCurrent((current + 1) % images.length)}>&#8594;</button>
        <Dots />
        <div className="gallery-thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className={i === current ? "gallery-thumb active" : "gallery-thumb"}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Only modal gallery is supported now
  return null;
};

export default Gallery;
