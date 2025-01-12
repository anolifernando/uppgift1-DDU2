const titleHead = document.querySelector("title");
const cityTitle = document.querySelector("h2");
const cityUndertitle = document.querySelector("h3");
const cityBoxes = document.querySelector("#cities");
const distanceTable = document.querySelector("#table");
const theClosestCity = document.querySelector("#closest");
const theFurthestCity = document.querySelector("#furthest");

let enterCity = prompt("Vilken stad?");
let cityWasFound = false;
let closestCityFound = null;
let furthestCityFound = null;
let minDistance = 3000;
let maxDistance = 0;

function createAllCityBoxes() {
  for (let i = 0; i < cities.length; i++) {
      let cityBox = document.createElement("p");
      cityBox.classList.add("cityBox");
      cityBox.textContent = cities[i].name;
      cityBoxes.appendChild(cityBox);