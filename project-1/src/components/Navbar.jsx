import React, { useState, useEffect } from "react";
import { Utensils, Calendar, Menu, X, ArrowUpRight } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ tastingCount, onOpenTastingTray }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <a href="#home" className="header-brand" aria-label="Oliva Italian Kitchen">
          <span className="brand-symbol">🫒</span>
          <span className="brand-text">
            oliva<span className="brand-dot">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <a href="#menu" className="nav-link">Our Menu</a>
          <a href="#story" className="nav-link">Our Story</a>
          <a href="#reviews" className="nav-link">Acclaim</a>
          <a href="#reserve" className="nav-link">Reservations</a>
          <a href="#visit" className="nav-link">Hours & Location</a>
        </nav>

        {/* Actions (Tasting Tray + Reserve CTA) */}
        <div className="header-actions">
          {/* Tasting Tray Button */}
          <button
            id="tasting-tray-btn"
            className="tasting-tray-trigger"
            onClick={onOpenTastingTray}
            title="View your curated table tasting order"
            aria-label={`Table tasting tray with ${tastingCount} items`}
          >
            <Utensils size={16} />
            <span className="tray-label">Tasting Tray</span>
            {tastingCount > 0 && <span className="tray-badge">{tastingCount}</span>}
          </button>

          {/* Reserve CTA */}
          <a href="#reserve" className="header-reserve-btn">
            <span>Book a table</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Toggler */}
          <button
            className="mobile-toggler"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <a href="#menu" className="mobile-nav-link" onClick={closeMenu}>
            Our Menu
          </a>
          <a href="#story" className="mobile-nav-link" onClick={closeMenu}>
            Our Story
          </a>
          <a href="#reviews" className="mobile-nav-link" onClick={closeMenu}>
            Acclaim
          </a>
          <a href="#reserve" className="mobile-nav-link" onClick={closeMenu}>
            Reserve a Table
          </a>
          <a href="#visit" className="mobile-nav-link" onClick={closeMenu}>
            Hours & Location
          </a>

          <div className="mobile-menu-footer">
            <button
              className="btn-secondary-custom w-100"
              onClick={() => {
                closeMenu();
                onOpenTastingTray();
              }}
            >
              <Utensils size={16} />
              <span>Tasting Tray ({tastingCount})</span>
            </button>
            <a
              href="#reserve"
              className="btn-primary-custom w-100"
              onClick={closeMenu}
            >
              <span>Book a Table</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
