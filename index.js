let apiKey = "361cdf95371294414c2f6523bf4e6b9b";
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureContainer = document.querySelector(".temperature");
  temperatureContainer.innerHTML = temperature;

  let feelingTemperature = Math.round(response.data.main.feels_like);
  let feelingTemperatureContainer = document.querySelector(
    ".temperature-feeling"
  );
  feelingTemperatureContainer.innerHTML = `Feels like ${feelingTemperature}°C`;

  let humidity = response.data.main.humidity;
  let humidityContainer = document.querySelector(".humidity");
  humidityContainer.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  let windContainer = document.querySelector(".wind");
  windContainer.innerHTML = `Wind: ${wind}km/h`;

  let weatherDescription = response.data.weather[0].main;
  let weatherDescriptionContainer =
    document.querySelector(".emoji-description");
  weatherDescriptionContainer.innerHTML = weatherDescription;

  let city = response.data.name;
  let cityContainer = document.querySelector(".city");
  cityContainer.innerHTML = city;
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
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showPosition(position) {
  let lon = Math.round(position.coords.longitude);
  let lat = Math.round(position.coords.latitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector(".location-button");
currentButton.addEventListener("click", getCurrentPosition);

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
