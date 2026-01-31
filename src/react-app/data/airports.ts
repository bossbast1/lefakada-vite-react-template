// src/react-app/data/airports.ts

export interface Airport {
	name: string;
	mapsUrl: string;
	website: string;
}

const airports: Airport[] = [
	{
		name: "Preveza (Aktio) International Airport (PVK)",
		mapsUrl: "https://www.google.com/maps/place/Preveza+International+Airport/@38.9308786,20.7672918,1187",
		website: "https://www.pvk-airport.gr/en"
	},
	{
		name: "Corfu International Airport (CFU)",
		mapsUrl: "https://www.google.com/maps/place/Corfu+International+Airport/@39.6071366,19.9124167,1176",
		website: "https://www.cfu-airport.gr/en"
	}
];

export default airports;
