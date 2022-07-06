let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
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
let day = days[now.getDay()];
document.getElementById("current-time").innerHTML =
  day + "      " + hours + ":" + minutes;
//SHOWS DATE..WORKS

function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let city = document.querySelector("#chosen-city");
  city.innerHTML = citySearch.value;
  let apiKey = "6c5621af472ccc1d447bcf74c7a52dd4";
  let cityName = `${citySearch.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
let button = document.querySelector("#special-button");
button.addEventListener("click", showCity);

////works

function showTemperature(response) {
  console.log(response);
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#chosen-city");
  city.innerHTML = response.data.name;
}

function retrievePosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "6c5621af472ccc1d447bcf74c7a52dd4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentCity);
