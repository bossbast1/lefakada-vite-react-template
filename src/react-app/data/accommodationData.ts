// src/react-app/data/accommodationData.ts
import { FaBroom, FaHome, FaWifi, FaUsers, FaUtensils, FaCouch, FaSun, FaBasketballBall, FaSmokingBan, FaDog, FaParking, FaSwimmingPool } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";


const sharedFeatures = [
	{ icon: "FaBroom", label: "Cleaning", description: "Once per 3 days or on agreement" },
	{ icon: "FaHome", label: "Entire place", description: "You have the whole accommodation for yourself" },
	{ icon: "FaWifi", label: "Free Wi-Fi" },
	{ icon: "FaUsers", label: "Family rooms" },
	{ icon: "FaUtensils", label: "BBQ facilities" },
	{ icon: "MdOutlineBakeryDining", label: "Bakery delivery", description: "Personal bakery delivery in the morning" },
	{ icon: "FaCouch", label: "Balcony" },
	{ icon: "FaSun", label: "Terrace" },
	{ icon: "FaBasketballBall", label: "Public basketball court (20m)" },
	{ icon: "FaSmokingBan", label: "Non-smoking rooms" },
	{ icon: "FaDog", label: "No pets" },
];

const accommodationData = [
	{
		title: "Komilio 1 - Agave Villas",
		images: [
			{ src: "/src/react-app/assets/komilio1.jpg", alt: "Komilio 1 - Agave Villas" },
			{ src: "/src/react-app/assets/komilio2.jpg", alt: "Komilio 2 - Agave Villas" },
		],
		tags: [
			...sharedFeatures,
			{ icon: "FaParking", label: "Free parking (2 cars)" },
		],
		description: "Spacious two-floor villa with a large living area, ideal for families or groups. Enjoy a fully equipped kitchen, multiple bedrooms, and a private terrace.",
		points: [
			{ title: "Area", detail: "150m²" },
			{ title: "Floors", detail: "2" },
			{ title: "Bathrooms", detail: "2 WC" },
			{ title: "Beds", detail: "4 double beds + 1 single bed" },
			{ title: "Kitchen", detail: "Fully equipped" },
			{ title: "Parking", detail: "Free on-site parking for 2 cars" },
		],
		gps: {
			lat: 38.7109208,
			lng: 20.5932805,
			label: "KOMILIO 1",
			embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.1689089407!2d20.5932805!3d38.7109208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135db3e304ca1c01:0x3dfff83a38d0f5bb!2sKOMILIO%201!5e0!3m2!1sen!2sgr!4v0",
			gmapsUrl: "https://www.google.com/maps/dir/?api=1&destination=38.7109208,20.5932805",
			fromAirportUrl: "https://www.google.com/maps/dir/Preveza+Aktio+Airport/38.7109208,20.5932805",
		},
	},
	{
		title: "Komilio 2 - Agave Villas",
		images: [
			{ src: "/src/react-app/assets/komilio2.jpg", alt: "Komilio 2 - Agave Villas" },
			{ src: "/src/react-app/assets/komilio1.jpg", alt: "Komilio 1 - Agave Villas" },
		],
		tags: [
			...sharedFeatures,
			{ icon: "FaSwimmingPool", label: "Private pool" },
		],
		description: "Modern two-floor villa with private pool, perfect for a relaxing holiday. Features two bedrooms, an external kitchen, and a beautiful terrace.",
		points: [
			{ title: "Floors", detail: "2" },
			{ title: "Beds", detail: "2 double beds" },
			{ title: "Kitchen", detail: "External, fully equipped" },
			{ title: "Pool", detail: "Private pool" },
		],
		gps: {
			lat: 38.710895,
			lng: 20.590574,
			label: "Komilio 2",
			embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.1689089407!2d20.590574!3d38.710895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135db3e304ca1c01:0x3dfff83a38d0f5bb!2sKOMILIO%201!5e0!3m2!1sen!2sgr!4v0",
			gmapsUrl: "https://www.google.com/maps/dir/?api=1&destination=38.710895,20.590574",
			fromAirportUrl: "https://www.google.com/maps/dir/Preveza+Aktio+Airport/38.710895,20.590574",
		},
	},
];

export { sharedFeatures, accommodationData };
