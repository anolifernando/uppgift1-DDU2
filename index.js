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

    if (enterCity == cities[i].name) {
      cityBox.classList.add("target");
    }

    if (closestCityFound == cities[i].name) {
      cityBox.textContent = `${closestCityFound} ligger ${
        minDistance / 10
      } mil bort`;
      cityBox.classList.add("closest");
    }

    if (furthestCityFound == cities[i].name) {
      cityBox.textContent = `${furthestCityFound} ligger ${
        maxDistance / 10
      } mil bort`;
      cityBox.classList.add("furthest");
    }
  }
}

function getClosestCity(targetCityObject) {
  for (let i = 0; i < cities.length; i++) {
    if (targetCityObject == cities[i].name) {
      let targetId = i;
      for (let j = 0; j < distances.length; j++) {
        let city1 = distances[j].city1;
        let city2 = distances[j].city2;
        let distance = distances[j].distance;

        if (city1 === targetId || city2 === targetId) {
          let otherCityId;
          if (city1 === targetId) {
            otherCityId = city2;
          } else {
            otherCityId = city1;
          }

          if (distance < minDistance) {
            minDistance = distance;

            for (let k = 0; k < cities.length; k++) {
              if (cities[k].id === otherCityId) {
                closestCityFound = cities[k].name;
              }
            }
          }
        }
      }
    }
  }

  if (closestCityFound != null) {
    theClosestCity.textContent = closestCityFound;
    theClosestCity.classList.add("closest");
  }

  return closestCityFound;
}

function getFurthestCity(targetCityObject) {
  for (let i = 0; i < cities.length; i++) {
    if (targetCityObject == cities[i].name) {
      let targetId = i;
      for (let j = 0; j < distances.length; j++) {
        let city1 = distances[j].city1;
        let city2 = distances[j].city2;
        let distance = distances[j].distance;

        if (city1 === targetId || city2 === targetId) {
          let otherCityId;
          if (city1 === targetId) {
            otherCityId = city2;
          } else {
            otherCityId = city1;
          }

          if (distance > maxDistance) {
            maxDistance = distance;

            for (let i = 0; i < cities.length; i++) {
              if (cities[i].id === otherCityId) {
                furthestCityFound = cities[i].name;
              }
            }
          }
        }
      }
    }
  }

  if (furthestCityFound != null) {
    theFurthestCity.textContent = furthestCityFound;
    theFurthestCity.classList.add("furthest");
  }

  return furthestCityFound;
}

getClosestCity(enterCity);
getFurthestCity(enterCity);
createAllCityBoxes();

for (let keyCity in cities) {
  if (enterCity == cities[keyCity].name) {
    cityWasFound = true;
    cityTitle.innerHTML = `${enterCity} (${cities[keyCity].country})`;
    titleHead.innerHTML = enterCity;
    break;
  }
}
if (cityWasFound == false) {
  cityTitle.innerHTML = `${enterCity} finns inte i databasen`;
  cityUndertitle.innerHTML = " ";
  titleHead.innerHTML = "Not found";
}

for (let row = 0; row <= cities.length; row++) {
  for (let column = 0; column <= cities.length; column++) {
    let gridCell = document.createElement("div");
    gridCell.classList.add("cell");
    distanceTable.appendChild(gridCell);

    if (row >= 1 && column >= 1) {
      for (let distanceKey in distances) {
        if (
          distances[distanceKey].city1 == column - 1 &&
          distances[distanceKey].city2 == row - 1
        ) {
          gridCell.textContent = distances[distanceKey].distance / 10;
        }
        if (
          distances[distanceKey].city2 == column - 1 &&
          distances[distanceKey].city1 == row - 1
        ) {
          gridCell.textContent = distances[distanceKey].distance / 10;
        }
      }
    }

    if (row == 0) {
      gridCell.classList.add("head_row");
      gridCell.textContent = column - 1;
    }
    if (column == 0 && row >= 1) {
      gridCell.classList.add("head_column");
      gridCell.textContent = cities[row - 1].id + " - " + cities[row - 1].name;
    }

    if (row == column) {
      gridCell.textContent = " ";
    }

    if (row % 2 == 1) {
      gridCell.classList.add("even_row");
    }

    if (column % 2 == 1 && row != 0) {
      gridCell.classList.add("even_col");
    }
  }
}
