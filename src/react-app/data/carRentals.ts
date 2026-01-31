// src/react-app/data/carRentals.ts

export interface CarRental {
	name: string;
	url: string;
}

const carRentals: CarRental[] = [
	{ name: "Ionian Rent a Car", url: "https://www.ionianrentacar.com" },
	{ name: "EasyDrive Lefkada", url: "https://www.easydrivelefkada.com" },
	{ name: "Sunshine Rentals", url: "https://www.sunshinerentals.gr" }
];

export default carRentals;
