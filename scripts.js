// Get Elements
let input = document.getElementById("input");
let button = document.getElementById("button");
let result = document.querySelector(".result");

// Get Data Function
function getData() {
  let countryName = input.value.trim();
  if (countryName) {
    // Set The URL
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    // Fetch Data from API
    fetch(finalURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let currencyKey = Object.keys(data[0].currencies)[0];
        let currencyName = data[0].currencies[currencyKey].name;

        let language = Object.values(data[0].languages)
          .toString()
          .split(",")
          .join(", ");

        result.innerHTML = `
          <img src="${data[0].flags.svg}" alt="${data[0].flags.alt}">
          <h2 id="country-name">${data[0].name.common}</h2>
          <h4>Capital: <span id="capital">${data[0].capital[0]}</span></h4>
          <h4>Continent: <span id="continent">${
            data[0].continents[0]
          }</span></h4>
          <h4>Population: <span id="population">${data[0].population.toLocaleString()}</span></h4>
          <h4>Currency: <span id="currency">${currencyName} - ${currencyKey}</span></h4>
          <h4>Common Language: <span id="language">${language}</span></h4>
        `;
      })
      .catch((error) => {
        result.innerHTML = `<h3 class="msg">Please enter a valid country name</h3>`;
        console.error(error);
      });
  } else {
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
  }
}

// Events
button.addEventListener("click", getData);
window.addEventListener("load", getData);
// Add event listener for Enter key
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getData();
  }
});
