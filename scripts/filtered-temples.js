const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005-08-07",
        area: 11500,
        imageUrl: "images/aba_nigeria.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888-05-21",
        area: 74792,
        imageUrl: "images/manti.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015-06-07",
        area: 96630,
        imageUrl: "images/payson.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2022-05-22",
        area: 6861,
        imageUrl: "images/yigo.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974-11-19",
        area: 156558,
        imageUrl: "images/washington.jpg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Peru",
        dedicated: "1986-01-10",
        area: 9600,
        imageUrl: "images/lima.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983-12-02",
        area: 116642,
        imageUrl: "images/mexico_city.jpg"
    },
    {
        templeName: "Santiago Chile",
        location: "Santiago, Chile",
        dedicated: "1983-09-15",
        area: 20831,
        imageUrl: "images/santiago.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978-10-30",
        area: 59246,
        imageUrl: "images/saopaulo.jpg"
    },
    {
        templeName: "Recife Brazil",
        location: "Recife, Brazil",
        dedicated: "2000-12-15",
        area: 37200,
        imageUrl: "images/recife.jpg"
    }
];

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function createTempleCards(templeArray) {
    const grid = document.getElementById("temple-grid");
    grid.innerHTML = "";

    templeArray.forEach((temple) => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} Temple`;
        img.loading = "lazy";

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = `
            <h3>${temple.templeName}</h3>
            <p>${temple.location}</p>
            <p>Dedicated: ${formatDate(temple.dedicated)}</p>
            <p>${temple.area.toLocaleString()} sq ft</p>
        `;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        grid.appendChild(figure);
    });
}

function applyFilter(filter) {
    let filteredTemples;

    switch (filter) {
        case "old":
            filteredTemples = temples.filter(
                (temple) => new Date(temple.dedicated).getFullYear() < 1900
            );
            break;
        case "new":
            filteredTemples = temples.filter(
                (temple) => new Date(temple.dedicated).getFullYear() > 2000
            );
            break;
        case "large":
            filteredTemples = temples.filter((temple) => temple.area > 90000);
            break;
        case "small":
            filteredTemples = temples.filter((temple) => temple.area < 10000);
            break;
        default:
            filteredTemples = temples;
    }

    createTempleCards(filteredTemples);
}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        applyFilter(button.dataset.filter);
    });
});

createTempleCards(temples);

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent =
    `Last Modification: ${document.lastModified}`;

const menuButton = document.getElementById("menu-button");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuButton.textContent = isOpen ? "✕" : "☰";
});