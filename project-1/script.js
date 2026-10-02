const menuItems = [
  {
    name: "Burrata e Pesche",
    category: "antipasti",
    description: "Creamy burrata, grilled peaches, basil, and a little aged balsamic.",
    price: "$16",
    tag: "A house favorite",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=82",
    alt: "Fresh burrata served with seasonal fruit"
  },
  {
    name: "Rigatoni alla Vodka",
    category: "pasta",
    description: "Our slow-simmered tomato cream, parmesan, and a little Calabrian heat.",
    price: "$24",
    tag: "Handmade pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=82",
    alt: "A bowl of handmade pasta with tomato sauce"
  },
  {
    name: "Polpette della Nonna",
    category: "antipasti",
    description: "Sunday-style beef and pork meatballs, tomato sugo, grilled sourdough.",
    price: "$18",
    tag: "A family recipe",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=82",
    alt: "Italian meatballs in a rich tomato sauce"
  },
  {
    name: "Lemon Olive Oil Cake",
    category: "dolci",
    description: "Tender citrus cake, whipped mascarpone, and whatever berries look good.",
    price: "$12",
    tag: "Save room",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=82",
    alt: "A slice of lemon cake with fresh berries"
  },
  {
    name: "Cacio e Pepe",
    category: "pasta",
    description: "Tonnarelli, pecorino Romano, cracked black pepper. That's the whole thing.",
    price: "$22",
    tag: "Made to order",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=82",
    alt: "Fresh pasta twirled with parmesan and black pepper"
  },
  {
    name: "Tiramisu, Obviously",
    category: "dolci",
    description: "Espresso-soaked ladyfingers, cloud-soft mascarpone, plenty of cocoa.",
    price: "$13",
    tag: "Nonna approved",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=82",
    alt: "Classic tiramisu dusted with cocoa"
  }
];

const menuGrid = document.querySelector("#menuGrid");
const filterButtons = document.querySelectorAll(".menu-filter");

function renderMenu(category = "all") {
  const visibleItems = category === "all"
    ? menuItems
    : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = visibleItems.map((item, index) => `
    <article class="col-sm-6 col-lg-4" style="animation-delay:${index * 55}ms">
      <div class="menu-card">
        <img class="menu-card-image" src="${item.image}" alt="${item.alt}" loading="lazy">
        <div class="menu-card-body">
          <div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="menu-tag">${item.tag}</span>
          </div>
          <span class="menu-price">${item.price}</span>
        </div>
      </div>
    </article>
  `).join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    renderMenu(button.dataset.category);
  });
});

const reservationForm = document.querySelector("#reservationForm");
const reservationStatus = document.querySelector("#reservationStatus");
const dateInput = document.querySelector("#guestDate");

function setMinimumReservationDate() {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  dateInput.min = localDate;
}

setMinimumReservationDate();

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;

  const formData = new FormData(reservationForm);
  const guestName = formData.get("name").trim();
  const guestDate = new Date(`${formData.get("date")}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  reservationStatus.textContent = `Thanks, ${guestName}! Your request for ${formData.get("partySize")} on ${guestDate} is ready. This demo doesn't send bookings to the restaurant.`;
  reservationForm.reset();
  setMinimumReservationDate();
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
renderMenu();