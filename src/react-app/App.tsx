// @ts-nocheck
// src/App.tsx

import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import AccommodationSection from "./components/Accommodation/AccommodationSection";
import BeachSection from "./components/Beach/BeachSection";
import FoodSection from "./components/Food/FoodSection";
import TripsSection from "./components/Trips/TripsSection";
import TransportSection from "./components/Transport/TransportSection";
import CalendarModal from "./components/Extra/CalendarModal";
import HamburgerMenu from "./components/Extra/HamburgerMenu";
import Gallery, { GalleryImage } from "./components/Extra/Gallery";
import MapModal from "./components/Extra/MapModal";
import type { Beach } from "./components/Beach/BeachCards";
import foodSectionsData from "./data/foodSectionsData";
import { sharedFeatures, accommodationData } from "./data/accommodationData";
import extraServices from "./data/extraServices";
import greekFoods from "./data/greekFoods";
import airports from "./data/airports";
import carRentals from "./data/carRentals";
import testGallery from "./data/testGallery";
import { CALENDAR_URL } from "./data/constants";
import sections from "./data/sections";
import locales from "./data/locales";

// Type annotations for imported data
const typedAccommodationData: any[] = accommodationData as any[];
const typedExtraServices: { title: string; detail: string }[] = extraServices as { title: string; detail: string }[];
const typedGreekFoods: any[] = greekFoods as any[];
const typedAirports: { name: string; mapsUrl: string; website: string }[] = airports as { name: string; mapsUrl: string; website: string }[];
const typedCarRentals: { name: string; url: string }[] = carRentals as { name: string; url: string }[];
const typedTestGallery: GalleryImage[] = testGallery as GalleryImage[];

function App() {
	const [active, setActive] = useState("home");
	const [lang, setLang] = useState<"en" | "gr">("en");
	const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
	const t = locales[lang];
	const lastVisibleIdsRef = useRef<string[]>([]);

	// Responsive nav state
	const [menuOpen, setMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 830);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

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
  const visibleSections = new Set<string>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) visibleSections.add(id);
        else visibleSections.delete(id);
      });

      if (visibleSections.size === 0) return;

      // Pick the section whose top is closest to viewport top
      let bestId: string | null = null;
      let bestTop = Infinity;

      visibleSections.forEach((id) => {
        const el = sectionRefs.current[id];
        if (!el) return;

        const top = Math.abs(el.getBoundingClientRect().top);
        if (top < bestTop) {
          bestTop = top;
          bestId = id;
        }
      });

      if (bestId && bestId !== active) setActive(bestId);
    },
    { threshold: 0 } // fire as soon as any part enters
  );

  sections.forEach((sec) => {
    const el = sectionRefs.current[sec.id];
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, [sections, active]);

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
			{/* Responsive nav: hamburger for mobile, full nav for desktop */}
			{isMobile ? (
				   <nav className="lefka-nav mobile-nav">
					   <button
						   className="hamburger-btn"
						   aria-label="Open menu"
						   onClick={() => setMenuOpen(true)}
					   >
						   <span className="hamburger-icon">
							   <span></span><span></span><span></span>
						   </span>
					   </button>
					   <span className="mobile-nav-current">
						   {t.nav[sections.findIndex(s => s.id === active)]}
					   </span>
					   <HamburgerMenu
						   open={menuOpen}
						   sections={sections.map((s, i) => ({ id: s.id, label: t.nav[i] }))}
						   current={active}
						   onSelect={id => {
							   scrollToSection(id);
							   setMenuOpen(false);
						   }}
						   onClose={() => setMenuOpen(false)}
					   />
				   </nav>
			   ) : (
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
			   )}
			   <main className="lefka-main">
				   {galleryOpen && (
					   <Gallery
						   images={galleryImages}
						   open={galleryOpen}
						   onClose={() => setGalleryOpen(false)}
						   current={galleryCurrent}
						   setCurrent={setGalleryCurrent}
					   />
				   )}
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
				   <AccommodationSection
					   t={t}
					   data={typedAccommodationData}
					   extraServices={typedExtraServices}
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
					   sectionRef={(el) => {
						   sectionRefs.current["accommodation"] = el;
					   }}
				   />
				<BeachSection
					t={t}
					onCardClick={handleCardClick}
					onMapClick={handleMapClick}
					sectionRef={(el) => {
						sectionRefs.current["travel"] = el;
					}}
				/>
				   <FoodSection
					   greekFoods={typedGreekFoods}
					   restaurants={foodSectionsData.restaurants}
					   supermarkets={foodSectionsData.supermarkets}
					   sectionRef={(el) => {
						   sectionRefs.current["food"] = el;
					   }}
				   />
				<TripsSection
					t={t}
					sectionRef={(el) => {
						sectionRefs.current["trips"] = el;
					}}
				/>
				   <TransportSection
					   airports={typedAirports}
					   carRentals={typedCarRentals}
					   gasStations={foodSectionsData.gasStations}
					   sectionRef={(el) => {
						   sectionRefs.current["transport"] = el;
					   }}
				   />
			</main>
			   <Gallery
				   images={galleryImages as GalleryImage[]}
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
