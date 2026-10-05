import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HighlightsStrip from "./components/HighlightsStrip";
import MenuSection from "./components/MenuSection";
import StorySection from "./components/StorySection";
import TestimonialsSection from "./components/TestimonialsSection";
import ReservationSection from "./components/ReservationSection";
import Footer from "./components/Footer";
import TastingTrayDrawer from "./components/TastingTrayDrawer";
import BillModal from "./components/BillModal";
import { Utensils, FileText } from "lucide-react";
import "./App.css";

export default function App() {
  const [trayItems, setTrayItems] = useState([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [attachedTastingNotes, setAttachedTastingNotes] = useState("");
  const [activeBillData, setActiveBillData] = useState(null);

  // Toggle dish in/out of tray
  const handleToggleTray = (dish) => {
    setTrayItems((prev) => {
      const exists = prev.find((item) => item.id === dish.id);
      if (exists) {
        return prev.filter((item) => item.id !== dish.id);
      } else {
        return [...prev, { ...dish, quantity: 1 }];
      }
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(dishId);
      return;
    }
    setTrayItems((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove single item
  const handleRemoveItem = (dishId) => {
    setTrayItems((prev) => prev.filter((item) => item.id !== dishId));
  };

  // Clear all items
  const handleClearTray = () => {
    setTrayItems([]);
  };

  // Attach curated tasting items to reservation form
  const handleAttachToReservation = (items) => {
    if (items.length === 0) return;
    const formatted = items
      .map((item) => `• ${item.quantity || 1}x ${item.name} ($${item.price * (item.quantity || 1)})`)
      .join("\n");
    setAttachedTastingNotes(formatted);

    // Smooth scroll to reservation section
    const reserveSection = document.getElementById("reserve");
    if (reserveSection) {
      reserveSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Quick action to view & generate bill folio from current tray
  const handleGenerateBillFromTray = () => {
    setActiveBillData({
      orderCode: "OLV-" + Math.floor(1000 + Math.random() * 9000),
      guestName: "Guest Tasting Folio",
      email: "guest@example.com",
      phone: "(718) 555-0146",
      date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      time: "Evening Dinner",
      partySize: "Curated Tasting",
      seating: "Reserved Dining",
      items: trayItems
    });
  };

  const totalTastingCount = trayItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="app-root">
      {/* Sticky Glass Navbar */}
      <Navbar
        tastingCount={totalTastingCount}
        onOpenTastingTray={() => setIsTrayOpen(true)}
      />

      {/* Main Content */}
      <main>
        <Hero onOpenTastingTray={() => setIsTrayOpen(true)} />
        <HighlightsStrip />
        <MenuSection
          trayItems={trayItems}
          onToggleTray={handleToggleTray}
        />
        <StorySection />
        <TestimonialsSection />
        <ReservationSection
          attachedTastingNotes={attachedTastingNotes}
          trayItems={trayItems}
          onOpenBillModal={setActiveBillData}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Table Tasting Drawer */}
      <TastingTrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        trayItems={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
        onAttachToReservation={handleAttachToReservation}
        onOpenBillModal={setActiveBillData}
      />

      {/* Bill & PDF Receipt Modal */}
      {activeBillData && (
        <BillModal
          isOpen={Boolean(activeBillData)}
          onClose={() => setActiveBillData(null)}
          billData={activeBillData}
        />
      )}

      {/* Floating Tasting Tray Pill for quick access */}
      {totalTastingCount > 0 && !isTrayOpen && (
        <div className="floating-actions-container">
          <button
            className="floating-tasting-pill"
            onClick={() => setIsTrayOpen(true)}
            aria-label={`View tasting tray with ${totalTastingCount} items`}
          >
            <Utensils size={16} />
            <span>Tasting Tray</span>
            <span className="floating-badge">{totalTastingCount}</span>
          </button>

          <button
            className="floating-bill-pill"
            onClick={handleGenerateBillFromTray}
            title="Generate and view itemized PDF bill"
            aria-label="Generate bill PDF"
          >
            <FileText size={16} />
            <span>Bill PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}
