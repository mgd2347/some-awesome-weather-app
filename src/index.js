function formatDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(response.data.main.temp); 
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);  
  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#visibility").innerHTML = response.data.visibility / 1000;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function getCity(city) {
  let apiKey = "6f57e84bdcf65c7e46537056925d0c97";
  let unit = `metric`;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  
  axios.get(apiUrl).then(displayWeather);  
}

function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-input").value;
  getCity(searchCity);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "6f57e84bdcf65c7e46537056925d0c97";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  
  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentTime = new Date();
document.querySelector("#date").innerHTML = formatDate(currentTime);

document.querySelector("#search-form").addEventListener("submit", searchCity);

getCity(`Lisbon`);

document.querySelector("#current-location").addEventListener("click", getLocation);
