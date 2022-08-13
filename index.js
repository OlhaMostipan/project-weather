let apiKey = "361cdf95371294414c2f6523bf4e6b9b";
function showTemperature(response) {
  let temperatureContainer = document.querySelector(".temperature");

  let feelingTemperature = Math.round(response.data.main.feels_like);
  let feelingTemperatureContainer = document.querySelector(
    ".temperature-feeling"
  );

  let humidity = response.data.main.humidity;
  let humidityContainer = document.querySelector(".humidity");

  let wind = response.data.wind.speed;
  let windContainer = document.querySelector(".wind");

  let weatherDescription = response.data.weather[0].main;
  let weatherDescriptionContainer =
    document.querySelector(".emoji-description");

  let city = response.data.name;
  let cityContainer = document.querySelector(".city");

  let weatherEmoji = document.querySelector(".main-emoji");

  celsiusTemperature = Math.round(response.data.main.temp);

  temperatureContainer.innerHTML = celsiusTemperature;
  feelingTemperatureContainer.innerHTML = `Feels like ${feelingTemperature}°C`;
  humidityContainer.innerHTML = `Humidity: ${humidity}%`;
  windContainer.innerHTML = `Wind: ${wind}km/h`;
  weatherDescriptionContainer.innerHTML = weatherDescription;
  cityContainer.innerHTML = city;
  weatherEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  if (searchInput.value.length) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  } else {
    alert("Please enter the city!");
  }
}

function initialSearch() {
  let initialCity = "Kyiv";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${initialCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentDate = new Date();
let time = document.querySelector(".time");
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
time.innerHTML = `${day} ${hours}:${minutes}`;

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}
function changeToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
let celsiusTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeToFahrenheit);

initialSearch();
