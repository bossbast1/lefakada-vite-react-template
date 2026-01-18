import React from "react";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  sectionRef?: (el: HTMLElement | null) => void;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, sectionRef, className }) => (
  <section
    id={id}
    ref={sectionRef}
    className={className || "lefka-section"}
  >
    <h2>{title}</h2>
    {children}
  </section>
);

export default Section;
