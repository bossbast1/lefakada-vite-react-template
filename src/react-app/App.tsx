// src/App.tsx

import { useRef, useEffect, useState } from "react";
import "./App.css";
import portoKatsikiImg from "./assets/porto-katsiki.jpg";
import egremniImg from "./assets/egremni.jpg";
import kathismaImg from "./assets/kathisma.jpg";
import milosImg from "./assets/milos.jpg";
import vassilikiImg from "./assets/vassiliki.jpg";

const text = {
	en: {
		nav: [
			"Home/About Lefka",
			"Traveling/Beaches",
			"Trips",
			"Food",
			"Accommodation",
		],
		homeTitle: "Lefkada",
		homeDesc:
			"Lefkada (Lefkas) is a beautiful Greek island in the Ionian Sea, known for its turquoise waters, stunning beaches, and charming villages. Welcome to your guide for exploring Lefkada!",
		travelTitle: "Lefkada Beaches & Travel Info",
		travelGeneral: `Lefkada’s most beautiful beaches are on the western coast of the island with dramatic cliffs, clear turquoise waters, and mostly pebbles or sand. These beaches are not within walking distance of towns like Lefkada City or Komilio — a car is essential. Roads can be narrow and winding, especially near cliff viewpoints and parking areas, but they are generally passable by standard car. Some beaches require steps or short hikes down from parking.`,
		travelBeaches: [
			{
				id: "porto-katsiki",
				name: "Porto Katsiki",
				img: portoKatsikiImg,
				desc: "World‑famous beach with steep limestone cliffs, white pebbles, and intense azure water; one of Greece’s most photographed beaches.",
				access: [
					"From Lefkada Town: ~45 min drive; large cliffside parking; steep stairs down to beach.",
					"From Komilio (Komílion): ~1 hr 10 min drive; same parking and stair access.",
				],
				notes: "Can be windy; get there early to avoid crowds.",
			},
			{
				id: "egremni",
				name: "Egremni",
				img: egremniImg,
				desc: "Long sandy stretch with clear blue water and pebble shore; scenic and more remote.",
				access: [
					"From Lefkada Town: ~40–45 min drive; 350+ stairs from parking down.",
					"From Komilio: ~50–55 min drive; stair access.",
				],
				notes:
					"Check local conditions — access can be restricted in some seasons due to landslides.",
			},
			{
				id: "kathisma",
				name: "Kathisma",
				img: kathismaImg,
				desc: "Popular beach with a sandy/pebble shoreline, facilities, beach bars, sunbeds, and shallow entry: good for families and social beach days.",
				access: [
					"From Lefkada Town: ~20 min drive; direct road & parking.",
					"From Komilio: ~25–30 min drive; easy parking near beach.",
				],
				notes: "",
			},
			{
				id: "milos",
				name: "Milos (Agios Ioannis)",
				img: milosImg,
				desc: "Smaller, quieter beach with sandy/pebble mix and clear shallow water; more relaxed atmosphere compared to big beaches.",
				access: [
					"From Lefkada Town: ~15 min drive; parking close to beach.",
					"From Komilio: ~20–25 min drive; direct access & parking.",
				],
				notes: "",
			},
			{
				id: "vassiliki",
				name: "Vassiliki Beach",
				img: vassilikiImg,
				desc: "Sandy shoreline with shallow waters and afternoon winds — ideal for windsurfing and water sports; backed by village tavernas and facilities.",
				access: [
					"From Lefkada Town: ~35–40 min drive.",
					"From Komilio: ~10–15 min drive; straightforward road to village and beach.",
				],
				notes: "",
			},
		],
		travelKomilio: {
			title: "About Komilio (Komílion)",
			desc: `Komilio is a village inland at higher elevation on Lefkada with accommodation such as Komilio 1, offering free private parking and proximity to the western beaches you’ll likely want to visit.\n\nWhile not on the coast, Komilio’s central inland location means you’re well‑positioned to drive to the west coast beaches each day.`,
		},
		travelTableTitle: "Summary Table (Approximate Driving Times)",
		travelTable: {
			headers: ["Beach", "From Lefkada Town", "From Komilio"],
			rows: [
				["Porto Katsiki", "~45 min", "~1 h 10 min"],
				["Egremni", "~40–45 min", "~50–55 min"],
				["Kathisma", "~20 min", "~25–30 min"],
				["Milos", "~15 min", "~20–25 min"],
				["Vassiliki", "~35–40 min", "~10–15 min"],
			],
		},
		tripsTitle: "Trips",
		tripsDesc:
			"Enjoy boat trips to nearby islands, hiking in the mountains, or exploring traditional villages like Agios Nikitas and Vasiliki.",
		foodTitle: "Food",
		foodDesc:
			"Savor local specialties such as lentils from Eglouvi, fresh seafood, and traditional Greek tavernas. Don’t miss the local wine and olive oil!",
		accomTitle: "Accommodation",
		accom1: "Apartment 1: Komilio View",
		accom1Desc:
			"A cozy apartment in the mountain village of Komilio, perfect for a peaceful retreat with stunning views.",
		accom2: "Apartment 2: Seaside Escape",
		accom2Desc:
			"Modern apartment close to the beach, ideal for families and couples looking to enjoy the sea and sun.",
		lang: "Language",
		en: "English",
		gr: "Greek",
	},
	gr: {
		nav: [
			"Αρχική/Σχετικά με τη Λευκάδα",
			"Ταξίδι/Παραλίες",
			"Εκδρομές",
			"Φαγητό",
			"Διαμονή",
		],
		homeTitle: "Λευκάδα",
		homeDesc:
			"Η Λευκάδα είναι ένα όμορφο ελληνικό νησί στο Ιόνιο Πέλαγος, γνωστό για τα τιρκουάζ νερά, τις εντυπωσιακές παραλίες και τα γραφικά χωριά της. Καλώς ήρθατε στον οδηγό σας για τη Λευκάδα!",
		travelTitle: "Ταξίδι στις Παραλίες της Λευκάδας",
		travelGeneral: `Οι πιο όμορφες παραλίες της Λευκάδας βρίσκονται στην δυτική ακτή του νησιού με δραματικούς βράχους, καθαρά τιρκουάζ νερά και κυρίως βότσαλα ή άμμο. Αυτές οι παραλίες δεν είναι σε κοντινές αποστάσεις με τα πόδια από πόλεις όπως η πόλη της Λευκάδας ή το Κομίλιο — είναι απαραίτητο ένα αυτοκίνητο. Οι δρόμοι μπορεί να είναι στενοί και με στροφές, ειδικά κοντά σε σημεία θέασης και χώρους στάθμευσης, αλλά γενικά είναι προσβάσιμοι με κανονικό αυτοκίνητο. Ορισμένες παραλίες απαιτούν σκάλες ή σύντομες πεζοπορίες από το πάρκινγκ.`,
		travelBeaches: [
			{
				id: "porto-katsiki",
				name: "Πόρτο Κατσίκι",
				img: portoKatsikiImg,
				desc: "Παγκοσμίως διάσημη παραλία με απότομους βράχους ασβεστόλιθου, λευκά βότσαλα και έντονα γαλάζια νερά; μία από τις πιο φωτογραφημένες παραλίες της Ελλάδας.",
				access: [
					"Από την πόλη της Λευκάδας: ~45 λεπτά οδήγηση; μεγάλο πάρκινγκ στον βράχο; απότομες σκάλες προς την παραλία.",
					"Από το Κομίλιο (Komílion): ~1 ώρα 10 λεπτά οδήγηση; ίδια πρόσβαση με πάρκινγκ και σκάλες.",
				],
				notes: "Μπορεί να έχει αέρα; πηγαίνετε νωρίς για να αποφύγετε τον κόσμο.",
			},
			{
				id: "egremni",
				name: "Εγκρεμνοί",
				img: egremniImg,
				desc: "Μακρύς αμμώδης κόλπος με καθαρά μπλε νερά και παραλία με βότσαλα; γραφική και πιο απομονωμένη.",
				access: [
					"Από την πόλη της Λευκάδας: ~40–45 λεπτά οδήγηση; 350+ σκάλες από το πάρκινγκ προς τα κάτω.",
					"Από το Κομίλιο: ~50–55 λεπτά οδήγηση; πρόσβαση με σκάλες.",
				],
				notes:
					"Ελέγξτε τις τοπικές συνθήκες — η πρόσβαση μπορεί να περιορίζεται σε ορισμένες περιόδους λόγω κατολισθήσεων.",
			},
			{
				id: "kathisma",
				name: "Κάθισμα",
				img: kathismaImg,
				desc: "Δημοφιλής παραλία με ακτογραμμή από άμμο/βότσαλο, εγκαταστάσεις, παρα beach bars, ξαπλώστρες και ρηχή είσοδος: καλή για οικογένειες και κοινωνικές μέρες στην παραλία.",
				access: [
					"Από την πόλη της Λευκάδας: ~20 λεπτά οδήγηση; άμεσος δρόμος & πάρκινγκ.",
					"Από το Κομίλιο: ~25–30 λεπτά οδήγηση; εύκολο πάρκινγκ κοντά στην παραλία.",
				],
				notes: "",
			},
			{
				id: "milos",
				name: "Μύλος (Άγιος Ιωάννης)",
				img: milosImg,
				desc: "Μικρότερη, πιο ήσυχη παραλία με μείγμα άμμου/βότσαλου και καθαρά ρηχά νερά; πιο χαλαρή ατμόσφαιρα σε σύγκριση με τις μεγάλες παραλίες.",
				access: [
					"Από την πόλη της Λευκάδας: ~15 λεπτά οδήγηση; πάρκινγκ κοντά στην παραλία.",
					"Από το Κομίλιο: ~20–25 λεπτά οδήγηση; άμεση πρόσβαση & πάρκινγκ.",
				],
				notes: "",
			},
			{
				id: "vassiliki",
				name: "Παραλία Βασιλική",
				img: vassilikiImg,
				desc: "Αμμώδης ακτογραμμή με ρηχά νερά και απογευματινούς ανέμους — ιδανική για ιστιοσανίδα και θαλάσσια σπορ; πίσω από τα ταβερνάκια του χωριού και εγκαταστάσεις.",
				access: [
					"Από την πόλη της Λευκάδας: ~35–40 λεπτά οδήγηση.",
					"Από το Κομίλιο: ~10–15 λεπτά οδήγηση; απλός δρόμος προς το χωριό και την παραλία.",
				],
				notes: "",
			},
		],
		travelKomilio: {
			title: "Σχετικά με το Κομίλιο (Komílion)",
			desc: `Το Κομίλιο είναι ένα χωριό στο εσωτερικό του νησιού σε υψηλότερο υψόμετρο στη Λευκάδα με καταλύματα όπως το Komilio 1, προσφέροντας δωρεάν ιδιωτικό πάρκινγκ και εγγύτητα στις δυτικές παραλίες που θα θέλετε πιθανώς να επισκεφθείτε.\n\nΑν και δεν είναι στην ακτή, η κεντρική τοποθεσία του Κομιλίου στο εσωτερικό σημαίνει ότι είστε καλά τοποθετημένοι για να οδηγήσετε στις παραλίες της δυτικής ακτής κάθε μέρα.`,
		},
		travelTableTitle: "Πίνακας Περίληψης (Περίπου Χρόνοι Οδήγησης)",
		travelTable: {
			headers: ["Παραλία", "Από την πόλη της Λευκάδας", "Από το Κομίλιο"],
			rows: [
				["Porto Katsiki", "~45 λεπτά", "~1 ώρα 10 λεπτά"],
				["Egremni", "~40–45 λεπτά", "~50–55 λεπτά"],
				["Kathisma", "~20 λεπτά", "~25–30 λεπτά"],
				["Milos", "~15 λεπτά", "~20–25 λεπτά"],
				["Vassiliki", "~35–40 λεπτά", "~10–15 λεπτά"],
			],
		},
		tripsTitle: "Εκδρομές",
		tripsDesc:
			"Απολαύστε εκδρομές με σκάφος σε κοντινά νησιά, πεζοπορία στα βουνά ή εξερευνήστε παραδοσιακά χωριά όπως ο Άγιος Νικήτας και το Βασιλική.",
		foodTitle: "Φαγητό",
		foodDesc:
			"Δοκιμάστε τοπικές σπεσιαλιτέ όπως φακές Εγκλουβής, φρέσκα θαλασσινά και παραδοσιακές ταβέρνες. Μην παραλείψετε το τοπικό κρασί και το ελαιόλαδο!",
		accomTitle: "Διαμονή",
		accom1: "Διαμέρισμα 1: Θέα Κομίλιο",
		accom1Desc:
			"Ένα ζεστό διαμέρισμα στο ορεινό χωριό Κομίλιο, ιδανικό για ήρεμες διακοπές με υπέροχη θέα.",
		accom2: "Διαμέρισμα 2: Απόδραση στη Θάλασσα",
		accom2Desc:
			"Σύγχρονο διαμέρισμα κοντά στη θάλασσα, ιδανικό για οικογένειες και ζευγάρια που θέλουν να απολαύσουν τη θάλασσα και τον ήλιο.",
		lang: "Γλώσσα",
		en: "Αγγλικά",
		gr: "Ελληνικά",
	},
};

const sections = [
	{ id: "home" },
	{ id: "travel" },
	{ id: "trips" },
	{ id: "food" },
	{ id: "accommodation" },
];

function App() {
	const [active, setActive] = useState("home");
	const [lang, setLang] = useState<"en" | "gr">("en");
	const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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

	const t = text[lang];

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
					<div className="beach-cards">
						{t.travelBeaches.map((beach) => (
							<div className="beach-card" key={beach.id}>
								<div className="beach-img-wrap">
									<img
										src={beach.img}
										alt={beach.name}
										className="beach-img"
									/>
								</div>
								<div className="beach-info">
									<h3>{beach.name}</h3>
									<p>{beach.desc}</p>
									<ul className="beach-access">
										{beach.access.map((a, i) => (
											<li key={i}>{a}</li>
										))}
									</ul>
									{beach.notes && (
										<div className="beach-notes">{beach.notes}</div>
									)}
								</div>
							</div>
						))}
					</div>
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
		</div>
	);
}

export default App;
