const tours = [
  {
    id: `city-tour`,
    name: `Santiago City Tour`,
    category: `city`,
    duration: `About 4 hours`,
    season: `All year`,
    image: `images/city-tour.webp`,
    alt: `Historic buildings around the Plaza de Armas in downtown Santiago`,
    summary: `A walking tour through the historic center, starting at the San Francisco Church and passing the Plaza de Armas, La Moneda Palace, and the Central Market.`,
    includes: [`Walking guide in Portuguese`, `Stop for a traditional empanada`, `Tips for the rest of your stay`],
    featured: true
  },
  {
    id: `andes-panoramic`,
    name: `Andes Panoramic`,
    category: `mountain`,
    duration: `About 6 hours`,
    season: `All year`,
    image: `images/andes-panoramic.webp`,
    alt: `Winding mountain road with views of the Andes near Santiago`,
    summary: `A drive up the mountain road toward the ski resorts, with stops at the best viewpoints of the Andes and the Santiago valley.`,
    includes: [`Hotel pickup and return`, `Private transportation`, `Viewpoint stops for photos`],
    featured: true
  },
  {
    id: `portillo`,
    name: `Portillo and Laguna del Inca`,
    category: `mountain`,
    duration: `Full day`,
    season: `All year, snow from June to September`,
    image: `images/portillo.webp`,
    alt: `The turquoise Laguna del Inca surrounded by snowy mountains in Portillo`,
    summary: `A full day near the Argentine border to see the famous Laguna del Inca and the historic Portillo ski resort, crossing the Andes road and its hairpin curves.`,
    includes: [`Hotel pickup and return`, `Private transportation`, `Free time at Laguna del Inca`],
    featured: true
  },
  {
    id: `farellones`,
    name: `Farellones`,
    category: `mountain`,
    duration: `About 7 hours`,
    season: `Snow from June to September`,
    image: `images/farellones.webp`,
    alt: `Snow-covered slopes at the Farellones mountain village`,
    summary: `The closest snow to Santiago. Play in the snow, ride a sled, or try skiing in the mountain village of Farellones, about one hour from the city.`,
    includes: [`Hotel pickup and return`, `Private transportation`, `Help choosing rental equipment`],
    featured: false
  },
  {
    id: `isla-negra`,
    name: `Isla Negra, Algarrobo and Undurraga`,
    category: `coast`,
    duration: `Full day`,
    season: `All year`,
    image: `images/isla-negra.webp`,
    alt: `Pablo Neruda's house by the Pacific Ocean in Isla Negra`,
    summary: `A day on the central coast visiting the house of poet Pablo Neruda in Isla Negra, the beach town of Algarrobo, and a stop at the Undurraga winery.`,
    includes: [`Hotel pickup and return`, `Private transportation`, `Winery visit with tasting`],
    featured: false
  }
];

const categoryLabels = {
  city: `City`,
  mountain: `Mountains`,
  coast: `Coast and wine`
};

const storageKeys = {
  favorites: `divisor-favorites`,
  visitor: `divisor-visitor`,
  requests: `divisor-requests`
};

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.favorites)) || [];
  } catch {
    return [];
  }
}

function toggleFavorite(tourId) {
  const favorites = getFavorites();
  const updated = favorites.includes(tourId)
    ? favorites.filter((id) => id !== tourId)
    : [...favorites, tourId];
  localStorage.setItem(storageKeys.favorites, JSON.stringify(updated));
}

function buildTourCard(tour, favorites) {
  const isSaved = favorites.includes(tour.id);
  const includesList = tour.includes.map((item) => `<li>${item}</li>`).join(``);

  return `
    <article class="tour-card">
      <img src="${tour.image}" alt="${tour.alt}" width="600" height="400" loading="lazy">
      <div class="tour-body">
        <p class="tag">${categoryLabels[tour.category]}</p>
        <h3>${tour.name}</h3>
        <p>${tour.summary}</p>
        <p class="meta"><strong>Duration:</strong> ${tour.duration}<br><strong>Season:</strong> ${tour.season}</p>
        <ul class="includes">${includesList}</ul>
        <div class="card-actions">
          <a class="button" href="contact.html?tour=${tour.id}">Request a quote</a>
          <button type="button" class="save-button" data-id="${tour.id}" aria-pressed="${isSaved}">
            ${isSaved ? `&#9733; Saved` : `&#9734; Save`}
          </button>
        </div>
      </div>
    </article>`;
}

function renderTours(container, list) {
  const favorites = getFavorites();

  if (list.length === 0) {
    container.innerHTML = `<p class="empty">You have not saved any tours yet. Tap "Save" on a tour to keep it here.</p>`;
    return;
  }

  container.innerHTML = list.map((tour) => buildTourCard(tour, favorites)).join(``);
}

function filterTours(filter) {
  if (filter === `all`) {
    return tours;
  } else if (filter === `saved`) {
    const favorites = getFavorites();
    return tours.filter((tour) => favorites.includes(tour.id));
  }
  return tours.filter((tour) => tour.category === filter);
}

function setupMenu() {
  const menuButton = document.querySelector(`#menu-button`);
  const nav = document.querySelector(`#main-nav`);
  if (!menuButton || !nav) return;

  menuButton.addEventListener(`click`, () => {
    const isOpen = nav.classList.toggle(`open`);
    menuButton.setAttribute(`aria-expanded`, `${isOpen}`);
    menuButton.setAttribute(`aria-label`, isOpen ? `Close menu` : `Open menu`);
  });
}

