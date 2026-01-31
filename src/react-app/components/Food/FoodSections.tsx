import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

export interface FoodItem {
  icon: string;
  name: string;
  description: string;
  note?: string; // e.g., distance from Komilio
  mapLink?: string;
  websiteLink?: string;
  additionalIcon?: React.ReactNode;
}

const getIconComponent = (iconName: string) => {
  if (!iconName) return null;
  if (FaIcons[iconName as keyof typeof FaIcons]) {
    const Icon = FaIcons[iconName as keyof typeof FaIcons];
    return <Icon />;
  }
  if (MdIcons[iconName as keyof typeof MdIcons]) {
    const Icon = MdIcons[iconName as keyof typeof MdIcons];
    return <Icon />;
  }
  return null;
};

const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => (
  <div className="food-card">
    <div className="food-card-header">
      {item.icon && <span className="food-icon">{getIconComponent(item.icon)}</span>}
      <span className="food-name">{item.name}</span>
      {/* If you have additionalIcon as a string, you can add similar logic here */}
    </div>
    <div className="food-description">{item.description}</div>
    {item.note && <div className="food-note">Note: {item.note}</div>}
    <div className="food-links">
      {item.mapLink && (
        <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="food-map-link">Map</a>
      )}
      {item.websiteLink && (
        <a href={item.websiteLink} target="_blank" rel="noopener noreferrer" className="food-website-link">Website</a>
      )}
    </div>
  </div>
);

export const FoodSection: React.FC<{ items: FoodItem[] }> = ({ items }) => (
  <div className="food-section">
    <div className="food-cards">
      {items.map((item, idx) => (
        <FoodCard item={item} key={idx} />
      ))}
    </div>
  </div>
);

// No longer needed: FoodSectionsData

export const FoodSections: React.FC<{ items: FoodItem[] }> = ({ items }) => (
  <FoodSection items={items} />
);
