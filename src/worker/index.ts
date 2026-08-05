import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

const PROPERTY_NAMES: Record<string, string> = {
	komilio1: "Komilio 1 - Agave Villas",
	komilio2: "Komilio 2 - Agave Villas",
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/api/availability", async (c) => {
	const propertyId = c.req.query("property");
	if (!propertyId || !PROPERTY_NAMES[propertyId]) {
		return c.json({ error: "Unknown property" }, 400);
	}

	const { results } = await c.env.DB.prepare(
		"SELECT arrival_date, departure_date FROM bookings WHERE property_id = ?1 AND status != 'cancelled' AND departure_date >= date('now')"
	)
		.bind(propertyId)
		.all<{ arrival_date: string; departure_date: string }>();

	return c.json({ propertyId, booked: results });
});

app.post("/api/bookings", async (c) => {
	const body = await c.req.json().catch(() => null);
	if (!body) return c.json({ error: "Invalid request body" }, 400);

	const {
		propertyId,
		arrivalDate,
		departureDate,
		guestName,
		guestEmail,
		guestPhone,
		numGuests,
		website,
	} = body as Record<string, unknown>;

	// Honeypot: real users never fill this hidden field.
	if (typeof website === "string" && website.trim().length > 0) {
		return c.json({ id: undefined, status: "pending" }, 201);
	}

	if (typeof propertyId !== "string" || !PROPERTY_NAMES[propertyId]) {
		return c.json({ error: "Unknown property" }, 400);
	}
	if (typeof arrivalDate !== "string" || !DATE_RE.test(arrivalDate)) {
		return c.json({ error: "Invalid arrival date" }, 400);
	}
	if (typeof departureDate !== "string" || !DATE_RE.test(departureDate)) {
		return c.json({ error: "Invalid departure date" }, 400);
	}
	if (departureDate <= arrivalDate) {
		return c.json({ error: "Departure date must be after arrival date" }, 400);
	}
	const today = new Date().toISOString().slice(0, 10);
	if (arrivalDate < today) {
		return c.json({ error: "Arrival date is in the past" }, 400);
	}
	if (typeof guestName !== "string" || guestName.trim().length === 0) {
		return c.json({ error: "Guest name is required" }, 400);
	}
	if (typeof guestEmail !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(guestEmail)) {
		return c.json({ error: "Valid guest email is required" }, 400);
	}
	const guests = Number(numGuests);
	if (!Number.isInteger(guests) || guests < 1) {
		return c.json({ error: "Invalid number of guests" }, 400);
	}
	const phone = typeof guestPhone === "string" ? guestPhone.trim() : "";

	// Reject if it overlaps an existing non-cancelled booking for the same property.
	const overlap = await c.env.DB.prepare(
		`SELECT id FROM bookings
		 WHERE property_id = ?1 AND status != 'cancelled'
		 AND arrival_date < ?3 AND departure_date > ?2
		 LIMIT 1`
	)
		.bind(propertyId, arrivalDate, departureDate)
		.first();

	if (overlap) {
		return c.json({ error: "Selected dates are no longer available" }, 409);
	}

	const inserted = await c.env.DB.prepare(
		`INSERT INTO bookings (property_id, arrival_date, departure_date, guest_name, guest_email, guest_phone, num_guests, status)
		 VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 'pending')
		 RETURNING id`
	)
		.bind(propertyId, arrivalDate, departureDate, guestName.trim(), guestEmail.trim(), phone, guests)
		.first<{ id: number }>();

	const bookingId = inserted?.id;

	c.executionCtx.waitUntil(
		notifyOwner(c.env, {
			bookingId,
			propertyName: PROPERTY_NAMES[propertyId],
			arrivalDate,
			departureDate,
			guestName: guestName.trim(),
			guestEmail: guestEmail.trim(),
			guestPhone: phone,
			guests,
		})
	);

	return c.json({ id: bookingId, status: "pending" }, 201);
});

interface NotifyDetails {
	bookingId: number | undefined;
	propertyName: string;
	arrivalDate: string;
	departureDate: string;
	guestName: string;
	guestEmail: string;
	guestPhone: string;
	guests: number;
}

async function notifyOwner(env: Env, details: NotifyDetails) {
	const apiKey = (env as unknown as { RESEND_API_KEY?: string }).RESEND_API_KEY;
	const ownerEmail = (env as unknown as { OWNER_EMAIL?: string }).OWNER_EMAIL;
	if (!apiKey || !ownerEmail) return;

	const text = `Nová žiadosť o rezerváciu (#${details.bookingId ?? "?"})

Vila: ${details.propertyName}
Príchod: ${details.arrivalDate}
Odchod: ${details.departureDate}
Počet hostí: ${details.guests}

Hosť: ${details.guestName}
Email: ${details.guestEmail}
Telefón: ${details.guestPhone || "-"}
`;

	try {
		await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: "Lefkada Reservations <onboarding@resend.dev>",
				to: [ownerEmail],
				reply_to: details.guestEmail,
				subject: `Nová rezervácia: ${details.propertyName} (${details.arrivalDate} - ${details.departureDate})`,
				text,
			}),
		});
	} catch (err) {
		console.error("Failed to send booking notification email", err);
	}
}

export default app;
