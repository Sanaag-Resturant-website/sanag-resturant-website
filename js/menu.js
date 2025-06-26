const menuWrapper = document.getElementById("menu-container");
const loadMoreButton = document.getElementById("loadMoreBtn");
const foodApiEndpoint = "https://foodish-api.com/api/";

const somaliFoods = [
  { name: "pizza", description: "Pizza Pezzaria", price: "$12.99" },
  {
    name: "Canjeero",
    description: "Canjeero macaan oo subag leh",
    price: "$4.00",
  },
  {
    name: "Sambuus",
    description: "Sambuus la shiilay oo hilib leh",
    price: "$3.50",
  },
  { name: "Baasto", description: "Baasto Somali leh suugo", price: "$10.00" },
  { name: "Muufo", description: "Muufo  maraq hilib leh", price: "$7.00" },
  {
    name: "Sabayad",
    description: "Rooti Somali subag iyo malab leh",
    price: "$5.00",
  },
  {
    name: "Buskud",
    description: "Buskud guriga lagu sameeyey",
    price: "$3.00",
  },
  {
    name: "Shaah Somali",
    description: "Shaah Somali oo heyl lehleh",
    price: "$2.00",
  },
  {
    name: "Hilib Ari",
    description: "Hilib ari la dubay oo basbaas leh",
    price: "$15.00",
  },
  {
    name: "Kaluun Duban",
    description: "Kaluun duban oo leh liin iyo basbaas",
    price: "$13.00",
  },
  {
    name: "Suqaar",
    description: "Hilb suqaar la shiilay iyo rooti",
    price: "$9.00",
  },
  { name: "Malawax", description: "Malawax subag leh", price: "$4.50" },
];

let allMenuCards = [];
let cardsDisplayed = 0;
const cardsPerClick = 6;

function buildMenuCard(imageUrl, index) {
  const card = document.createElement("div");
  card.className = "foods";

  const food = somaliFoods[index % somaliFoods.length];

  const foodImage = document.createElement("img");
  foodImage.src = imageUrl;
  foodImage.alt = food.name;
  foodImage.className = "img";

  const foodTitle = document.createElement("h3");
  foodTitle.textContent = food.name;

  const foodDescription = document.createElement("p");
  foodDescription.textContent = food.description;

  const foodPrice = document.createElement("p");
  foodPrice.className = "food-price";
  foodPrice.textContent = food.price;

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

function fetchFoodImages(totalCount = somaliFoods.length) {
  const apiCalls = Array.from({ length: totalCount }, () =>
    axios.get(foodApiEndpoint)
  );

  Promise.all(apiCalls)
    .then((responses) => {
      allMenuCards = responses.map((res, idx) =>
        buildMenuCard(res.data.image, idx)
      );
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
