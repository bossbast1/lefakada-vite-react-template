import React from "react";
import GreekFoodsList from "./GreekFoodsList";
import { FoodSections } from "./FoodSections";

interface FoodSectionProps {
  greekFoods: any[];
  restaurants: any[];
  supermarkets: any[];
  sectionRef?: (el: HTMLElement | null) => void;
}

const FoodSection: React.FC<FoodSectionProps> = ({ greekFoods, restaurants, supermarkets, sectionRef }) => (
  <section
    id="food"
    ref={sectionRef}
    className="lefka-section"
    style={{ background: "#ffffff00", paddingLeft: 0, paddingRight: 0 }}
  >
    <h2 style={{ color: '#0077b6' }}>Food</h2>
    <h3 style={{color: "#f8f9e4"}}>Top 5 Traditional Greek Foods</h3>
    <GreekFoodsList foods={greekFoods} />
    <h3 style={{color: "#f8f9e4"}}>Restaurants & Taverns</h3>
    <FoodSections items={restaurants} />
    <h3 style={{color: "#f8f9e4"}}>Supermarkets & Grocery Stores</h3>
    <FoodSections items={supermarkets} />
  </section>
);

export default FoodSection;
