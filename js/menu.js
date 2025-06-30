const menuWrapper = document.getElementById("menu-container");
const loadMoreButton = document.getElementById("loadMoreBtn");

const spoonacularApiKey = "05ce53e37b9d4a9db78c3c404f703825";
const spoonacularEndpoint = `https://api.spoonacular.com/recipes/random?apiKey=${spoonacularApiKey}&number=12`;

let allMenuCards = [];
let cardsDisplayed = 0;
const cardsPerClick = 6;

function buildMenuCard(recipe) {
  const card = document.createElement("div");
  card.className = "foods";

  const foodImage = document.createElement("img");
  foodImage.src = recipe.image;
  foodImage.alt = recipe.title;
  foodImage.className = "img";

  const foodTitle = document.createElement("h3");
  foodTitle.textContent = recipe.title;

  const foodDescription = document.createElement("p");
  foodDescription.textContent = recipe.summary
    ? recipe.summary.replace(/<[^>]*>/g, "").slice(0, 100) + "..."
    : "No description available.";

  const foodPrice = document.createElement("p");
  foodPrice.className = "food-price";
  foodPrice.textContent = "$" + (Math.random() * 20 + 3).toFixed(2); // Fake price

  card.appendChild(foodImage);
  card.appendChild(foodTitle);
  card.appendChild(foodDescription);
  card.appendChild(foodPrice);

  return card;
}

function showMenuCards() {
  const cardBatch = document.createDocumentFragment();
  const nextCount = Math.min(
    cardsDisplayed + cardsPerClick,
    allMenuCards.length
  );

  for (let i = cardsDisplayed; i < nextCount; i++) {
    cardBatch.appendChild(allMenuCards[i]);
  }

  menuWrapper.appendChild(cardBatch);
  cardsDisplayed = nextCount;

  if (cardsDisplayed >= allMenuCards.length) {
    loadMoreButton.style.display = "none";
  }
}

function fetchFoodImages() {
  axios
    .get(spoonacularEndpoint)
    .then((response) => {
      const recipes = response.data.recipes;
      allMenuCards = recipes.map((recipe) => buildMenuCard(recipe));
      showMenuCards();
    })
    .catch((error) => {
      console.error("Failed to fetch menu items:", error);
      menuWrapper.innerHTML =
        "<p>Error loading menu items. Please try again later.</p>";
    });
}

fetchFoodImages();
loadMoreButton.addEventListener("click", showMenuCards);
