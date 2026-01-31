import React from "react";

interface CarRental {
  name: string;
  url: string;
}

interface CarRentalsListProps {
  rentals: CarRental[];
}

const CarRentalsList: React.FC<CarRentalsListProps> = ({ rentals }) => (
  <div className="transport-rentals">
    <h3>Car Rentals</h3>
    <ul>
      {rentals.map((rental, i) => (
        <li key={i}><strong>{rental.name}</strong> – <a href={rental.url} target="_blank" rel="noopener noreferrer">{rental.url.replace('https://', '').replace('www.', '')}</a></li>
      ))}
    </ul>
  </div>
);

export default CarRentalsList;
