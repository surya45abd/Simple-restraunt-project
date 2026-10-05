import React from "react";
import "./HighlightsStrip.css";

export default function HighlightsStrip() {
  const highlights = [
    "Handmade Pasta Daily",
    "Flour Imported from Emilia-Romagna",
    "Wood-Fired Specialties",
    "Cold-Pressed Single-Estate Olive Oil",
    "Natural & Biodynamic Wines",
    "Always A Little Extra Olive Oil",
    "San Marzano DOP Tomatoes",
    "Sunday Family Recipes"
  ];

  return (
    <div className="highlights-strip" aria-label="Restaurant highlights ticker">
      <div className="ticker-track">
        {[...highlights, ...highlights].map((item, index) => (
          <div key={index} className="ticker-item">
            <span className="ticker-bullet">✦</span>
            <span className="ticker-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
