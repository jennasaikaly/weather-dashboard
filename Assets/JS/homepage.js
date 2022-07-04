
  var cityFormEl = document.querySelector("#city-form");
  var nameInputEl = document.querySelector("#city-name");

  var currentContainerEl = document.querySelector("#current-weather-container");
  var citySearchTerm = document.querySelector("#city-search-term");
  var currentTempEl = document.querySelector("#current-temp");
  var currentWindEl = document.querySelector("#current-wind");
  var currentHumidityEl = document.querySelector("#current-humidity");
  var currentUvEl = document.querySelector("#current-uv");


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
            displayWeather(data, cityname);
        });
    });
};

var displayWeather = function(data, cityname) {
// console.log(data);
    // clear old content

citySearchTerm.textContent = cityname;
const {temp, wind_speed, humidity, uvi} = data.current;


currentTempEl.textContent = "";
currentWindEl.textContent = "";
currentHumidityEl.textContent = "";
currentUvEl.textContent = "";

currentTempEl.textContent = "Temp: " +temp + "°C";
currentWindEl.textContent = "Wind: " + wind_speed + " meters/sec";
currentHumidityEl.textContent = "Humidity: " + humidity + "%";
currentUvEl.textContent = "UV Index: " + uvi;

 


};


  cityFormEl.addEventListener("submit", formSubmitHandler);