function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              ${day}<br /><img
                id="icon-2"
                src="https://openweathermap.org/img/wn/01d@2x.png"
              />
              <div class="forecast-temp">
                <span class="high">30°</span> <span class="low">30°</span>
              </div>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionsElement = document.querySelector("#conditions");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  fTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(fTemp);
  cityElement.innerHTML = response.data.name;
  conditionsElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fDegLink.classList.remove("active");
  cDegLink.classList.add("active");
  let cTemp = ((fTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(cTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  cDegLink.classList.remove("active");
  fDegLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fTemp);
}

let fTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let cDegLink = document.querySelector("#c-deg-link");
cDegLink.addEventListener("click", showCelsius);

let fDegLink = document.querySelector("#f-deg-link");
fDegLink.addEventListener("click", showFahrenheit);

search("Seattle");
