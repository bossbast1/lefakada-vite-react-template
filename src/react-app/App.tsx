// src/App.tsx

import React, { useRef, useEffect, useState } from "react";
import { FaBroom, FaHome, FaWifi, FaUsers, FaUtensils, FaBreadSlice, FaCouch, FaSun, FaBasketballBall, FaSmokingBan, FaDog, FaParking, FaSwimmingPool, FaShoppingCart, FaGasPump } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";
import "./App.css";
import en from "./locales/en";
import gr from "./locales/gr";
import BeachCards from "./components/BeachCards";
import type { Beach } from "./components/BeachCards";
import { FoodSections, FoodItem } from "./components/FoodSections";
import AccommodationCards from "./components/AccommodationCards";
import CalendarModal from "./components/CalendarModal";
// Food/gas data (should be moved to a data file or fetched in future)
const foodSectionsData = {
	supermarkets: [
		{
			icon: <FaShoppingCart />,
			name: "Agora - coffee and shop",
			description: "Small supermarket/coffee spot right on the Komilio road, good for basics and snacks.",
			note: "Closest to Komilio",
			mapLink: "https://maps.google.com/?q=Agora+Komilio+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "Euro Market",
			description: "Well‑reviewed local supermarket in Vassiliki.",
			note: "Vassiliki area (~10 min)",
			mapLink: "https://maps.google.com/?q=Euro+Market+Vassiliki+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "Supermarket Asteria",
			description: "Mid‑size supermarket in Ligia area near Vassiliki.",
			note: "Ligia area (~10 min)",
			mapLink: "https://maps.google.com/?q=Supermarket+Asteria+Ligia+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "Emporokinisi Super Market",
			description: "Good local market in Marantochori, convenient if passing by.",
			note: "Marantochori (~10 min)",
			mapLink: "https://maps.google.com/?q=Emporokinisi+Super+Market+Marantochori+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "Supermarket Nikos",
			description: "Another well‑rated option toward Vassiliki.",
			note: "Vassiliki area (~10–15 min)",
			mapLink: "https://maps.google.com/?q=Supermarket+Nikos+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "Sklavenitis",
			description: "Major Greek supermarket chain in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Sklavenitis+Lefkada",
			websiteLink: "https://www.sklavenitis.gr/",
		},
		{
			icon: <FaShoppingCart />,
			name: "Lidl",
			description: "Lidl budget supermarket near Nidri road.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Lidl+Lefkada",
			websiteLink: "https://www.lidl-hellas.gr/",
		},
		{
			icon: <FaShoppingCart />,
			name: "Carrefour Market",
			description: "Hypermarket in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Carrefour+Market+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "My market",
			description: "Town supermarket with solid selection.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=My+market+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "SUPER MARKET BENIZELOS",
			description: "Town supermarket with solid selection.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=SUPER+MARKET+BENIZELOS+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "Super Market Soldatos",
			description: "Local store in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
		},
		{
			icon: <FaShoppingCart />,
			name: "Market In",
			description: "Local store in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
		},
		{
			icon: <FaShoppingCart />,
			name: "Kritikos Super market",
			description: "Local store in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
		},
		{
			icon: <FaShoppingCart />,
			name: "Super Market Argo",
			description: "In Agios Nikitas, good for day trips.",
			note: "Agios Nikitas (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Super+Market+Argo+Agios+Nikitas+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "Supermarket Join in",
			description: "In Agios Nikitas, good for day trips.",
			note: "Agios Nikitas (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Supermarket+Join+in+Agios+Nikitas+Lefkada",
		},
		{
			icon: <FaShoppingCart />,
			name: "Mini‑markets and small grocery stores",
			description: "Common in villages and small towns.",
			note: "Various locations",
		},
	],
	 restaurants: [
		{
		 icon: <FaUtensils />,
			name: "Sesoula Taverna (Dragano)",
			description: "Classic Greek taverna with strong local reputation.",
			note: "Dragano (~10–25 min)",
			mapLink: "https://maps.google.com/?q=Sesoula+Taverna+Dragano+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Lygkos",
			description: "Well‑reviewed casual restaurant with local dishes.",
			note: "On way toward west coast (~10–25 min)",
			mapLink: "https://maps.google.com/?q=Lygkos+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Greco Levante",
			description: "Rural restaurant en route to coast.",
			note: "En route to coast (~10–25 min)",
			mapLink: "https://maps.google.com/?q=Greco+Levante+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Balkonaki (Ag. Petros)",
			description: "Awarded restaurant in traditional village setting.",
			note: "Agios Petros (~10–25 min)",
			mapLink: "https://maps.google.com/?q=Balkonaki+Agios+Petros+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Τα πηγάδια Taverna / Ta pigadia",
			description: "Highly rated modern Greek tavern.",
			note: "Vassiliki area (~10–15 min)",
			mapLink: "https://maps.google.com/?q=Ta+pigadia+Vasiliki+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Χασαποταβέρνα 'Ο Θανάσης'",
			description: "Local favorite grill restaurant.",
			note: "Vassiliki area (~10–15 min)",
			mapLink: "https://maps.google.com/?q=Χασαποταβέρνα+Ο+Θανάσης+Vasiliki+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Pondi Family Restaurant",
			description: "Large seafood & Greek cuisine choice.",
			note: "Vassiliki area (~10–15 min)",
			mapLink: "https://maps.google.com/?q=Pondi+Vassiliki+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Άριστον Γεύσεις",
			description: "Additional good choice in Vassiliki.",
			note: "Vassiliki area (~10–15 min)",
		},
		{
		 icon: <FaUtensils />,
			name: "RESTAURANT CAFE /POOL BAR",
			description: "Additional good choice in Vassiliki.",
			note: "Vassiliki area (~10–15 min)",
		},
		{
		 icon: <FaUtensils />,
			name: "Mastelo Restaurant & Bar",
			description: "Top‑rated town restaurant.",
			note: "Lefkada town (~25–35 min)",
			mapLink: "https://maps.google.com/?q=Mastelo+Restaurant+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Magiko Fagito - Εστιατόριο Λευκάδα",
			description: "Well‑rated local restaurant.",
			note: "Lefkada town (~25–35 min)",
			mapLink: "https://maps.google.com/?q=Magiko+Fagito+Lefkada",
		},
		{
		 icon: <FaUtensils />,
			name: "Joel - Gastro Grill",
			description: "Town favorite.",
			note: "Lefkada town (~25–35 min)",
			mapLink: "https://maps.google.com/?q=Joel+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Margarita",
			description: "Town favorite.",
			note: "Lefkada town (~25–35 min)",
			mapLink: "https://maps.google.com/?q=Margarita+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Kato Rahoula Nouvell Restaurant",
			description: "Quality in Nidri (~30 min).",
			note: "Nidri (~30 min)",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Mikroyalo",
			description: "Scenic option in Mikros Gialos.",
			note: "Mikros Gialos",
		},
	],
	 gasStations: [
		{
		 icon: <FaGasPump />,
			name: "Sklavenitis",
			description: "Gas station in Vassiliki area.",
			note: "Vassiliki area (~10–20 min)",
			mapLink: "https://maps.google.com/?q=Sklavenitis+Gas+Station+Vassiliki+Lefkada",
		},
		{
		 icon: <FaGasPump />,
			name: "AEGEAN",
			description: "Petrol in Vassiliki outskirts.",
			note: "Vassiliki outskirts (~10–20 min)",
			mapLink: "https://maps.google.com/?q=AEGEAN+Gas+Station+Vassiliki+Lefkada",
		},
		{
		 icon: <FaGasPump />,
			name: "Aegean Georgaki",
			description: "Another Vassiliki option.",
			note: "Vassiliki (~10–20 min)",
			mapLink: "https://maps.google.com/?q=Aegean+Georgaki+Vassiliki+Lefkada",
		},
		{
		 icon: <FaGasPump />,
			name: "bp",
			description: "BP station near Megali Vrisi.",
			note: "Megali Vrisi (~10–20 min)",
			mapLink: "https://maps.google.com/?q=BP+Gas+Station+Megali+Vrisi+Lefkada",
		},
		{
		 icon: <FaGasPump />,
			name: "ελίν - ΚΑΒΒΑΔΑ ΧΡΙΣΤΙΝΑ",
			description: "Highly rated fuel station near Apolpena.",
			note: "Apolpena (~20–30 min)",
			mapLink: "https://maps.google.com/?q=ελίν+ΚΑΒΒΑΔΑ+ΧΡΙΣΤΙΝΑ+Lefkada",
		},
		{
		 icon: <FaGasPump />,
			name: "EKO",
			description: "Central Lefkada option.",
			note: "Central Lefkada (~20–30 min)",
			mapLink: "https://maps.google.com/?q=EKO+Gas+Station+Lefkada",
		},
		{
		 icon: <FaGasPump />,
			name: "Θεμελης Σ. Γεωργιος",
			description: "Central Lefkada option.",
			note: "Central Lefkada (~20–30 min)",
			mapLink: "https://maps.google.com/?q=Θεμελης+Σ+Γεωργιος+Lefkada",
		},
		{
		 icon: <FaGasPump />,
			name: "Shell (Kalligoni)",
			description: "Shell station on main route near Kalligoni.",
			note: "Kalligoni (~20–30 min)",
			mapLink: "https://maps.google.com/?q=Shell+Kalligoni+Lefkada",
		},
		{
		 icon: <FaGasPump />,
			name: "Shell (Apolpena)",
			description: "Shell station on main route near Apolpena.",
			note: "Apolpena (~20–30 min)",
			mapLink: "https://maps.google.com/?q=Shell+Apolpena+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "ΕΚΟ KOZAKOS",
			description: "Option in Lygia/Nidri road corridor.",
			note: "Lygia/Nidri (~20–30 min)",
			mapLink: "https://maps.google.com/?q=EKO+KOZAKOS+Lygia+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "Shell (Lygia)",
			description: "Option in Lygia/Nidri road corridor.",
			note: "Lygia/Nidri (~20–30 min)",
			mapLink: "https://maps.google.com/?q=Shell+Lygia+Lefkada",
		},
	],
};
import Gallery, { GalleryImage } from "./components/Gallery";
import MapModal from "./components/MapModal";

