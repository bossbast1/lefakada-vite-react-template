import React, { useState } from "react";
import { addMonths, daysInMonth, isDayBooked, isRangeFree, toISODate, todayISO, BookedRange } from "./dateUtils";

interface BookingCalendarProps {
  booked: BookedRange[];
  arrival: string | null;
  departure: string | null;
  onSelect: (arrival: string | null, departure: string | null) => void;
  monthLabels: string[];
  weekdayLabels: string[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  booked,
  arrival,
  departure,
  onSelect,
  monthLabels,
  weekdayLabels,
}) => {
  const [viewMonth, setViewMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const today = todayISO();

  const handleDayClick = (dateStr: string) => {
    if (dateStr < today || isDayBooked(dateStr, booked)) return;

    if (!arrival || (arrival && departure)) {
      onSelect(dateStr, null);
      return;
    }
    // arrival is set, departure is not
    if (dateStr <= arrival) {
      onSelect(dateStr, null);
      return;
    }
    if (isRangeFree(arrival, dateStr, booked)) {
      onSelect(arrival, dateStr);
    } else {
      onSelect(dateStr, null);
    }
  };

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const days = daysInMonth(year, month);
  const firstWeekday = (days[0].getDay() + 6) % 7; // Monday = 0
  const cells: (Date | null)[] = Array(firstWeekday).fill(null).concat(days);

  return (
    <div className="booking-calendar">
      <div className="booking-calendar-header">
        <button
          type="button"
          className="booking-calendar-arrow"
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          aria-label="Previous month"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="booking-calendar-month-title">
          {monthLabels[month]} {year}
        </div>
        <button
          type="button"
          className="booking-calendar-arrow"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          aria-label="Next month"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div className="booking-calendar-weekdays">
        {weekdayLabels.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="booking-calendar-grid">
        {cells.map((day, i) => {
          if (!day) return <span key={`empty-${i}`} className="booking-day booking-day-empty" />;
          const dateStr = toISODate(day);
          const isPast = dateStr < today;
          const isBooked = isDayBooked(dateStr, booked);
          const isArrival = dateStr === arrival;
          const isDeparture = dateStr === departure;
          const inRange = arrival && departure && dateStr > arrival && dateStr < departure;
          const disabled = isPast || isBooked;

          let className = "booking-day";
          if (disabled) className += " booking-day-disabled";
          if (isArrival || isDeparture) className += " booking-day-selected";
          if (inRange) className += " booking-day-in-range";

          return (
            <button
              type="button"
              key={dateStr}
              className={className}
              disabled={disabled}
              onClick={() => handleDayClick(dateStr)}
              title={isBooked ? "Obsadené" : undefined}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;
