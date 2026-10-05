import React, { useState } from "react";
import { X, Download, Printer, Check, FileText, Sparkles } from "lucide-react";
import { generateBillPDF } from "../utils/pdfGenerator";
import "./BillModal.css";

export default function BillModal({ isOpen, onClose, billData }) {
  if (!isOpen || !billData) return null;

  const [tipPercent, setTipPercent] = useState(18);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const {
    orderCode = "OLV-" + Math.floor(1000 + Math.random() * 9000),
    guestName = "Guest",
    email = "guest@example.com",
    phone = "(718) 555-0146",
    date = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    time = "7:00 PM",
    partySize = "2 Guests",
    seating = "Main Dining Room",
    items = [],
    notes = ""
  } = billData;

  // Use items if available, or default sample tasting dishes
  const activeItems = items.length > 0 ? items : [
    { id: "sample-1", name: "Burrata e Pesche", price: 18, quantity: 1, category: "antipasti" },
    { id: "sample-2", name: "Rigatoni alla Vodka", price: 26, quantity: 2, category: "pasta" },
    { id: "sample-3", name: "Torta all'Olio e Limone", price: 13, quantity: 2, category: "dolci" }
  ];

  const subtotal = activeItems.reduce((acc, it) => acc + it.price * (it.quantity || 1), 0);
  const taxRate = 0.08875; // NYC Dining Tax
  const tax = Number((subtotal * taxRate).toFixed(2));
  const gratuity = Number((subtotal * (tipPercent / 100)).toFixed(2));
  const grandTotal = Number((subtotal + tax + gratuity).toFixed(2));

  const handleDownloadPDF = () => {
    generateBillPDF({
      orderCode,
      guestName,
      email,
      phone,
      date,
      time,
      partySize,
      seating,
      items: activeItems,
      subtotal,
      taxRate,
      tipPercent,
      notes
    });

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bill-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="bill-title">
      <div className="bill-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="bill-modal-close" onClick={onClose} aria-label="Close bill">
          <X size={18} />
        </button>

        {/* Serrated Receipt Header */}
        <div className="receipt-paper">
          <div className="receipt-header">
            <div className="receipt-brand-logo">
              <span>🫒</span> oliva<span className="dot">.</span>
            </div>
            <p className="receipt-location">
              146 Wythe Avenue, Brooklyn, NY 11249<br />
              (718) 555-0146 · ciao@olivakitchen.com
            </p>
            <div className="receipt-stamp">DINING FOLIO & BILL</div>
          </div>

          {/* Receipt Meta */}
          <div className="receipt-meta-grid">
            <div>
              <span className="meta-label">CODE:</span>
              <strong className="meta-val">{orderCode}</strong>
            </div>
            <div>
              <span className="meta-label">DATE:</span>
              <span className="meta-val">{date}</span>
            </div>
            <div>
              <span className="meta-label">GUEST:</span>
              <span className="meta-val">{guestName}</span>
            </div>
            <div>
              <span className="meta-label">TIME / SEAT:</span>
              <span className="meta-val">{time} ({seating})</span>
            </div>
          </div>

          <div className="receipt-divider"></div>

          {/* Line Items */}
          <div className="receipt-items-table">
            <div className="receipt-table-header">
              <span className="th-qty">QTY</span>
              <span className="th-item">ITEM DESCRIPTION</span>
              <span className="th-price">PRICE</span>
              <span className="th-total">TOTAL</span>
            </div>

            {activeItems.map((item, idx) => (
              <div key={idx} className="receipt-table-row">
                <span className="td-qty">{item.quantity || 1}x</span>
                <span className="td-item">{item.name}</span>
                <span className="td-price">${item.price.toFixed(2)}</span>
                <span className="td-total">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="receipt-divider"></div>

          {/* Gratuity Selector */}
          <div className="receipt-tip-selector">
            <span className="tip-label">Hospitality Gratuity:</span>
            <div className="tip-buttons-row">
              {[15, 18, 20, 22].map((p) => (
                <button
                  key={p}
                  className={`tip-btn ${tipPercent === p ? "active" : ""}`}
                  onClick={() => setTipPercent(p)}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Breakdown */}
          <div className="receipt-totals-section">
            <div className="total-line">
              <span>Food & Beverage Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-line">
              <span>NYC Dining Tax (8.875%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-line">
              <span>Hospitality Staff Tip ({tipPercent}%)</span>
              <span>${gratuity.toFixed(2)}</span>
            </div>
            <div className="total-line grand-total-line">
              <strong>ESTIMATED TOTAL</strong>
              <strong className="grand-amount">${grandTotal.toFixed(2)}</strong>
            </div>
          </div>

          {/* Footer Note */}
          <div className="receipt-footer-notes">
            <p className="motto">FATTO CON AMORE</p>
            <p className="sub-motto">Handmade pasta rolled fresh daily in Brooklyn. Grazie mille!</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bill-modal-actions">
          <button
            className={`btn-primary-custom download-pdf-btn ${downloadSuccess ? "success" : ""}`}
            onClick={handleDownloadPDF}
            id="download-pdf-button"
          >
            {downloadSuccess ? (
              <>
                <Check size={18} />
                <span>PDF Downloaded!</span>
              </>
            ) : (
              <>
                <Download size={18} />
                <span>Download Bill as PDF</span>
              </>
            )}
          </button>

          <button className="btn-secondary-custom print-receipt-btn" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