const locales = { en, gr };
const sections = [
	{ id: "home" },           // Lefkada
	{ id: "accommodation" }, // Accommodation
	{ id: "travel" },        // Beaches
	{ id: "food" },          // Food
	{ id: "greekfoods" },    // Greek Foods (as first in food section)
	{ id: "trips" },         // Trips
	{ id: "transport" },     // Transportation
];

// Accommodation data
const sharedFeatures = [
	{ icon: <FaBroom />, label: "Cleaning", description: "Once per 3 days or on agreement" },
	{ icon: <FaHome />, label: "Entire place", description: "You have the whole accommodation for yourself" },
	{ icon: <FaWifi />, label: "Free Wi-Fi" },
	{ icon: <FaUsers />, label: "Family rooms" },
	{ icon: <FaUtensils />, label: "BBQ facilities" },
	{ icon: <MdOutlineBakeryDining />, label: "Bakery delivery", description: "Personal bakery delivery in the morning" },
	{ icon: <FaCouch />, label: "Balcony" },
	{ icon: <FaSun />, label: "Terrace" },
	{ icon: <FaBasketballBall />, label: "Public basketball court (20m)" },
	{ icon: <FaSmokingBan />, label: "Non-smoking rooms" },
	{ icon: <FaDog style={{ textDecoration: 'line-through' }} />, label: "No pets" },
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
			{ icon: <FaParking />, label: "Free parking (2 cars)" },
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
			{ icon: <FaSwimmingPool />, label: "Private pool" },
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

const extraServices = [
	{ title: "Airport transfer", detail: "We can arrange transport from the airport to the villa." },
	{ title: "Car/bike rental", detail: "Assistance with renting a car or bicycle." },
	{ title: "Motorboat rental", detail: "Help with renting a motorboat for your stay." },
	{ title: "Sports activities", detail: "Windsurfing, cycling, canoeing and more." },
	{ title: "Health stays", detail: "Special stays for asthma, eczema, and other conditions." },
];

// Test gallery images (replace with real later)
const CALENDAR_URL = "https://www.supersaas.sk/schedule/Komilio/Komilio1_booking";
const testGallery: GalleryImage[] = [
	{
		src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
		alt: "Beach 1",
	},
	{
		src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
		alt: "Beach 2",
	},
];

function App() {
	const [active, setActive] = useState("home");
	const [lang, setLang] = useState<"en" | "gr">("en");
	const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
	const t = locales[lang];

	// Gallery state
	const [galleryOpen, setGalleryOpen] = useState(false);
	const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
	const [galleryCurrent, setGalleryCurrent] = useState(0);

	// Map modal state
	const [mapOpen, setMapOpen] = useState(false);
	const [mapUrl, setMapUrl] = useState("");
	const [mapName, setMapName] = useState("");

	// Directions modal state
	const [directionsOpen, setDirectionsOpen] = useState(false);
	const [directionsUrl, setDirectionsUrl] = useState("");
	const [directionsName, setDirectionsName] = useState("");

	// Calendar modal state
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [calendarUrl, setCalendarUrl] = useState<string>("");

	// Prevent background scroll when modal is open
	useEffect(() => {
		if (mapOpen || galleryOpen || directionsOpen || calendarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mapOpen, galleryOpen, directionsOpen, calendarOpen]);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight / 3;
			let current = "home";
			for (const sec of sections) {
				const ref = sectionRefs.current[sec.id];
				if (ref) {
					const { offsetTop } = ref;
					if (scrollPosition >= offsetTop) {
						current = sec.id;
					}
				}
			}
			setActive(current);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (id: string) => {
		const ref = sectionRefs.current[id];
		if (ref) {
			ref.scrollIntoView({ behavior: "smooth" });
		}
	};

	// Handle beach card click
	const handleCardClick = (beach: Beach) => {
		setGalleryImages(testGallery);
		setGalleryCurrent(0);
		setGalleryOpen(true);
	};

	// Handle map button click
	const handleMapClick = (beach: Beach) => {
		setMapUrl(beach.mapUrl ?? "");
		setMapName(beach.name);
		setMapOpen(true);
	};

	// Expose handler for Reserve button (AccommodationCard)
	useEffect(() => {
		(window as any).onReserveClick = () => {
			setCalendarUrl(CALENDAR_URL);
			setCalendarOpen(true);
		};
		return () => {
			(window as any).onReserveClick = undefined;
		};
	}, []);

	return (
		<div className="lefka-app">
			<div className="lefka-lang-select">
				<label htmlFor="lang-select">{t.lang}: </label>
				<select
					id="lang-select"
					value={lang}
					onChange={(e) => setLang(e.target.value as "en" | "gr")}
				>
					<option value="en">{t.en}</option>
					<option value="gr">{t.gr}</option>
				</select>
			</div>
			<nav className="lefka-nav">
				{sections.map((sec, i) => (
					<button
						key={sec.id}
						className={active === sec.id ? "active" : ""}
						onClick={() => scrollToSection(sec.id)}
					>
						{t.nav[i]}
					</button>
				))}
			</nav>
			<main className="lefka-main">
				<section
					id="home"
					ref={(el) => {
						sectionRefs.current["home"] = el;
					}}
					className="lefka-section"
				>
					<h1>{t.homeTitle}</h1>
					<p>{t.homeDesc}</p>
				</section>
				<section
					id="accommodation"
					ref={(el) => {
						sectionRefs.current["accommodation"] = el;
					}}
					className="lefka-section"
				>
					<h2>{t.accomTitle}</h2>
					<AccommodationCards
						data={accommodationData}
						onGalleryClick={(images, idx) => {
							setGalleryImages(images);
							setGalleryCurrent(idx);
							setGalleryOpen(true);
						}}
						onMapEmbed={(embedUrl, name) => {
							setMapUrl(embedUrl);
							setMapName(name);
							setMapOpen(true);
						}}
					/>
					<div className="accommodation-extra-services">
						<h3>What else we can provide</h3>
						<ul>
							{extraServices.map((s, i) => (
								<li key={i}><strong>{s.title}:</strong> {s.detail}</li>
							))}
						</ul>
					</div>
					<div className="komilio-card">
						<h3>About Komilio (Komílion)</h3>
						<p>
							Komilio is a traditional mountain village in southern Lefkada, known for its peaceful atmosphere, beautiful views, and proximity to the island’s best beaches. It’s a great base for exploring the region and enjoying authentic Greek village life.
						</p>
					</div>
				</section>				
				<section
					id="travel"
					ref={(el) => {
						sectionRefs.current["travel"] = el;
					}}
					className="lefka-section"
				>
					<h2>{t.travelTitle}</h2>
					<p className="beach-general">{t.travelGeneral}</p>
					<BeachCards
						beaches={t.travelBeaches}
						onCardClick={handleCardClick}
						onMapClick={handleMapClick}
						onDirectionsToKomilion={(beach: Beach) =>
							window.open(beach.directionsToKomilion, "_blank")
						}
						onDirectionsFromMyLocation={(beach: Beach) =>
							window.open(beach.directionsFromMyLocation, "_blank")
						}
					/>
					<div className="komilio-card">
						<h3>{t.travelKomilio.title}</h3>
						<p>{t.travelKomilio.desc}</p>
					</div>
					<div className="beach-table-wrap">
						<h4>{t.travelTableTitle}</h4>
						<table className="beach-table">
							<thead>
								<tr>
									{t.travelTable.headers.map((h, i) => (
										<th key={i}>{h}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{t.travelTable.rows.map((row, i) => (
									<tr key={i}>
										{row.map((cell, j) => (
											<td key={j}>{cell}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
				<section
					id="food"
					ref={(el) => {
						sectionRefs.current["food"] = el;
					}}
					className="lefka-section"
				>
					<h2 style={{ color: '#0077b6' }}>Food</h2>
					<h3>Top 5 Traditional Greek Foods</h3>
					<div className="greek-foods-list">
						{[
							{
								name: "Moussaka",
								img: "moussaka.jpg",
								ingredients: [
									"2 eggplants",
									"2 potatoes",
									"500g minced beef or lamb",
									"1 onion",
									"2 cloves garlic",
									"400g canned tomatoes",
									"Olive oil, salt, pepper, cinnamon, nutmeg",
									"Béchamel sauce (milk, flour, butter, nutmeg, egg yolk)"
								],
								process: "Slice eggplants and potatoes, fry or bake until soft. Sauté onion and garlic, add minced meat, cook until browned. Add tomatoes and spices, simmer. Layer potatoes, eggplants, meat sauce in a baking dish, top with béchamel. Bake at 180°C for 45 minutes until golden."
							},
							{
								name: "Souvlaki",
								img: "souvlaki.jpg",
								ingredients: [
									"500g pork or chicken, cut in cubes",
									"Olive oil, lemon juice, oregano, salt, pepper",
									"Pita bread, tomatoes, onions, tzatziki"
								],
								process: "Marinate meat in olive oil, lemon, oregano, salt, pepper for 2+ hours. Skewer and grill until cooked. Serve in pita with tomatoes, onions, and tzatziki."
							},
							{
								name: "Greek Salad (Horiatiki)",
								img: "greek-salad.jpg",
								ingredients: [
									"Tomatoes",
									"Cucumbers",
									"Red onion",
									"Kalamata olives",
									"Feta cheese",
									"Oregano, olive oil, salt"
								],
								process: "Chop vegetables, combine in a bowl. Add olives and feta on top. Sprinkle with oregano, salt, and drizzle with olive oil. Serve fresh."
							},
							{
								name: "Spanakopita",
								img: "spanakopita.jpg",
								ingredients: [
									"500g spinach",
									"200g feta cheese",
									"1 onion",
									"2 eggs",
									"Dill, parsley, olive oil, salt, pepper",
									"Phyllo dough"
								],
								process: "Sauté onion, add spinach, cook until wilted. Mix with crumbled feta, eggs, herbs, salt, pepper. Layer phyllo in a pan, add filling, cover with more phyllo. Brush with olive oil. Bake at 180°C for 40 minutes until golden."
							},
							{
								name: "Baklava",
								img: "baklava.jpg",
								ingredients: [
									"400g phyllo dough",
									"250g walnuts or pistachios",
									"150g butter",
									"200g sugar",
									"200ml water",
									"100g honey",
									"Cinnamon, lemon juice"
								],
								process: "Layer phyllo and melted butter in a pan, sprinkle with chopped nuts and cinnamon. Repeat layers. Cut into diamonds. Bake at 180°C for 40 min. Boil sugar, water, honey, lemon for syrup, pour over hot baklava."
							}
						].map((food, i) => (
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
					<h3>Restaurants & Taverns</h3>
					  <FoodSections items={foodSectionsData.restaurants} />
					<h3>Supermarkets & Grocery Stores</h3>
					  <FoodSections items={foodSectionsData.supermarkets} />
				</section>
				<section
					id="trips"
					ref={(el) => {
						sectionRefs.current["trips"] = el;
					}}
					className="lefka-section"
				>
					<h2>{t.tripsTitle}</h2>
					<p>{t.tripsDesc}</p>
				</section>				
				<section
					id="transport"
					ref={(el) => {
						sectionRefs.current["transport"] = el;
					}}
					className="lefka-section"
				>
					<h2>Transport</h2>
					<div className="transport-airports">
						<h3>Airports</h3>
						<div className="airport-card">
							<strong>Preveza (Aktio) International Airport (PVK)</strong><br />
							<a href="https://www.google.com/maps/place/Preveza+International+Airport/@38.9308786,20.7672918,1187" target="_blank" rel="noopener noreferrer">Google Maps</a> | <a href="https://www.pvk-airport.gr/en" target="_blank" rel="noopener noreferrer">Official Website</a>
						</div>
						<div className="airport-card">
							<strong>Corfu International Airport (CFU)</strong><br />
							<a href="https://www.google.com/maps/place/Corfu+International+Airport/@39.6071366,19.9124167,1176" target="_blank" rel="noopener noreferrer">Google Maps</a> | <a href="https://www.cfu-airport.gr/en" target="_blank" rel="noopener noreferrer">Official Website</a>
						</div>
					</div>
					<div className="transport-rentals">
						<h3>Car Rentals</h3>
						<ul>
							<li><strong>Ionian Rent a Car</strong> – <a href="#">www.ionianrentacar.com</a></li>
							<li><strong>EasyDrive Lefkada</strong> – <a href="#">www.easydrivelefkada.com</a></li>
							<li><strong>Sunshine Rentals</strong> – <a href="#">www.sunshinerentals.gr</a></li>
						</ul>
					</div>
					<div className="transport-gas">
						<h3>Gas Stations</h3>
						<ul>
							{foodSectionsData.gasStations.map((station, i) => (
								<li key={i}>
									<strong>{station.name}</strong> – {station.description} <span style={{ color: '#888' }}>{station.note}</span>
									{station.mapLink && (
										<a href={station.mapLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>Map</a>
									)}
								</li>
							))}
						</ul>
					</div>
				</section>
			</main>
			<Gallery
				images={galleryImages}
				open={galleryOpen}
				onClose={() => setGalleryOpen(false)}
				current={galleryCurrent}
				setCurrent={setGalleryCurrent}
			/>
			<MapModal
				open={mapOpen}
				onClose={() => setMapOpen(false)}
				mapUrl={mapUrl}
				name={mapName}
			/>
			<CalendarModal
				open={calendarOpen}
				onClose={() => setCalendarOpen(false)}
				calendarUrl={calendarUrl}
			/>
		</div>
	);
}

export default App;
