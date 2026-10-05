import { jsPDF } from "jspdf";

/**
 * Generates and downloads a luxury dining folio / receipt PDF for Oliva Italian Kitchen.
 *
 * @param {Object} billDetails
 * @param {string} billDetails.orderCode - e.g. "OLV-8421"
 * @param {string} billDetails.guestName - Guest's name
 * @param {string} billDetails.email - Guest's email
 * @param {string} billDetails.phone - Guest's phone
 * @param {string} billDetails.date - Formatted date string
 * @param {string} billDetails.time - Seating time
 * @param {string} billDetails.partySize - Party size
 * @param {string} billDetails.seating - Seating preference
 * @param {Array} billDetails.items - Array of items: { name, quantity, price, category }
 * @param {number} billDetails.subtotal - Subtotal amount
 * @param {number} [billDetails.taxRate=0.08875] - Tax rate (NYC 8.875%)
 * @param {number} [billDetails.tipPercent=18] - Gratuity percent
 * @param {string} [billDetails.notes] - Special requests / notes
 */
export function generateBillPDF(billDetails) {
  const {
    orderCode = "OLV-" + Math.floor(1000 + Math.random() * 9000),
    guestName = "Valued Guest",
    email = "guest@example.com",
    phone = "(718) 555-0146",
    date = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    time = "7:00 PM",
    partySize = "2 Guests",
    seating = "Main Dining Room",
    items = [],
    taxRate = 0.08875,
    tipPercent = 18,
    notes = ""
  } = billDetails;

  // Fallback if no specific food items in tray: provide chef's tasting sample courses
  const billItems = items.length > 0 ? items : [
    { name: "Rigatoni alla Vodka", category: "pasta", quantity: 2, price: 26 },
    { name: "Burrata e Pesche", category: "antipasti", quantity: 1, price: 18 },
    { name: "Torta all'Olio e Limone", category: "dolci", quantity: 2, price: 13 }
  ];

  const subtotal = billItems.reduce((acc, it) => acc + it.price * (it.quantity || 1), 0);
  const tax = Number((subtotal * taxRate).toFixed(2));
  const gratuity = Number((subtotal * (tipPercent / 100)).toFixed(2));
  const grandTotal = Number((subtotal + tax + gratuity).toFixed(2));

  // Create A4 PDF Document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // --- BRAND HEADER ---
  // Background brand header bar
  doc.setFillColor(34, 38, 29); // #22261d Deep ink olive
  doc.rect(margin, y, contentWidth, 34, "F");

  // Gold accent line under header
  doc.setFillColor(207, 161, 88); // #cfa158 Gold
  doc.rect(margin, y + 33, contentWidth, 1.5, "F");

  // Brand Name
  doc.setTextColor(248, 246, 240); // Warm paper white
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("OLIVA", margin + 10, y + 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(207, 161, 88);
  doc.text("ITALIAN KITCHEN  ·  BROOKLYN, NY", margin + 10, y + 22);

  doc.setTextColor(190, 195, 185);
  doc.setFontSize(8);
  doc.text("146 Wythe Ave, Brooklyn, NY 11249  |  (718) 555-0146", margin + 10, y + 28);

  // Right-side folio badge
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(248, 246, 240);
  doc.text("DINING FOLIO & RECEIPT", pageWidth - margin - 10, y + 14, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(207, 161, 88);
  doc.text(`REF: ${orderCode}`, pageWidth - margin - 10, y + 20, { align: "right" });
  doc.setTextColor(190, 195, 185);
  doc.text(new Date().toLocaleDateString("en-US"), pageWidth - margin - 10, y + 26, { align: "right" });

  y += 44;

  // --- GUEST & RESERVATION DETAILS CARD ---
  doc.setFillColor(243, 240, 230); // Warm paper surface
  doc.rect(margin, y, contentWidth, 28, "F");
  doc.setDrawColor(218, 214, 202);
  doc.setLineWidth(0.3);
  doc.rect(margin, y, contentWidth, 28, "S");

  doc.setTextColor(40, 45, 35);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("GUEST & TABLE DETAILS", margin + 8, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80, 85, 75);

  // Column 1
  doc.text(`Guest: ${guestName}`, margin + 8, y + 14);
  doc.text(`Email: ${email}`, margin + 8, y + 20);

  // Column 2
  const col2X = margin + (contentWidth / 3);
  doc.text(`Date: ${date}`, col2X, y + 14);
  doc.text(`Time: ${time}`, col2X, y + 20);

  // Column 3
  const col3X = margin + (contentWidth * 2 / 3);
  doc.text(`Party: ${partySize}`, col3X, y + 14);
  doc.text(`Seating: ${seating}`, col3X, y + 20);

  y += 36;

  // --- ITEMIZED COURSES TABLE ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(40, 45, 35);
  doc.text("CURATED DINNER COURSES", margin, y);

  y += 5;

  // Table Header
  doc.setFillColor(52, 64, 42); // Olive dark
  doc.rect(margin, y, contentWidth, 8, "F");

  doc.setTextColor(248, 246, 240);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("QTY", margin + 4, y + 5.5);
  doc.text("DISH / ITEM DESCRIPTION", margin + 22, y + 5.5);
  doc.text("COURSE", margin + 105, y + 5.5);
  doc.text("UNIT PRICE", margin + 135, y + 5.5, { align: "right" });
  doc.text("TOTAL", margin + contentWidth - 4, y + 5.5, { align: "right" });

  y += 8;

  // Table Rows
  billItems.forEach((item, index) => {
    const itemTotal = (item.price * (item.quantity || 1)).toFixed(2);
    const isEven = index % 2 === 0;

    if (isEven) {
      doc.setFillColor(250, 249, 245);
      doc.rect(margin, y, contentWidth, 8, "F");
    }

    doc.setDrawColor(230, 226, 216);
    doc.line(margin, y + 8, margin + contentWidth, y + 8);

    doc.setTextColor(40, 45, 35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`${item.quantity || 1}x`, margin + 4, y + 5.5);

    doc.setFont("helvetica", "normal");
    doc.text(item.name, margin + 22, y + 5.5);

    doc.setFontSize(7.5);
    doc.setTextColor(100, 105, 95);
    const catLabel = item.category ? item.category.toUpperCase() : "COURSE";
    doc.text(catLabel, margin + 105, y + 5.5);

    doc.setFontSize(8.5);
    doc.setTextColor(60, 65, 55);
    doc.text(`$${item.price.toFixed(2)}`, margin + 135, y + 5.5, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 45, 35);
    doc.text(`$${itemTotal}`, margin + contentWidth - 4, y + 5.5, { align: "right" });

    y += 8;
  });

  y += 6;

  // --- FINANCIAL TOTALS BOX ---
  const totalsBoxWidth = 75;
  const totalsBoxX = margin + contentWidth - totalsBoxWidth;

  doc.setFillColor(245, 243, 235);
  doc.rect(totalsBoxX, y, totalsBoxWidth, 38, "F");
  doc.setDrawColor(218, 214, 202);
  doc.rect(totalsBoxX, y, totalsBoxWidth, 38, "S");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80, 85, 75);

  let ty = y + 7;
  doc.text("Food & Beverage:", totalsBoxX + 6, ty);
  doc.text(`$${subtotal.toFixed(2)}`, totalsBoxX + totalsBoxWidth - 6, ty, { align: "right" });

  ty += 6;
  doc.text("NYC Dining Tax (8.875%):", totalsBoxX + 6, ty);
  doc.text(`$${tax.toFixed(2)}`, totalsBoxX + totalsBoxWidth - 6, ty, { align: "right" });

  ty += 6;
  doc.text(`Hospitality (${tipPercent}%):`, totalsBoxX + 6, ty);
  doc.text(`$${gratuity.toFixed(2)}`, totalsBoxX + totalsBoxWidth - 6, ty, { align: "right" });

  ty += 4;
  doc.setDrawColor(190, 79, 56);
  doc.setLineWidth(0.8);
  doc.line(totalsBoxX + 6, ty, totalsBoxX + totalsBoxWidth - 6, ty);

  ty += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(190, 79, 56); // Terracotta
  doc.text("ESTIMATED TOTAL:", totalsBoxX + 6, ty);
  doc.text(`$${grandTotal.toFixed(2)}`, totalsBoxX + totalsBoxWidth - 6, ty, { align: "right" });

  // Optional Special Note on Left
  if (notes) {
    const notesBoxWidth = contentWidth - totalsBoxWidth - 10;
    doc.setFillColor(252, 250, 246);
    doc.rect(margin, y, notesBoxWidth, 38, "F");
    doc.setDrawColor(225, 220, 210);
    doc.rect(margin, y, notesBoxWidth, 38, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(72, 86, 50);
    doc.text("SPECIAL REQUESTS & INSTRUCTIONS", margin + 6, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(80, 85, 75);
    const splitNotes = doc.splitTextToSize(notes, notesBoxWidth - 12);
    doc.text(splitNotes.slice(0, 4), margin + 6, y + 14);
  }

  y += 48;

  // --- FOOTER & RESTAURANT POLICY ---
  doc.setDrawColor(218, 214, 202);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + contentWidth, y);

  y += 7;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 105, 95);
  doc.text("FATTO CON AMORE  ·  Handmade pasta rolled fresh every morning in Brooklyn.", pageWidth / 2, y, { align: "center" });

  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(130, 135, 125);
  doc.text("Service included for parties of 6 or more. Please notify your server of severe allergies.", pageWidth / 2, y, { align: "center" });

  y += 5;
  doc.setTextColor(190, 79, 56);
  doc.setFont("helvetica", "bold");
  doc.text("GRAZIE MILLE PER LA VISITA!", pageWidth / 2, y, { align: "center" });

  // Save the PDF file
  const filename = `Oliva-Receipt-${orderCode}.pdf`;
  doc.save(filename);
  return filename;
}
