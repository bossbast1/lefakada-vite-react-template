import React from "react";

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
}

const Gallery: React.FC<GalleryProps> = ({ images, open, onClose, current, setCurrent }) => {
  if (!open) return null;
  return (
    <div className="gallery-overlay">
      <button className="gallery-close" onClick={onClose}>&times;</button>
      <button className="gallery-nav gallery-left" onClick={() => setCurrent((current - 1 + images.length) % images.length)}>&#8592;</button>
      <div className="gallery-img-wrap">
        <img src={images[current].src} alt={images[current].alt} className="gallery-img" />
      </div>
      <button className="gallery-nav gallery-right" onClick={() => setCurrent((current + 1) % images.length)}>&#8594;</button>
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
};

export default Gallery;
