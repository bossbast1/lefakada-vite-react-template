// src/App.tsx

import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import en from "./locales/en";
import gr from "./locales/gr";
import BeachCards from "./components/BeachCards";
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
	const handleCardClick = (beach: any) => {
		setGalleryImages(testGallery);
		setGalleryCurrent(0);
		setGalleryOpen(true);
	};

	// Handle map button click
	const handleMapClick = (beach: any) => {
		setMapUrl(beach.mapUrl);
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
						onDirectionsToKomilion={(beach) =>
							window.open(beach.directionsToKomilion, "_blank")
						}
						onDirectionsFromMyLocation={(beach) =>
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
				</section>
				<section
					id="accommodation"
					ref={(el) => {
						sectionRefs.current["accommodation"] = el;
					}}
					className="lefka-section"
				>
					<h2>{t.accomTitle}</h2>
					<h3>{t.accom1}</h3>
					<p>{t.accom1Desc}</p>
					<h3>{t.accom2}</h3>
					<p>{t.accom2Desc}</p>
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
