import React, { useEffect, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import { BookedRange } from "./dateUtils";

interface ReservationText {
  title: string;
  selectDates: string;
  loadingAvailability: string;
  loadError: string;
  arrival: string;
  departure: string;
  nights: string;
  continue: string;
  back: string;
  guestDetails: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorGeneric: string;
  errorConflict: string;
  close: string;
  weekdays: string[];
  months: string[];
}

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  t: ReservationText;
}

type Step = "dates" | "details" | "submitting" | "success" | "error";

const nightsBetween = (a: string, b: string) =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24));

const ReservationModal: React.FC<ReservationModalProps> = ({ open, onClose, propertyId, propertyTitle, t }) => {
  const [step, setStep] = useState<Step>("dates");
  const [booked, setBooked] = useState<BookedRange[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);
  const [arrival, setArrival] = useState<string | null>(null);
  const [departure, setDeparture] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [numGuests, setNumGuests] = useState(2);
  const [website, setWebsite] = useState(""); // honeypot: real users never fill this

  useEffect(() => {
    if (!open) return;
    setStep("dates");
    setArrival(null);
    setDeparture(null);
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setNumGuests(2);
    setWebsite("");
    setErrorMessage("");

    setLoadingAvailability(true);
    setAvailabilityError(false);
    fetch(`/api/availability?property=${encodeURIComponent(propertyId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data) => setBooked(data.booked ?? []))
      .catch(() => setAvailabilityError(true))
      .finally(() => setLoadingAvailability(false));
  }, [open, propertyId]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arrival || !departure) return;
    setStep("submitting");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          arrivalDate: arrival,
          departureDate: departure,
          guestName,
          guestEmail,
          guestPhone,
          numGuests,
          website,
        }),
      });
      if (res.status === 409) {
        setErrorMessage(t.errorConflict);
        setStep("error");
        return;
      }
      if (!res.ok) {
        setErrorMessage(t.errorGeneric);
        setStep("error");
        return;
      }
      setStep("success");
    } catch {
      setErrorMessage(t.errorGeneric);
      setStep("error");
    }
  };

  return (
    <div className="gallery-overlay reservation-overlay">
      <div className="reservation-modal">
        <button className="reservation-close" onClick={onClose} aria-label={t.close}>
          &times;
        </button>
        <h2 className="reservation-title">
          {t.title}: {propertyTitle}
        </h2>

        {step === "dates" && (
          <>
            <p className="reservation-step-label">{t.selectDates}</p>
            {loadingAvailability && <p>{t.loadingAvailability}</p>}
            {availabilityError && <p className="reservation-error">{t.loadError}</p>}
            {!loadingAvailability && !availabilityError && (
              <>
                <BookingCalendar
                  booked={booked}
                  arrival={arrival}
                  departure={departure}
                  onSelect={(a, d) => {
                    setArrival(a);
                    setDeparture(d);
                  }}
                  monthLabels={t.months}
                  weekdayLabels={t.weekdays}
                />
                <div className="reservation-selection-summary">
                  <span>
                    {t.arrival}: <strong>{arrival ?? "-"}</strong>
                  </span>
                  <span>
                    {t.departure}: <strong>{departure ?? "-"}</strong>
                  </span>
                  {arrival && departure && (
                    <span>
                      {nightsBetween(arrival, departure)} {t.nights}
                    </span>
                  )}
                </div>
                <div className="reservation-actions">
                  <button
                    type="button"
                    className="reserve-btn"
                    disabled={!arrival || !departure}
                    onClick={() => setStep("details")}
                  >
                    {t.continue}
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {(step === "details" || step === "submitting" || step === "error") && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="reservation-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <p className="reservation-step-label">{t.guestDetails}</p>
            <div className="reservation-selection-summary">
              <span>
                {t.arrival}: <strong>{arrival}</strong>
              </span>
              <span>
                {t.departure}: <strong>{departure}</strong>
              </span>
            </div>
            <div className="reservation-field">
              <label htmlFor="res-name">{t.name}</label>
              <input
                id="res-name"
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
            <div className="reservation-field">
              <label htmlFor="res-email">{t.email}</label>
              <input
                id="res-email"
                type="email"
                required
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
              />
            </div>
            <div className="reservation-field">
              <label htmlFor="res-phone">{t.phone}</label>
              <input
                id="res-phone"
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
              />
            </div>
            <div className="reservation-field">
              <label htmlFor="res-guests">{t.guests}</label>
              <input
                id="res-guests"
                type="number"
                min={1}
                max={20}
                required
                value={numGuests}
                onChange={(e) => setNumGuests(Number(e.target.value))}
              />
            </div>

            {step === "error" && <p className="reservation-error">{errorMessage}</p>}

            <div className="reservation-actions">
              <button type="button" className="gray-action-btn" onClick={() => setStep("dates")}>
                {t.back}
              </button>
              <button type="submit" className="reserve-btn" disabled={step === "submitting"}>
                {step === "submitting" ? t.submitting : t.submit}
              </button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="reservation-success">
            <h3>{t.successTitle}</h3>
            <p>{t.successBody}</p>
            <div className="reservation-actions">
              <button type="button" className="reserve-btn" onClick={onClose}>
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
