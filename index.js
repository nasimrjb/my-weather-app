let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  console.log(searchInputElement);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInputElement.value;
  let key = "ab343bcof0t2020acfeb0bf65d0c4516";
  let city = searchInputElement.value;
  let api = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
  axios.get(api).then(weather);
}

function weather(response) {
  // console.log(response);
  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector(".icon");
  iconElement.src = response.data.condition.icon_url;
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

let now = new Date();
let minutes = now.getMinutes();
let hours = now.getHours();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hours < 10) {
  hours = `0${hours}`;
}

let day = days[now.getDay()];
let dateTimeElement = document.querySelector("#dateTime");
dateTimeElement.innerHTML = `${day}, ${hours}:${minutes}`;
