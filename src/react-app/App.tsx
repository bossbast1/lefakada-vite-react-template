// src/App.tsx

import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import en from "./locales/en";
import gr from "./locales/gr";
import BeachCards from "./components/BeachCards";
import type { Beach } from "./components/BeachCards";
import { FoodSections, FoodItem, FoodSectionsData } from "./components/FoodSections";
import AccommodationCards from "./components/AccommodationCards";
// Food/gas data (should be moved to a data file or fetched in future)
const foodSectionsData: FoodSectionsData = {
	supermarkets: [
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Agora - coffee and shop",
			description: "Small supermarket/coffee spot right on the Komilio road, good for basics and snacks.",
			note: "Closest to Komilio",
			mapLink: "https://maps.google.com/?q=Agora+Komilio+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Euro Market",
			description: "Well‑reviewed local supermarket in Vassiliki.",
			note: "Vassiliki area (~10 min)",
			mapLink: "https://maps.google.com/?q=Euro+Market+Vassiliki+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Supermarket Asteria",
			description: "Mid‑size supermarket in Ligia area near Vassiliki.",
			note: "Ligia area (~10 min)",
			mapLink: "https://maps.google.com/?q=Supermarket+Asteria+Ligia+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Emporokinisi Super Market",
			description: "Good local market in Marantochori, convenient if passing by.",
			note: "Marantochori (~10 min)",
			mapLink: "https://maps.google.com/?q=Emporokinisi+Super+Market+Marantochori+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Supermarket Nikos",
			description: "Another well‑rated option toward Vassiliki.",
			note: "Vassiliki area (~10–15 min)",
			mapLink: "https://maps.google.com/?q=Supermarket+Nikos+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Sklavenitis",
			description: "Major Greek supermarket chain in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Sklavenitis+Lefkada",
			websiteLink: "https://www.sklavenitis.gr/",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Lidl",
			description: "Lidl budget supermarket near Nidri road.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Lidl+Lefkada",
			websiteLink: "https://www.lidl-hellas.gr/",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Carrefour Market",
			description: "Hypermarket in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Carrefour+Market+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "My market",
			description: "Town supermarket with solid selection.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=My+market+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "SUPER MARKET BENIZELOS",
			description: "Town supermarket with solid selection.",
			note: "Lefkada town (~25–30 min)",
			mapLink: "https://maps.google.com/?q=SUPER+MARKET+BENIZELOS+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Super Market Soldatos",
			description: "Local store in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Market In",
			description: "Local store in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Kritikos Super market",
			description: "Local store in Lefkada town.",
			note: "Lefkada town (~25–30 min)",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Super Market Argo",
			description: "In Agios Nikitas, good for day trips.",
			note: "Agios Nikitas (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Super+Market+Argo+Agios+Nikitas+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Supermarket Join in",
			description: "In Agios Nikitas, good for day trips.",
			note: "Agios Nikitas (~25–30 min)",
			mapLink: "https://maps.google.com/?q=Supermarket+Join+in+Agios+Nikitas+Lefkada",
		},
		{
			icon: <span role="img" aria-label="supermarket">🛒</span>,
			name: "Mini‑markets and small grocery stores",
			description: "Common in villages and small towns.",
			note: "Various locations",
		},
	],
	restaurants: [
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Sesoula Taverna (Dragano)",
			description: "Classic Greek taverna with strong local reputation.",
			note: "Dragano (~10–25 min)",
			mapLink: "https://maps.google.com/?q=Sesoula+Taverna+Dragano+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Lygkos",
			description: "Well‑reviewed casual restaurant with local dishes.",
			note: "On way toward west coast (~10–25 min)",
			mapLink: "https://maps.google.com/?q=Lygkos+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Greco Levante",
			description: "Rural restaurant en route to coast.",
			note: "En route to coast (~10–25 min)",
			mapLink: "https://maps.google.com/?q=Greco+Levante+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Balkonaki (Ag. Petros)",
			description: "Awarded restaurant in traditional village setting.",
			note: "Agios Petros (~10–25 min)",
			mapLink: "https://maps.google.com/?q=Balkonaki+Agios+Petros+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Τα πηγάδια Taverna / Ta pigadia",
			description: "Highly rated modern Greek tavern.",
			note: "Vassiliki area (~10–15 min)",
			mapLink: "https://maps.google.com/?q=Ta+pigadia+Vasiliki+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Χασαποταβέρνα 'Ο Θανάσης'",
			description: "Local favorite grill restaurant.",
			note: "Vassiliki area (~10–15 min)",
			mapLink: "https://maps.google.com/?q=Χασαποταβέρνα+Ο+Θανάσης+Vasiliki+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Pondi Family Restaurant",
			description: "Large seafood & Greek cuisine choice.",
			note: "Vassiliki area (~10–15 min)",
			mapLink: "https://maps.google.com/?q=Pondi+Vassiliki+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Άριστον Γεύσεις",
			description: "Additional good choice in Vassiliki.",
			note: "Vassiliki area (~10–15 min)",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "RESTAURANT CAFE /POOL BAR",
			description: "Additional good choice in Vassiliki.",
			note: "Vassiliki area (~10–15 min)",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Mastelo Restaurant & Bar",
			description: "Top‑rated town restaurant.",
			note: "Lefkada town (~25–35 min)",
			mapLink: "https://maps.google.com/?q=Mastelo+Restaurant+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
			name: "Magiko Fagito - Εστιατόριο Λευκάδα",
			description: "Well‑rated local restaurant.",
			note: "Lefkada town (~25–35 min)",
			mapLink: "https://maps.google.com/?q=Magiko+Fagito+Lefkada",
		},
		{
			icon: <span role="img" aria-label="restaurant">🍽️</span>,
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
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "Sklavenitis",
			description: "Gas station in Vassiliki area.",
			note: "Vassiliki area (~10–20 min)",
			mapLink: "https://maps.google.com/?q=Sklavenitis+Gas+Station+Vassiliki+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "AEGEAN",
			description: "Petrol in Vassiliki outskirts.",
			note: "Vassiliki outskirts (~10–20 min)",
			mapLink: "https://maps.google.com/?q=AEGEAN+Gas+Station+Vassiliki+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "Aegean Georgaki",
			description: "Another Vassiliki option.",
			note: "Vassiliki (~10–20 min)",
			mapLink: "https://maps.google.com/?q=Aegean+Georgaki+Vassiliki+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "bp",
			description: "BP station near Megali Vrisi.",
			note: "Megali Vrisi (~10–20 min)",
			mapLink: "https://maps.google.com/?q=BP+Gas+Station+Megali+Vrisi+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "ελίν - ΚΑΒΒΑΔΑ ΧΡΙΣΤΙΝΑ",
			description: "Highly rated fuel station near Apolpena.",
			note: "Apolpena (~20–30 min)",
			mapLink: "https://maps.google.com/?q=ελίν+ΚΑΒΒΑΔΑ+ΧΡΙΣΤΙΝΑ+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "EKO",
			description: "Central Lefkada option.",
			note: "Central Lefkada (~20–30 min)",
			mapLink: "https://maps.google.com/?q=EKO+Gas+Station+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "Θεμελης Σ. Γεωργιος",
			description: "Central Lefkada option.",
			note: "Central Lefkada (~20–30 min)",
			mapLink: "https://maps.google.com/?q=Θεμελης+Σ+Γεωργιος+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
			name: "Shell (Kalligoni)",
			description: "Shell station on main route near Kalligoni.",
			note: "Kalligoni (~20–30 min)",
			mapLink: "https://maps.google.com/?q=Shell+Kalligoni+Lefkada",
		},
		{
			icon: <span role="img" aria-label="gas">⛽</span>,
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
	 { id: "home" },
	 { id: "travel" },
	 { id: "trips" },
	 { id: "food" },
	 { id: "accommodation" },
];

