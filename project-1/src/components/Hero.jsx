import React from "react";
import { ArrowUpRight, ArrowDown, Sparkles, Clock, Wine, Heart } from "lucide-react";
import "./Hero.css";

export default function Hero({ onOpenTastingTray }) {
  return (
    <section className="hero" id="home">
      {/* Background with Ambient Overlay */}
      <div className="hero-bg" role="img" aria-label="A candlelit table set for an intimate Italian dinner"></div>
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        {/* Live Service Status */}
        <div className="hero-status-pill animate-fade-in-up">
          <span className="live-dot"></span>
          <span>Open Tonight · Dinner Seating from 5:00 PM</span>
        </div>

        {/* Hero Eyebrow & Title */}
        <div className="hero-text-block">
          <p className="eyebrow eyebrow-light">
            A neighborhood Italian kitchen
          </p>
          <h1 className="hero-title">
            Come hungry.<br />
            <em>Leave happy.</em>
          </h1>
          <p className="hero-lead">
            Seasonal plates, handmade pasta rolled by hand every morning, and natural wines poured with generosity. Pull up a chair, you're right at home.
          </p>
        </div>

        {/* Hero Action Buttons */}
        <div className="hero-cta-group">
          <a href="#reserve" className="btn-primary-custom hero-btn-main">
            <span>Find your table</span>
            <ArrowUpRight size={16} />
          </a>
          <a href="#menu" className="hero-menu-link">
            <span>Explore the menu</span>
            <ArrowDown size={14} className="arrow-down-bounce" />
          </a>
        </div>

        {/* Feature Highlights Grid at Bottom of Hero */}
        <div className="hero-badges-row">
          <div className="hero-badge-item">
            <div className="badge-icon-box"><Sparkles size={16} /></div>
            <div>
              <strong>40-Yolk Pasta</strong>
              <p>Rolled fresh every single morning</p>
            </div>
          </div>
          <div className="hero-badge-item">
            <div className="badge-icon-box"><Wine size={16} /></div>
            <div>
              <strong>Natural Wines</strong>
              <p>Hand-picked family vineyards</p>
            </div>
          </div>
          <div className="hero-badge-item">
            <div className="badge-icon-box"><Heart size={16} /></div>
            <div>
              <strong>Local Purveyors</strong>
              <p>Seasonally sourced ingredients</p>
            </div>
          </div>
        </div>

        {/* Editorial Vertical Index */}
        <div className="hero-editorial-tag" aria-hidden="true">
          EST. 2014 &nbsp;·&nbsp; 146 WYTHE AVE, BROOKLYN
        </div>
      </div>
    </section>
  );
}
