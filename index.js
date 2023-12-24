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

  getForecast(response.data.city);
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

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row"><div class="col-1">
                <span class="weather-forecast-date">${formatDay(
                  day.time
                )}</span> <br>
                <img src="${day.condition.icon_url}" width="50" />
                <div class="weather-forecast-temperature"><span class="max-temp">${Math.round(
                  day.temperature.maximum
                )}º</span> <span class="min-temp">${Math.round(
          day.temperature.minimum
        )}º</span></div>
            </div>
        </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHTML;
}
function getForecast(city) {
  let apiKey = "ab343bcof0t2020acfeb0bf65d0c4516";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
