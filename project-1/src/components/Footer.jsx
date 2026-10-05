import React, { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Mail, Check } from "lucide-react";
import { restaurantInfo } from "../data/menuData";
import "./Footer.css";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="site-footer" id="visit">
      <div className="container">
        {/* Newsletter / Dinner Invitations Banner */}
        <div className="footer-newsletter-banner">
          <div className="newsletter-copy">
            <span className="eyebrow eyebrow-light">Table Notes & Invitations</span>
            <h3>Seasonal Menus & Wine Tastings</h3>
            <p>Join our private guest list for seasonal truffle dinners, winemaker visits, and Sunday releases.</p>
          </div>

          <form className="newsletter-form" onSubmit={handleNewsletter}>
            {newsletterSubscribed ? (
              <div className="newsletter-success">
                <Check size={18} />
                <span>Grazie! You're on our private guest list.</span>
              </div>
            ) : (
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="btn-primary-custom newsletter-btn">
                  <span>Join Table</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Columns */}
        <div className="footer-main-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <a href="#home" className="footer-brand">
              oliva<span>.</span>
            </a>
            <p className="footer-brand-motto">
              Come as you are.<br />
              Leave a little happier.
            </p>
            <div className="footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>{restaurantInfo.instagram}</span>
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="footer-col">
            <span className="footer-col-title">COME FIND US</span>
            <p className="footer-text">
              146 Wythe Avenue<br />
              Brooklyn, NY 11249
            </p>
            <a
              href={restaurantInfo.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="footer-action-link"
            >
              <span>Get directions</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Hours */}
          <div className="footer-col">
            <span className="footer-col-title">PULL UP A CHAIR</span>
            <div className="footer-hours-list">
              {restaurantInfo.hours.map((h, i) => (
                <div key={i} className="footer-hour-item">
                  <span className="hour-days">{h.days}</span>
                  <span className="hour-time">{h.times}</span>
                </div>
              ))}
            </div>
            <a href={`tel:${restaurantInfo.phone}`} className="footer-action-link">
              <span>{restaurantInfo.phone}</span>
            </a>
          </div>

          {/* Say Ciao */}
          <div className="footer-col">
            <span className="footer-col-title">SAY CIAO</span>
            <p className="footer-text">
              We love notes, celebrations, and questions about our pasta flours.
            </p>
            <a href={`mailto:${restaurantInfo.email}`} className="footer-action-link">
              <span>{restaurantInfo.email}</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom-strip">
          <span>© {new Date().getFullYear()} Oliva Italian Kitchen. All rights reserved.</span>
          <span className="motto-tag">Made with love, and a little extra olive oil.</span>
        </div>
      </div>
    </footer>
  );
}
