import React from "react";
import { ArrowUpRight, Flame, Heart, Compass } from "lucide-react";
import "./StorySection.css";

export default function StorySection() {
  return (
    <section className="story-section" id="story">
      {/* Visual Photography Column */}
      <div className="story-visual-side">
        <div className="story-image-bg" role="img" aria-label="Fresh tagliatelle pasta being rolled by hand on wooden board"></div>
        <div className="story-image-overlay"></div>

        {/* Circular artisan stamp badge */}
        <div className="story-stamp" aria-hidden="true">
          <div className="stamp-inner">
            <span>FATTO</span>
            <span>CON</span>
            <span>AMORE</span>
          </div>
        </div>

        {/* Floating Stat Card */}
        <div className="story-floating-card">
          <div className="card-symbol">🍝</div>
          <div>
            <strong>100% In-House Extrusion</strong>
            <p>Every strand cut on imported brass dies</p>
          </div>
        </div>
      </div>

      {/* Narrative Editorial Column */}
      <div className="story-copy-side">
        <p className="eyebrow eyebrow-light">A table for everyone</p>
        <h2 className="story-title">
          Food tastes<br />
          better <em>together.</em>
        </h2>

        <div className="story-paragraphs">
          <p>
            Oliva began in 2014 with an old leather-bound family recipe book from Puglia, five barrels of cold-pressed Sicilian olive oil, and the steadfast belief that the best evenings are the ones that linger far past dessert.
          </p>
          <p>
            Over a decade later in Brooklyn, we still roll our dough at 7:00 AM every single morning, source organic greens from regional smallholders, and make sure your favorite corner table feels like returning home.
          </p>
        </div>

        {/* Story Pillars */}
        <div className="story-pillars">
          <div className="pillar-item">
            <Flame size={18} className="pillar-icon" />
            <div>
              <h4>Wood & Fire</h4>
              <p>Old-world roasting over kiln-dried hardwood</p>
            </div>
          </div>
          <div className="pillar-item">
            <Heart size={18} className="pillar-icon" />
            <div>
              <h4>Warm Welcome</h4>
              <p>Never rush a meal; pull up another chair</p>
            </div>
          </div>
          <div className="pillar-item">
            <Compass size={18} className="pillar-icon" />
            <div>
              <h4>Native Grapes</h4>
              <p>Low-intervention biodynamic Italian winemakers</p>
            </div>
          </div>
        </div>

        <div className="story-cta-row">
          <a href="#visit" className="story-link">
            <span>A little more about our producers</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
