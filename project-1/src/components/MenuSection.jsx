import React, { useState, useMemo } from "react";
import { Search, Eye, Plus, Check, Sparkles, Filter, X } from "lucide-react";
import { menuItems } from "../data/menuData";
import DishDetailModal from "./DishDetailModal";
import "./MenuSection.css";

const CATEGORIES = [
  { id: "all", label: "Everything" },
  { id: "antipasti", label: "Antipasti" },
  { id: "pasta", label: "Primi & Pasta" },
  { id: "secondi", label: "Secondi" },
  { id: "dolci", label: "Dolci" }
];

export default function MenuSection({ trayItems, onToggleTray }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDietary, setSelectedDietary] = useState("all");
  const [activeModalDish, setActiveModalDish] = useState(null);

  // Filtered menu logic
  const filteredDishes = useMemo(() => {
    return menuItems.filter((dish) => {
      // Category filter
      const matchesCategory = activeCategory === "all" || dish.category === activeCategory;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        dish.tag.toLowerCase().includes(q) ||
        dish.category.toLowerCase().includes(q);

      // Dietary filter
      const matchesDietary =
        selectedDietary === "all" ||
        dish.dietary?.some((d) => d.toLowerCase().includes(selectedDietary.toLowerCase()));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, selectedDietary]);

  const isDishInTray = (dishId) => trayItems.some((item) => item.id === dishId);

  return (
    <section className="menu-section section-pad" id="menu">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header-split">
          <div>
            <p className="eyebrow">From Our Kitchen</p>
            <h2 className="section-title">
              A little taste<br />
              of <em>Oliva.</em>
            </h2>
          </div>
          <p className="section-description">
            Simple honest ingredients, treated with devotion. Our menu evolves alongside Brooklyn's farmers markets and seasonal Italian harvests.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="menu-controls-wrapper">
          {/* Category Tabs */}
          <div className="category-tabs" role="tablist" aria-label="Menu categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`category-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Dietary Bar */}
          <div className="search-dietary-bar">
            {/* Search Input */}
            <div className="menu-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes or ingredients..."
                aria-label="Search menu"
                className="menu-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div className="dietary-pills-row" role="group" aria-label="Dietary preferences">
              {["all", "vegetarian", "gluten"].map((diet) => (
                <button
                  key={diet}
                  className={`dietary-pill ${selectedDietary === diet ? "active" : ""}`}
                  onClick={() => setSelectedDietary(diet)}
                >
                  {diet === "all" ? "All Diets" : diet === "gluten" ? "Gluten-Friendly" : "Vegetarian"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="menu-empty-state">
            <p>No dishes found matching "{searchQuery}". Try selecting another category or resetting filters.</p>
            <button
              className="btn-secondary-custom"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setSelectedDietary("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="menu-grid" aria-live="polite">
            {filteredDishes.map((dish, index) => {
              const inTray = isDishInTray(dish.id);
              return (
                <article
                  key={dish.id}
                  className="menu-card"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="menu-card-media" onClick={() => setActiveModalDish(dish)}>
                    <img
                      src={dish.image}
                      alt={dish.alt}
                      className="menu-card-img"
                      loading="lazy"
                    />
                    <span className="card-badge-tag">{dish.tag}</span>
                    <button
                      className="quick-view-overlay"
                      aria-label={`View details and wine pairings for ${dish.name}`}
                    >
                      <Eye size={16} />
                      <span>Wine Pairing & Details</span>
                    </button>
                  </div>

                  <div className="menu-card-body">
                    <div className="card-info">
                      <div className="card-heading-row">
                        <h3 className="dish-name" onClick={() => setActiveModalDish(dish)}>
                          {dish.name}
                        </h3>
                        <span className="dish-price">${dish.price}</span>
                      </div>
                      <p className="dish-desc">{dish.description}</p>
                    </div>

                    <div className="card-footer-action">
                      <button
                        className={`add-tray-btn ${inTray ? "added" : ""}`}
                        onClick={() => onToggleTray(dish)}
                        title={inTray ? "Remove from tasting tray" : "Add to table tasting tray"}
                        aria-pressed={inTray}
                      >
                        {inTray ? (
                          <>
                            <Check size={14} />
                            <span>In Tasting Tray</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            <span>Add to Tasting</span>
                          </>
                        )}
                      </button>

                      <button
                        className="details-link-btn"
                        onClick={() => setActiveModalDish(dish)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Menu Section Footer Strip */}
        <div className="menu-section-footer">
          <div className="menu-footer-note">
            <Sparkles size={16} className="sparkle-icon" />
            <span>
              All handmade pasta is produced fresh daily in-house using non-GMO grains and heritage eggs.
            </span>
          </div>
          <a href="#reserve" className="menu-reserve-link">
            <span>Come taste it in person</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Dish Detail & Wine Pairing Modal */}
      {activeModalDish && (
        <DishDetailModal
          dish={activeModalDish}
          onClose={() => setActiveModalDish(null)}
          isInTray={isDishInTray(activeModalDish.id)}
          onToggleTray={onToggleTray}
        />
      )}
    </section>
  );
}
