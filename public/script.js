// script.js
const apiUrl = 'http://localhost:8000/weather';

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?city=${location}`;

  console.log('Fetching weather data for URL:', url);

  locationElement.textContent = "Loading...";
  temperatureElement.textContent = "";
  descriptionElement.textContent = "";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.cod === 200) {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
      } else {
        locationElement.textContent = "City not found";
        temperatureElement.textContent = "";
        descriptionElement.textContent = "";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      locationElement.textContent = "Error fetching data";
      temperatureElement.textContent = "";
      descriptionElement.textContent = "";
    });
}


