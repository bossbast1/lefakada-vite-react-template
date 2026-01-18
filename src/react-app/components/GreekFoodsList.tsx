import React from "react";

interface GreekFood {
  name: string;
  img: string;
  ingredients: string[];
  process: string;
}

interface GreekFoodsListProps {
  foods: GreekFood[];
}

const GreekFoodsList: React.FC<GreekFoodsListProps> = ({ foods }) => (
  <div className="greek-foods-list">
    {foods.map((food, i) => (
      <div key={i} className="greek-food-card" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '2rem', gap: '2rem' }}>
        <img src={"/src/react-app/assets/" + food.img} alt={food.name} style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: '0.7rem', background: '#eee' }} />
        <div>
          <h4 style={{ margin: 0 }}>{food.name}</h4>
          <div><strong>Ingredients:</strong> <ul style={{ margin: 0, paddingLeft: 18 }}>{food.ingredients.map((ing, j) => <li key={j}>{ing}</li>)}</ul></div>
          <div style={{ marginTop: 8 }}><strong>Process:</strong> {food.process}</div>
        </div>
      </div>
    ))}
  </div>
);

export default GreekFoodsList;
