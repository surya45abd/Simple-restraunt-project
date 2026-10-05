import React from "react";
import { Star, Award, Quote } from "lucide-react";
import { restaurantInfo } from "../data/menuData";
import "./TestimonialsSection.css";

export default function TestimonialsSection() {
  return (
    <section className="acclaim-section section-pad" id="reviews">
      <div className="container">
        {/* Section Header */}
        <div className="acclaim-header">
          <p className="eyebrow">Neighborhood Acclaim</p>
          <h2 className="acclaim-title">
            Words from our <em>guests & critics.</em>
          </h2>
          <div className="rating-pill">
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <span>4.9 / 5.0 Rating from 1,200+ dinners</span>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="quotes-grid">
          {restaurantInfo.pressQuotes.map((item, index) => (
            <div key={index} className="quote-card">
              <Quote size={28} className="quote-icon" />
              <p className="quote-text">"{item.quote}"</p>
              <div className="quote-footer">
                <span className="quote-source">{item.source}</span>
                <span className="quote-badge">
                  <Award size={12} />
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
