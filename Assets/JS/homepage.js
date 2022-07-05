
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city-name");

var currentWeatherContainerEl = document.querySelector("#current-weather-container");
var citySearchTerm = document.querySelector("#city-search-term");

var dailyWeatherContainerEl = document.querySelector("#daily-weather-container");


var formSubmitHandler = function (event) {
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

var getCity = function (city) {
    fetch
        ("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=ffaf5b955f9d8df5264787907b066904")
        .then(function (response) {
            response.json().then(function (data) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                getWeather(lat, lon);
            });
        });
};

var getWeather = function (lat, lon) {

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=metric&appid=ffaf5b955f9d8df5264787907b066904")
        .then(function (response,) {
            response.json().then(function (data) {
                var cityname = nameInputEl.value.trim();
                displayCurrentWeather(data, cityname);
                displayForecast(data, cityname);
            });
        });
};

var displayCurrentWeather = function (data, cityname) {

    // clear old content
    // currentDateEl.textContent = "";
    // currentIconEl.textContent = "";
    // currentTempEl.textContent = "";
    // currentWindEl.textContent = "";
    // currentHumidityEl.textContent = "";
    // currentUvEl.textContent = "";

    // console.log(data);


    const icon = data.current.weather[0].icon;
    const { dt, temp, wind_speed, humidity, uvi } = data.current;

    
currentWeatherContainerEl.classList.add("card");
    var currentEl = document.createElement("div");
    // currentEl.classList.add("card");

    var currentCardHeader = document.createElement("div")
    currentCardHeader.className = ("card-header col-sm-12");
    var citySearchTerm = document.createElement("span")
    citySearchTerm.textContent = cityname;
    var currentDateEl = document.createElement("span");
    currentDateEl.textContent = dt;
    var currentIconContainerEl = document.createElement("span");
    var currentIconEl = document.createElement("img");
    currentIconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    var currentCardBody = document.createElement("div");
    currentCardBody.className = ("card-body")
    var currentWeatherNameEl = document.createElement("ul");
    currentWeatherNameEl.className = "list-unstyled flex-row";
    var currentTempEl = document.createElement("li");
    currentTempEl.textContent = "Temp: " + temp + " °C";
    var currentWindEl = document.createElement("li");
    currentWindEl.textContent = "Wind: " + wind_speed + " meters/sec";
    var currentHumidityEl = document.createElement("li");
    currentHumidityEl.textContent = "Humidity: " + humidity + "%";
    var currentUvEl = document.createElement("li");
    currentUvEl.textContent = "UV Index: ";
    var currentUvColorEl = document.createElement("span");
    currentUvColorEl.textContent = uvi;
    currentUvColorEl.style.backgroundColor = "red";


    currentCardBody.appendChild(currentWeatherNameEl);
    currentWeatherNameEl.appendChild(currentTempEl);
    currentWeatherNameEl.appendChild(currentWindEl);
    currentWeatherNameEl.appendChild(currentHumidityEl);
    currentWeatherNameEl.appendChild(currentUvEl);
    currentUvEl.appendChild(currentUvColorEl);

    currentCardHeader.appendChild(citySearchTerm);
    currentCardHeader.appendChild(currentDateEl);
    currentIconContainerEl.appendChild(currentIconEl);
    currentCardHeader.appendChild(currentIconContainerEl);

    currentEl.appendChild(currentCardHeader);
    currentEl.appendChild(currentCardBody);
    currentWeatherContainerEl.appendChild(currentEl);


};

var displayForecast = function (data) {

    // loop over forecasts
    for (var i = 0; i < 5; i++) {
        // format repo name
        var dailyDate = data.daily[i].dt;
        var dailyIcon = data.daily[i].weather[0].icon
        var dailyTemp = data.daily[i].temp.day;
        var dailyWind = data.daily[i].wind_speed;
        var dailyHumidity = data.daily[i].humidity;

        dailyWeatherContainerEl.classList.add("card");
        // create a container for each daily forecast
        var dailyEl = document.createElement("div");
        dailyEl.className = ("card");

        var dailyWeatherListEl = document.createElement("ul");
        dailyWeatherListEl.className = "list-unstyled flex-row";

        // create an element to hold each Date Title
        var titleEl = document.createElement("li");
        titleEl.textContent = dailyDate;

        var dailyIconContainerEl = document.createElement("li");

        var dailyIconEl = document.createElement("img");
        dailyIconEl.src = "http://openweathermap.org/img/wn/" + dailyIcon + "@2x.png";

        var dailyTempEl = document.createElement("li");
        dailyTempEl.textContent = "Temp: " + dailyTemp + " °C";

        var dailyWindEl = document.createElement("li");
        dailyWindEl.textContent = "Wind: " + dailyWind + "meters/sec";

        var dailyHumidityEl = document.createElement("li");
        dailyHumidityEl.textContent = "Humidity: " + dailyHumidity + "%";

        // append to container
        dailyIconContainerEl.appendChild(dailyIconEl);
        dailyWeatherListEl.appendChild(titleEl);
        dailyWeatherListEl.appendChild(dailyIconContainerEl);
        dailyWeatherListEl.appendChild(dailyTempEl);
        dailyWeatherListEl.appendChild(dailyWindEl);
        dailyWeatherListEl.appendChild(dailyHumidityEl);

        dailyEl.appendChild(dailyWeatherListEl);
        // append container to the dom
        dailyWeatherContainerEl.appendChild(dailyEl);
    }

};

cityFormEl = addEventListener("submit", formSubmitHandler);