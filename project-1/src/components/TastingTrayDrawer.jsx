import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ArrowRight, Utensils, Sparkles, Download, Check, FileText } from "lucide-react";
import { generateBillPDF } from "../utils/pdfGenerator";
import "./TastingTrayDrawer.css";

export default function TastingTrayDrawer({
  isOpen,
  onClose,
  trayItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
  onAttachToReservation,
  onOpenBillModal
}) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = trayItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleDownloadPDF = () => {
    generateBillPDF({
      orderCode: "OLV-" + Math.floor(1000 + Math.random() * 9000),
      guestName: "Table Tasting Guest",
      email: "guest@example.com",
      phone: "(718) 555-0146",
      date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      time: "Evening Dinner",
      partySize: "Curated Tasting",
      seating: "Reserved Table",
      items: trayItems
    });

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleViewBill = () => {
    if (onOpenBillModal) {
      onOpenBillModal({
        orderCode: "OLV-" + Math.floor(1000 + Math.random() * 9000),
        guestName: "Table Tasting Guest",
        email: "guest@example.com",
        phone: "(718) 555-0146",
        date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        time: "Evening Dinner",
        partySize: "Curated Tasting",
        seating: "Reserved Table",
        items: trayItems
      });
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="tasting-drawer-title">
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <div className="drawer-icon-box">
              <Utensils size={18} />
            </div>
            <div>
              <h2 id="tasting-drawer-title" className="drawer-title">Table Tasting Tray</h2>
              <p className="drawer-subtitle">Your curated dinner courses for tonight</p>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close tasting tray">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {trayItems.length === 0 ? (
            <div className="drawer-empty-state">
              <span className="empty-tray-emoji">🍽️</span>
              <h3>Your Tasting Tray is Empty</h3>
              <p>Explore our menu below and tap the tasting tray icon to assemble your ideal family-style Italian feast.</p>
              <a href="#menu" className="btn-secondary-custom" onClick={onClose}>
                Browse Dishes
              </a>
            </div>
          ) : (
            <div className="drawer-items-list">
              <div className="drawer-items-count-banner">
                <span>{trayItems.length} courses curated for your table</span>
                <button className="clear-tray-btn" onClick={onClearTray} title="Clear all items">
                  Clear All
                </button>
              </div>

              {trayItems.map((item) => (
                <div key={item.id} className="drawer-dish-item">
                  <img src={item.image} alt={item.alt} className="drawer-dish-thumb" />
                  <div className="drawer-dish-info">
                    <span className="drawer-dish-category">{item.category}</span>
                    <h4 className="drawer-dish-name">{item.name}</h4>
                    <span className="drawer-dish-price">${item.price * (item.quantity || 1)}</span>
                  </div>

                  <div className="drawer-dish-controls">
                    <div className="qty-control-group">
                      <button
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-number">{item.quantity || 1}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      className="dish-remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove from tray"
                      aria-label={`Remove ${item.name} from tray`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {trayItems.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-card">
              <div className="summary-row">
                <span>Estimated Food Subtotal</span>
                <strong className="summary-amount">${subtotal}</strong>
              </div>
              <p className="summary-hint">
                <Sparkles size={13} />
                Includes tableside service, bread, and olive oil.
              </p>
            </div>

            <div className="drawer-action-stack">
              <button
                className="btn-primary-custom w-100 drawer-reserve-cta"
                onClick={() => {
                  onAttachToReservation(trayItems);
                  onClose();
                }}
              >
                <span>Attach Tasting to Reservation</span>
                <ArrowRight size={16} />
              </button>

              <div className="drawer-bill-actions-row">
                <button
                  className={`btn-secondary-custom drawer-pdf-btn ${downloadSuccess ? "success" : ""}`}
                  onClick={handleDownloadPDF}
                  title="Generate and download bill PDF"
                >
                  {downloadSuccess ? (
                    <>
                      <Check size={14} />
                      <span>PDF Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>Download Bill PDF</span>
                    </>
                  )}
                </button>

                <button
                  className="btn-secondary-custom drawer-view-bill-btn"
                  onClick={handleViewBill}
                  title="Preview itemized dining folio"
                >
                  <FileText size={14} />
                  <span>View Folio</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
