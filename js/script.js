"use strict";

const hamburgerBtn = document.getElementById("hamburger-btn");
const nav = document.querySelector(".navigation");
const menuIcon = hamburgerBtn.querySelector(".menu-icon");
const closeIconInside = document.querySelector(".close-icon");
const navLinks = document.querySelectorAll(".navigation-links");

// Open menu
hamburgerBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburgerBtn.style.display = "none"; // hide menu icon when menu is open
});

// Close menu via inside cross
closeIconInside.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburgerBtn.style.display = "block";
});

// Also close when a nav link is clicked
// navLinks.forEach((link) =>
//   link.addEventListener("click", () => {
//     nav.classList.remove("active");
//     hamburgerBtn.style.display = "block";
//   })
// );
fetch(
  "https://api.spoonacular.com/recipes/716429/information?apiKey=05ce53e37b9d4a9db78c3c404f703825"
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
