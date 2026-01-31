import React from "react";
import AccommodationCards from "./AccommodationCards";
import ExtraServices from "../Extra/ExtraServices";
import KomilioCard from "../Trips/KomilioCard";

interface AccommodationSectionProps {
  t: any;
  data: any[];
  extraServices: { title: string; detail: string }[];
  onGalleryClick: (images: any[], idx: number) => void;
  onMapEmbed: (embedUrl: string, name: string) => void;
  sectionRef?: (el: HTMLElement | null) => void;
}

const AccommodationSection: React.FC<AccommodationSectionProps> = ({ t, data, extraServices, onGalleryClick, onMapEmbed, sectionRef }) => (
  <section
    id="accommodation"
    ref={sectionRef}
    className="lefka-section"
    style={{ background: "#ffffff66" }}
  >
    <h2>{t.accomTitle}</h2>
    <AccommodationCards
      data={data}
      onGalleryClick={onGalleryClick}
      onMapEmbed={onMapEmbed}
    />
    <ExtraServices services={extraServices} />
    <KomilioCard title="About Komilio (Komílion)">
      Komilio is a traditional mountain village in southern Lefkada, known for its peaceful atmosphere, beautiful views, and proximity to the island’s best beaches. It’s a great base for exploring the region and enjoying authentic Greek village life.
    </KomilioCard>
  </section>
);

export default AccommodationSection;
