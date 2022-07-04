
  var cityFormEl = document.querySelector("#city-form");
  var nameInputEl = document.querySelector("#city-name");

  var currentContainerEl = document.querySelector("#current-weather-container");
  var citySearchTerm = document.querySelector("#city-search-term");
  var currentDateEl = document.querySelector("#current-date")
  var currentIconEl = document.querySelector("#current-icon");
  var currentTempEl = document.querySelector("#current-temp");
  var currentWindEl = document.querySelector("#current-wind");
  var currentHumidityEl = document.querySelector("#current-humidity");
  var currentUvEl = document.querySelector("#current-uv");

  var dailyWeatherContainerEl = document.querySelector("#daily-weather-container");


  var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
var cityname = nameInputEl.value.trim();

if (cityname) {
  getCity(cityname);
//   nameInputEl.value = "";
} else {
  alert("Please enter a City name");
}
  };

var getCity= function(city) {
    fetch
    ("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=ffaf5b955f9d8df5264787907b066904")
    .then(function (response) {
        // console.log(response);
        response.json().then(function (data) {
            // console.log(data);
            const lat = data[0].lat;
            const lon = data[0].lon;
            getWeather(lat,lon);
        });
    });
    
  };

var getWeather = function (lat,lon) {
    
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=metric&appid=ffaf5b955f9d8df5264787907b066904")   
    .then(function (response,) {
        
        response.json().then(function (data) {
            console.log(data);
            var cityname = nameInputEl.value.trim();
            displayCurrentWeather(data, cityname);
            displayForecast(data, cityname);
        });
    });
};

var displayCurrentWeather = function(data, cityname) {

// clear old content
currentDateEl.textContent = "";
currentIconEl.textContent = "";
currentTempEl.textContent = "";
currentWindEl.textContent = "";
currentHumidityEl.textContent = "";
currentUvEl.textContent = "";

console.log(data);



const icon = data.current.weather[0].icon ;
const {dt, temp, wind_speed, humidity, uvi} = data.current;

citySearchTerm.textContent = cityname;
currentDateEl.textContent = dt;
currentIconEl.src = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
currentTempEl.textContent = "Temp: " +temp + " °C";
currentWindEl.textContent = "Wind: " + wind_speed + " meters/sec";
currentHumidityEl.textContent = "Humidity: " + humidity + "%";

currentUvEl.textContent = "UV Index: " + uvi;
currentUvEl.style.backgroundColor = "red";
 


};

var displayForecast = function(data, cityname){
    
    // loop over forecasts
for (var i = 0; i < 5; i++) {
    // format repo name
    var dailyDate = data.daily[i].dt;
    var dailyIcon = data.daily[i].weather[0].icon
    var dailyTemp = data.daily[i].temp.day;
    var dailyWind = data.daily[i].wind_speed;
    var dailyHumidity = data.daily[i].humidity;
  
    // create a container for each daily forecast
    var dailyEl = document.createElement("div");
    dailyEl.classList = "list-item flex-row justify-space-between align-center";
  
    // create a span element to hold each Date Title
    var titleEl = document.createElement("span");
    titleEl.textContent = dailyDate;

    var dailyIconEl = document.createElement("img");
    dailyIconEl.src = "http://openweathermap.org/img/wn/"+ dailyIcon +"@2x.png";

    var dailyTempEl = document.createElement("span");
    dailyTempEl.textContent = "Temp: " + dailyTemp + " °C";

    var dailyWindEl = document.createElement("span");
    dailyWindEl.textContent = "Wind: " +dailyWind + "meters/sec";

    var dailyHumidityEl = document.createElement("span");
    dailyHumidityEl.textContent = "Humidity: " + dailyHumidity + "%";
  
    // append to container
    dailyEl.appendChild(titleEl);
    dailyEl.appendChild(dailyIconEl);
    dailyEl.appendChild(dailyTempEl);
    dailyEl.appendChild(dailyWindEl);
    dailyEl.appendChild(dailyHumidityEl);
  
    // append container to the dom
    dailyWeatherContainerEl.appendChild(dailyEl);
  }

};

  cityFormEl.addEventListener("submit", formSubmitHandler);