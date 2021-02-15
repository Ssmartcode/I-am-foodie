"use strict";
// dom elements
const recipes = document.querySelector(".recipes");
const userInput = document.querySelector(".user-input");
const searchButton = document.querySelector(".search-btn");
const recipeAbout = document.querySelector(".recipe-about");
let recipesList;
let recipeAboutInner;

// cut text after certain size
const textSize = (text, size) => {
  const cutText = text.slice(0, size);
  return text.length > size ? cutText + "..." : cutText;
};

// render list of recipes
const renderList = (recipe) => {
  recipes.append(recipesList);
  const recipeElement = ` <li class="recipe-item" data-id="${recipe.id}
  ">
  <img src="${recipe.image_url}" alt="" />
  <h2 class="recipe-title">${textSize(recipe.title, 25)}</h2>
  <small class="recipe-desc"></small>
</li>`;
  recipesList.insertAdjacentHTML("beforeend", recipeElement);
};

// render selected recipe and display in recipe-about section
const renderRecipeAbout = (recipe) => {
  const recipeAboutElement = `
  <img class="recipe-image" src="${recipe.image_url}" alt="" />
  <div class="recipe-about__inner">
    <h1 class="title">
      ${recipe.title} <span class="author">by ${recipe.publisher}</span>
    </h1>
    <p class="time">
      <i class="far fa-clock"></i><strong>${recipe.cooking_time}</strong> min
    </p>
    <p class="servings">
      <i class="fas fa-users"></i><strong>${recipe.servings}</strong> servings
      <span class="plus">+</span> <span class="minus">-</span>
    </p>
    <i class="far fa-heart fa-2x recipe-bookmark"></i>
  </div>
  <div class="recipe-ingridients"></div>
</div>
  `;
  recipeAboutInner.insertAdjacentHTML("beforeend", recipeAboutElement);
};

// get recipes from api and render them
const getRecipes = async (input) => {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${input}`
  );
  const data = await res.json();
  const { recipes } = data.data;
  recipes.forEach((element) => {
    renderList(element);
  });
};

// get the selected recipe from the list and render it
const getRecipe = async (recipeID) => {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}`
  );
  const data = await res.json();
  const { recipe } = data.data;
  renderRecipeAbout(recipe);
};

// event listeners
searchButton.addEventListener("click", (e) => {
  // if there is already a rendered list -- delete it
  if (recipesList) recipesList.remove();
  // create a list
  recipesList = document.createElement("ul");
  recipesList.classList.add("recipes-list");
  // get data from api and render all recipes on list
  getRecipes(userInput.value);
});
recipes.addEventListener("click", (e) => {
  // if there is already a recipe rendered on recipe-info panel -- delete it
  if (recipeAboutInner) recipeAboutInner.remove();

  // create elements
  const selectedRecipe = e.target.closest(".recipe-item");
  recipeAboutInner = document.createElement("div");
  recipeAboutInner.classList.add("recipe-about__inner");
  recipeAbout.append(recipeAboutInner);
  // get data from api and render the recipe about
  getRecipe(selectedRecipe.dataset.id);
});
// getRecipes();
