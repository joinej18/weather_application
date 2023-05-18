const API_KEY = "ef03938d442313864e1546ca06c01450";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBTN = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(API_URL + city + `&appid=${API_KEY}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    const farenheit = data.main.temp * 1.8 + 32.0;

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(farenheit) + " °F";

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      document.querySelector(".condition").textContent = "Cloudy";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      document.querySelector(".condition").textContent = "Clear";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      document.querySelector(".condition").textContent = "Drizzling";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/Mist.png";
      document.querySelector(".condition").textContent = "Misty";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      document.querySelector(".condition").textContent = "Rain";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
      document.querySelector(".condition").textContent = "Snow";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBTN.addEventListener("click", function () {
  checkWeather(searchBox.value);
  searchBox.value = "";
});
