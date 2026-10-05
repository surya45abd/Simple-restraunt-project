import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Utensils,
  Sparkles,
  Download,
  FileText,
  Check
} from "lucide-react";
import { generateBillPDF } from "../utils/pdfGenerator";
import "./ReservationSection.css";

const TIME_SLOTS = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
];

const SEATING_OPTIONS = [
  { id: "main", label: "Main Dining Room", desc: "Warm candlelit ambiance" },
  { id: "counter", label: "Chef's Pasta Counter", desc: "Front row to the kitchen" },
  { id: "patio", label: "Garden Greenhouse", desc: "Lush botanical setting" }
];

export default function ReservationSection({ attachedTastingNotes, trayItems = [], onOpenBillModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "7:00 PM",
    partySize: "2 guests",
    seating: "main",
    note: ""
  });

  const [minDate, setMinDate] = useState("");
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Set min date to today
  useEffect(() => {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setMinDate(localDate);
    setFormData((prev) => ({
      ...prev,
      date: prev.date || localDate
    }));
  }, []);

  // Update note when attached tasting notes change
  useEffect(() => {
    if (attachedTastingNotes) {
      setFormData((prev) => ({
        ...prev,
        note: prev.note
          ? `${prev.note}\n\n[Curated Tasting Courses]:\n${attachedTastingNotes}`
          : `[Curated Tasting Courses]:\n${attachedTastingNotes}`
      }));
    }
  }, [attachedTastingNotes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reservation processing
    setTimeout(() => {
      const confirmationCode = "OLV-" + Math.floor(1000 + Math.random() * 9000);
      const booking = {
        ...formData,
        code: confirmationCode,
        formattedDate: new Date(`${formData.date}T12:00:00`).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }),
        items: trayItems.length > 0 ? trayItems : []
      };

      setSubmittedBooking(booking);
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#c04932", "#485632", "#cba052", "#f8f6f0"]
        });
      } catch (err) {
        // Fallback gracefully if confetti fails
      }
    }, 600);
  };

  const handleDownloadPDF = () => {
    if (!submittedBooking) return;

    generateBillPDF({
      orderCode: submittedBooking.code,
      guestName: submittedBooking.name,
      email: submittedBooking.email,
      phone: submittedBooking.phone,
      date: submittedBooking.formattedDate,
      time: submittedBooking.time,
      partySize: submittedBooking.partySize,
      seating: SEATING_OPTIONS.find((s) => s.id === submittedBooking.seating)?.label || "Main Dining Room",
      items: submittedBooking.items,
      notes: submittedBooking.note
    });

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleViewBillFolio = () => {
    if (!submittedBooking) return;
    if (onOpenBillModal) {
      onOpenBillModal({
        orderCode: submittedBooking.code,
        guestName: submittedBooking.name,
        email: submittedBooking.email,
        phone: submittedBooking.phone,
        date: submittedBooking.formattedDate,
        time: submittedBooking.time,
        partySize: submittedBooking.partySize,
        seating: SEATING_OPTIONS.find((s) => s.id === submittedBooking.seating)?.label || "Main Dining Room",
        items: submittedBooking.items,
        notes: submittedBooking.note
      });
    }
  };

  return (
    <section className="reservation-section section-pad" id="reserve">
      <div className="container reservation-layout">
        {/* Reservation Intro Column */}
        <div className="reservation-intro">
          <p className="eyebrow">Your evening, sorted</p>
          <h2 className="reservation-title">
            Save a seat<br />
            <em>at our table.</em>
          </h2>
          <p className="reservation-lead">
            Good pasta waits for no one. Pick an evening, bring your favorite company, and we'll have warm focaccia and wine poured the moment you arrive.
          </p>

          <div className="reservation-perks">
            <div className="perk-row">
              <span className="perk-bullet">✦</span>
              <span>Bar seats & window counters saved for walk-ins daily</span>
            </div>
            <div className="perk-row">
              <span className="perk-bullet">✦</span>
              <span>Complimentary house amaro digestif after dinner</span>
            </div>
            <div className="perk-row">
              <span className="perk-bullet">✦</span>
              <span>Dietary requests accommodated with pleasure</span>
            </div>
          </div>

          <div className="reservation-hours-card">
            <div className="hours-badge">SERVICE HOURS</div>
            <div className="hours-detail">
              <strong>Tuesday – Sunday</strong>
              <span>5:00 PM until late</span>
            </div>
            <p className="hours-note">
              For private events of 8 or more, email <a href="mailto:events@olivakitchen.com">events@olivakitchen.com</a>
            </p>
          </div>
        </div>

        {/* Reservation Form or Confirmation Card Column */}
        <div className="reservation-card-wrapper">
          {submittedBooking ? (
            <div className="booking-confirmation-card animate-fade-in-up">
              <div className="confirmation-header">
                <CheckCircle2 size={42} className="confirmation-check-icon" />
                <span className="confirmation-eyebrow">RESERVATION CONFIRMED</span>
                <h3 className="confirmation-title">A presto, {submittedBooking.name}!</h3>
                <p className="confirmation-code">
                  Confirmation Code: <strong>{submittedBooking.code}</strong>
                </p>
              </div>

              <div className="confirmation-details-box">
                <div className="confirm-row">
                  <span className="confirm-label">Date & Time</span>
                  <strong className="confirm-val">
                    {submittedBooking.formattedDate} at {submittedBooking.time}
                  </strong>
                </div>
                <div className="confirm-row">
                  <span className="confirm-label">Party Size</span>
                  <strong className="confirm-val">{submittedBooking.partySize}</strong>
                </div>
                <div className="confirm-row">
                  <span className="confirm-label">Seating Preference</span>
                  <strong className="confirm-val">
                    {SEATING_OPTIONS.find((s) => s.id === submittedBooking.seating)?.label}
                  </strong>
                </div>
                <div className="confirm-row">
                  <span className="confirm-label">Contact</span>
                  <strong className="confirm-val">{submittedBooking.email}</strong>
                </div>
                {submittedBooking.note && (
                  <div className="confirm-note-box">
                    <span className="confirm-label">Special Requests / Tasting Courses:</span>
                    <p className="confirm-note-text">{submittedBooking.note}</p>
                  </div>
                )}
              </div>

              {/* Bill & PDF Download Card */}
              <div className="confirm-bill-card">
                <div className="bill-card-info">
                  <FileText size={20} className="bill-card-icon" />
                  <div>
                    <strong>Dining Folio & Receipt</strong>
                    <p>Download the official itemized PDF bill for your records.</p>
                  </div>
                </div>

                <div className="confirm-bill-btn-row">
                  <button
                    className={`btn-primary-custom confirm-download-btn ${downloadSuccess ? "success" : ""}`}
                    onClick={handleDownloadPDF}
                    id="confirm-pdf-download"
                  >
                    {downloadSuccess ? (
                      <>
                        <Check size={16} />
                        <span>PDF Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        <span>Download PDF Bill</span>
                      </>
                    )}
                  </button>

                  <button
                    className="btn-secondary-custom confirm-view-bill-btn"
                    onClick={handleViewBillFolio}
                  >
                    <span>View Folio / Tip</span>
                  </button>
                </div>
              </div>

              <div className="confirmation-actions">
                <button
                  className="btn-secondary-custom w-100"
                  onClick={() => setSubmittedBooking(null)}
                >
                  Make Another Reservation
                </button>
              </div>
            </div>
          ) : (
            <form className="reservation-form" onSubmit={handleSubmit} id="reservationForm">
              <div className="form-grid">
                {/* Guest Name */}
                <div className="form-field col-half">
                  <label htmlFor="guestName" className="form-label">
                    Full Name
                  </label>
                  <input
                    className="form-input"
                    id="guestName"
                    name="name"
                    type="text"
                    placeholder="e.g. Sofia Rossi"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-field col-half">
                  <label htmlFor="guestEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    className="form-input"
                    id="guestEmail"
                    name="email"
                    type="email"
                    placeholder="sofia@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-field col-half">
                  <label htmlFor="guestPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    className="form-input"
                    id="guestPhone"
                    name="phone"
                    type="tel"
                    placeholder="(718) 555-0199"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Party Size */}
                <div className="form-field col-half">
                  <label htmlFor="guestParty" className="form-label">
                    Party Size
                  </label>
                  <select
                    className="form-select"
                    id="guestParty"
                    name="partySize"
                    value={formData.partySize}
                    onChange={handleChange}
                    required
                  >
                    <option value="1 guest">1 Guest (Solo at Counter)</option>
                    <option value="2 guests">2 Guests (Table for Two)</option>
                    <option value="3 guests">3 Guests</option>
                    <option value="4 guests">4 Guests</option>
                    <option value="5 guests">5 Guests</option>
                    <option value="6 guests">6 Guests</option>
                    <option value="7+ guests">7+ Guests (Private Dining)</option>
                  </select>
                </div>

                {/* Date */}
                <div className="form-field col-half">
                  <label htmlFor="guestDate" className="form-label">
                    Date
                  </label>
                  <input
                    className="form-input"
                    id="guestDate"
                    name="date"
                    type="date"
                    min={minDate}
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Time Slot Picker */}
                <div className="form-field col-half">
                  <label htmlFor="guestTime" className="form-label">
                    Seating Time
                  </label>
                  <select
                    className="form-select"
                    id="guestTime"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seating Preference Radios */}
                <div className="form-field col-full">
                  <label className="form-label">Seating Preference</label>
                  <div className="seating-selector-grid">
                    {SEATING_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`seating-pill-option ${formData.seating === opt.id ? "selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="seating"
                          value={opt.id}
                          checked={formData.seating === opt.id}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="seating-label-title">{opt.label}</span>
                        <span className="seating-label-desc">{opt.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes & Special Requests */}
                <div className="form-field col-full">
                  <label htmlFor="guestNote" className="form-label">
                    Special Requests or Dietary Requirements <span>(optional)</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    id="guestNote"
                    name="note"
                    rows="3"
                    placeholder="Birthdays, anniversaries, severe allergies, or seating preferences..."
                    value={formData.note}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit Row */}
                <div className="form-field col-full submit-row">
                  <button
                    className="btn-primary-custom w-100 reserve-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Reserving Table...</span>
                    ) : (
                      <>
                        <span>Confirm Table Reservation</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                  <p className="submit-disclaimer">
                    Instant confirmation. No booking fee or deposit required for parties under 6.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
