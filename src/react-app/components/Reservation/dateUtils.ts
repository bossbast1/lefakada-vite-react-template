export interface BookedRange {
  arrival_date: string;
  departure_date: string;
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

// A day is unavailable to stay on if it falls within [arrival, departure) of a booking.
export function isDayBooked(dateStr: string, booked: BookedRange[]): boolean {
  return booked.some((b) => dateStr >= b.arrival_date && dateStr < b.departure_date);
}

// Whether every night between arrival (inclusive) and departure (exclusive) is free.
export function isRangeFree(arrival: string, departure: string, booked: BookedRange[]): boolean {
  return !booked.some((b) => arrival < b.departure_date && departure > b.arrival_date);
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function daysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}
