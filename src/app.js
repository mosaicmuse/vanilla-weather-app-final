function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionsElement = document.querySelector("#conditions");
  temperatureElement.innerHTML = Math.round(response.data.current.temp);
  cityElement.innerHTML = response.data.timezone;
  conditionsElement.innerHTML = response.data.current.weather[0].description;
}

let apiKey = "5630ddfbed4d1b38c51e1715cf9e9557";

let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
