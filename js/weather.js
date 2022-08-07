let curentDayDate = document.querySelector("#curentDate");
let now = new Date();
function formatDate(timestamp) {
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
let cityInputElement = document.querySelector("#city-input");
curentDayDate.innerHTML = formatDate(now);

function forecastFuture() {
  let forecastElement = document.querySelector("#forecast-future");
  let forecastHtml = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
        <div class="col-2">
          <div class="weather-forecast-date">
            ${day}
          </div>
          <div class="weather-forecast-img">
            ⛈
          </div>
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">
              20°
            </span>
            <span class="weather-forecast-temperature-min">
              15°
            </span>
          </div>
      </div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForcast(coordinates) {
  let apiKey = "f15f7f39f58340ebc21e37f8c9db4b70";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#curentCity");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForcast(response.data.coord);
}

function search(city) {
  let apiKey = "f15f7f39f58340ebc21e37f8c9db4b70";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  if (cityInputElement.value) {
    search(cityInputElement.value);
  }
}
function showFavorite() {
  let favoritElement = document.querySelector("#favorite-сity");
  let favorittHtml = `<div class ="row city">`;
  let favoriteCitys = ["Lisbon", "Paris", "Sydney", "San Francisco"];

  favoriteCitys.forEach(function (city) {
    favorittHtml += `<div class="col-sm"><a class="favorite" href="#">${city}</a></div>`;
  });

  favorittHtml = favorittHtml + "</div>";

  favoritElement.innerHTML = favorittHtml;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function retrievePosition(position) {
  let apiKey = "f15f7f39f58340ebc21e37f8c9db4b70";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

var myCity = document.querySelector("#cityCurrent");
myCity.addEventListener("click", getCurrentLocation);

search("Kyiv");
forecastFuture();
showFavorite();

let selectedCity = document.getElementById("favorite-сity");

selectedCity.addEventListener("click", function ($event) {
  if ($event.target && $event.target.matches("a.favorite")) {
    cityInputElement.value = $event.target.innerText;
    search($event.target.innerText);
  }
});
