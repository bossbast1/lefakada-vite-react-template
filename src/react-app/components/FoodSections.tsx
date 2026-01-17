import React from "react";

export interface FoodItem {
  icon: React.ReactNode;
  name: string;
  description: string;
  note?: string; // e.g., distance from Komilio
  mapLink?: string;
  websiteLink?: string;
  additionalIcon?: React.ReactNode;
}

interface FoodSectionProps {
  title: string;
  items: FoodItem[];
}

const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => (
  <div className="food-card">
    <div className="food-card-header">
      {item.icon && <span className="food-icon">{item.icon}</span>}
      <span className="food-name">{item.name}</span>
      {item.additionalIcon && <span className="food-additional-icon">{item.additionalIcon}</span>}
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

export const FoodSection: React.FC<FoodSectionProps> = ({ title, items }) => (
  <div className="food-section">
    <h3>{title}</h3>
    <div className="food-cards">
      {items.map((item, idx) => (
        <FoodCard item={item} key={idx} />
      ))}
    </div>
  </div>
);

export interface FoodSectionsData {
  supermarkets: FoodItem[];
  restaurants: FoodItem[];
  gasStations: FoodItem[];
}

export const FoodSections: React.FC<{ data: FoodSectionsData }> = ({ data }) => (
  <div>
    if (data.restaurants.length) {<FoodSection title="Supermarkets & Grocery Stores" items={data.supermarkets} />}
    {data.restaurants.length && <FoodSection title="Restaurants & Taverns" items={data.restaurants} />}
    {data.gasStations.length && <FoodSection title="Gas Stations (Petrol / Fuel)" items={data.gasStations} />} 
  </div>
);
