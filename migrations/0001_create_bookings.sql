CREATE TABLE bookings (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	property_id TEXT NOT NULL,
	arrival_date TEXT NOT NULL,
	departure_date TEXT NOT NULL,
	guest_name TEXT NOT NULL,
	guest_email TEXT NOT NULL,
	guest_phone TEXT,
	num_guests INTEGER NOT NULL,
	status TEXT NOT NULL DEFAULT 'pending',
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_bookings_property_dates ON bookings (property_id, arrival_date, departure_date);
