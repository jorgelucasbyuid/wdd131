let reviewCount = localStorage.getItem("reviewCount");

reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;

localStorage.setItem("reviewCount", reviewCount);

document.getElementById("review-count").textContent = reviewCount;

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent =
    `Last Modification: ${document.lastModified}`;