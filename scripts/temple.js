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