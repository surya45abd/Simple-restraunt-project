import React from "react";
import { X, Wine, Clock, Check, Utensils, Sparkles } from "lucide-react";
import "./DishDetailModal.css";

export default function DishDetailModal({ dish, onClose, isInTray, onToggleTray }) {
  if (!dish) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-dish-title">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dish details">
          <X size={20} />
        </button>

        <div className="modal-layout">
          {/* Dish Image */}
          <div className="modal-image-wrapper">
            <img src={dish.image} alt={dish.alt} className="modal-image" />
            <span className="modal-tag">{dish.tag}</span>
          </div>

          {/* Dish Information */}
          <div className="modal-content">
            <div className="modal-header">
              <span className="eyebrow">{dish.category.toUpperCase()}</span>
              <div className="modal-title-row">
                <h3 id="modal-dish-title" className="modal-title">{dish.name}</h3>
                <span className="modal-price">${dish.price}</span>
              </div>
            </div>

            <p className="modal-description">{dish.description}</p>

            {/* Dietary Tags */}
            <div className="modal-dietary-row">
              {dish.dietary?.map((tag, idx) => (
                <span key={idx} className="badge-tag">
                  {tag}
                </span>
              ))}
              <span className="badge-tag badge-tag-prep">
                <Clock size={12} />
                {dish.prepTime}
              </span>
            </div>

            {/* Sommelier's Wine Pairing */}
            <div className="modal-pairing-card">
              <div className="pairing-icon">
                <Wine size={18} />
              </div>
              <div className="pairing-text">
                <span className="pairing-label">Sommelier Wine Pairing</span>
                <p className="pairing-recommendation">{dish.pairing}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button
                className={`btn-primary-custom modal-tray-btn ${isInTray ? "tray-added" : ""}`}
                onClick={() => onToggleTray(dish)}
              >
                {isInTray ? (
                  <>
                    <Check size={16} />
                    <span>In Tasting Tray</span>
                  </>
                ) : (
                  <>
                    <Utensils size={16} />
                    <span>Add to Tasting Tray</span>
                  </>
                )}
              </button>
              <a href="#reserve" className="btn-secondary-custom" onClick={onClose}>
                <span>Book a Table for This Dish</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
