import React from "react";

interface Beach {
  id: string;
  name: string;
  img: string;
  desc: string;
  access: string[];
  notes?: string;
}

interface BeachCardsProps {
  beaches: Beach[];
}

const BeachCards: React.FC<BeachCardsProps> = ({ beaches }) => (
  <div className="beach-cards">
    {beaches.map(beach => (
      <div className="beach-card" key={beach.id}>
        <div className="beach-img-wrap">
          <img src={import.meta.env.BASE_URL + 'src/react-app/assets/' + beach.img} alt={beach.name} className="beach-img" />
        </div>
        <div className="beach-info">
          <h3>{beach.name}</h3>
          <p>{beach.desc}</p>
          <ul className="beach-access">
            {beach.access.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
          {beach.notes && <div className="beach-notes">{beach.notes}</div>}
        </div>
      </div>
    ))}
  </div>
);

export default BeachCards;