// Accommodation data
const sharedFeatures = [
	{ icon: <span role="img" aria-label="cleaning">🧹</span>, label: "Cleaning", description: "Once per 3 days or on agreement" },
	{ icon: <span role="img" aria-label="house">🏠</span>, label: "Entire place", description: "You have the whole accommodation for yourself" },
	{ icon: <span role="img" aria-label="wifi">📶</span>, label: "Free Wi-Fi" },
	{ icon: <span role="img" aria-label="family">👨‍👩‍👧‍👦</span>, label: "Family rooms" },
	{ icon: <span role="img" aria-label="bbq">🍖</span>, label: "BBQ facilities" },
	{ icon: <span role="img" aria-label="bread">🥐</span>, label: "Bakery delivery", description: "Personal bakery delivery in the morning" },
	{ icon: <span role="img" aria-label="balcony">🛋️</span>, label: "Balcony" },
	{ icon: <span role="img" aria-label="terrace">🌅</span>, label: "Terrace" },
	{ icon: <span role="img" aria-label="basketball">🏀</span>, label: "Public basketball court (20m)" },
	{ icon: <span role="img" aria-label="no-smoking">🚭</span>, label: "Non-smoking rooms" },
	{ icon: <span role="img" aria-label="no-pets">❌🐕</span>, label: "No pets" },
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
			{ icon: <span role="img" aria-label="parking">🅿️</span>, label: "Free parking (2 cars)" },
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
			{ icon: <span role="img" aria-label="pool">🏊‍♂️</span>, label: "Private pool" },
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

	// Prevent background scroll when modal is open
	useEffect(() => {
		if (mapOpen || galleryOpen || directionsOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mapOpen, galleryOpen, directionsOpen]);

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
					id="food"
					ref={(el) => {
						sectionRefs.current["food"] = el;
					}}
					className="lefka-section"
				>
					<h2>{t.foodTitle}</h2>
					<p>{t.foodDesc}</p>
					<FoodSections data={foodSectionsData} />
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
		</div>
	);
}

export default App;
