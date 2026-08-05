// @ts-nocheck
// src/App.tsx

import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import AccommodationSection from "./components/Accommodation/AccommodationSection";
import BeachSection from "./components/Beach/BeachSection";
import FoodSection from "./components/Food/FoodSection";
import TripsSection from "./components/Trips/TripsSection";
import TransportSection from "./components/Transport/TransportSection";
import ReservationModal from "./components/Reservation/ReservationModal";
import Header from "./components/Header/Header";
import heroImage from "./assets/Komilio1.jpg";
import heroVideo from "./assets/hero-video.mp4";
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
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 830);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Keep the document language in sync for screen readers and SEO
	useEffect(() => {
		document.documentElement.lang = lang === "gr" ? "el" : "en";
	}, [lang]);

	// Skip the hero video for users who prefer reduced motion (photo fallback stays)
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
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

	// Reservation modal state
	const [reservationOpen, setReservationOpen] = useState(false);
	const [reservationProperty, setReservationProperty] = useState<{ id: string; title: string } | null>(null);

	// Prevent background scroll when modal is open
	useEffect(() => {
		if (mapOpen || galleryOpen || directionsOpen || reservationOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mapOpen, galleryOpen, directionsOpen, reservationOpen]);

	useEffect(() => {
		// Highlight the section with the highest visible share: the fraction of
		// the section's own height currently inside the viewport. Computed on
		// scroll because IntersectionObserver only fires when the visible set
		// changes, which misses scrolls inside a long section.
		let ticking = false;

		const compute = () => {
			ticking = false;
			const atBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
			if (atBottom) {
				setActive(sections[sections.length - 1].id);
				return;
			}
			const vh = window.innerHeight;
			let bestId = sections[0].id;
			let bestRatio = -1;
			sections.forEach(({ id }) => {
				const el = sectionRefs.current[id];
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
				const ratio = rect.height > 0 ? visible / rect.height : 0;
				if (ratio > bestRatio) {
					bestId = id;
					bestRatio = ratio;
				}
			});
			setActive(bestId);
		};

		const onScroll = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(compute);
			}
		};

		compute();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
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

	const handleReserveClick = (id: string, title: string) => {
		setReservationProperty({ id, title });
		setReservationOpen(true);
	};

	return (
		<div className="lefka-app">
			<Header
				lang={lang}
				onLangChange={setLang}
				sections={sections.map((s, i) => ({ id: s.id, label: t.nav[i] }))}
				active={active}
				onNavigate={scrollToSection}
				onReserve={() => scrollToSection("accommodation")}
				reserveLabel={t.reservation.title}
				isMobile={isMobile}
			/>
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
					className="lefka-hero"
					style={{ backgroundImage: `url(${heroImage})` }}
				>
					{!prefersReducedMotion && (
						<video
							className="lefka-hero-video"
							autoPlay
							muted
							loop
							playsInline
							preload="metadata"
							poster={heroImage}
							aria-hidden="true"
						>
							<source src={heroVideo} type="video/mp4" />
						</video>
					)}
					<div className="lefka-hero-overlay" />
					<div className="lefka-hero-content">
						<h1>{t.homeTitle}</h1>
						<p>{t.homeDesc}</p>
					</div>
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
					   onReserve={handleReserveClick}
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
			{reservationProperty && (
				<ReservationModal
					open={reservationOpen}
					onClose={() => setReservationOpen(false)}
					propertyId={reservationProperty.id}
					propertyTitle={reservationProperty.title}
					t={t.reservation}
				/>
			)}
		</div>
	);


}
export default App;
