function displayTemperature(response) {
  console.log(response.data.current.temp);
}

let apiKey = "5630ddfbed4d1b38c51e1715cf9e9557";

let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