function setupFooter() {
  const year = document.querySelector(`#current-year`);
  const modified = document.querySelector(`#last-modified`);
  if (year) year.textContent = `${new Date().getFullYear()}`;
  if (modified) modified.textContent = `Last modified: ${document.lastModified}`;
}

function setupHome() {
  const featured = document.querySelector(`#featured-tours`);
  const greeting = document.querySelector(`#greeting`);
  if (!featured) return;

  renderTours(featured, tours.filter((tour) => tour.featured));
  featured.addEventListener(`click`, (event) => handleSave(event, () => {
    renderTours(featured, tours.filter((tour) => tour.featured));
  }));

  const visitor = localStorage.getItem(storageKeys.visitor);
  if (visitor && greeting) {
    greeting.textContent = `Welcome back, ${visitor}!`;
  }
}

function setupToursPage() {
  const list = document.querySelector(`#tour-list`);
  const count = document.querySelector(`#tour-count`);
  const buttons = document.querySelectorAll(`.filter-button`);
  if (!list) return;

  let currentFilter = `all`;

  function update() {
    const result = filterTours(currentFilter);
    renderTours(list, result);
    count.textContent = `Showing ${result.length} ${result.length === 1 ? `tour` : `tours`}`;
  }

  buttons.forEach((button) => {
    button.addEventListener(`click`, () => {
      currentFilter = button.dataset.filter;
      buttons.forEach((b) => {
        b.classList.toggle(`active`, b === button);
        b.setAttribute(`aria-pressed`, `${b === button}`);
      });
      update();
    });
  });

  list.addEventListener(`click`, (event) => handleSave(event, update));
  update();
}

function handleSave(event, afterSave) {
  const saveButton = event.target.closest(`.save-button`);
  if (!saveButton) return;
  toggleFavorite(saveButton.dataset.id);
  afterSave();
}

function setupContact() {
  const select = document.querySelector(`#tour`);
  const nameInput = document.querySelector(`#full-name`);
  const dateInput = document.querySelector(`#tour-date`);
  if (!select) return;

  const options = tours.map((tour) => `<option value="${tour.id}">${tour.name}</option>`).join(``);
  select.insertAdjacentHTML(`beforeend`, options);

  const requestedTour = new URLSearchParams(window.location.search).get(`tour`);
  if (requestedTour && tours.some((tour) => tour.id === requestedTour)) {
    select.value = requestedTour;
  }

  const visitor = localStorage.getItem(storageKeys.visitor);
  if (visitor) {
    nameInput.value = visitor;
  }

  dateInput.min = `${new Date().toISOString().split(`T`)[0]}`;
}

function setupThanks() {
  const summary = document.querySelector(`#request-summary`);
  if (!summary) return;

  const params = new URLSearchParams(window.location.search);
  const name = params.get(`name`);
  const tour = tours.find((item) => item.id === params.get(`tour`));

  if (!name) {
    document.querySelector(`#thanks-title`).textContent = `No request found`;
    summary.previousElementSibling.textContent = `Please use the contact form to request a quote.`;
    return;
  }

  localStorage.setItem(storageKeys.visitor, `${name.split(` `)[0]}`);
  const total = Number(localStorage.getItem(storageKeys.requests) || 0) + 1;
  localStorage.setItem(storageKeys.requests, `${total}`);

  document.querySelector(`#thanks-title`).textContent = `Thank you, ${name.split(` `)[0]}!`;

  const rows = [
    { label: `Name`, value: name },
    { label: `Email`, value: params.get(`email`) },
    { label: `Tour`, value: tour ? tour.name : `Not selected` },
    { label: `Date`, value: params.get(`date`) },
    { label: `Travelers`, value: params.get(`travelers`) }
  ];

  rows.forEach((row) => {
    const term = document.createElement(`dt`);
    const detail = document.createElement(`dd`);
    term.textContent = `${row.label}`;
    detail.textContent = `${row.value || `Not informed`}`;
    summary.append(term, detail);
  });

  document.querySelector(`#request-count`).textContent =
    total === 1
      ? `This is your first quote request with us.`
      : `You have sent ${total} quote requests from this device.`;
}

setupMenu();
setupFooter();
setupHome();
setupToursPage();
setupContact();
setupThanks();
