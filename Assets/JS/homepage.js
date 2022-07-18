//require moment.js
// const moment = require('moment'); //require
// cityArray = [];
//declare variables
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city-name");

//defines weatherContainer so that it can be unhidden
var weatherContainer = document.querySelector('#weather-container');

var currentCityEl = document.querySelector('#current-city');
var currentDateEl = document.querySelector('#current-date');
var currentIconEl = document.querySelector('#current-icon');
var currentTempEl = document.querySelector('#current-temp');
var currentWindEl = document.querySelector('#current-wind');
var currentHumidityEl = document.querySelector('#current-humidity');
var currentUvEl = document.querySelector('#current-uvi');
var currentUvColorEl = document.querySelector('#current-uvi-color')

var cityButtonsEl = document.querySelector('#city-buttons');
// var forecastDateEl = document.querySelector('#forecast-date');
// var forecastIconEl = document.querySelector('#forecast-icon');
// var forecastTempEl = document.querySelector('#forecast-temp');
// var forecastWindEl = document.querySelector('#forecast-wind');
// var forecastHumidityEl = document.querySelector('#forecast-humidity');

//NEED?
// var currentWeatherContainerEl = document.querySelector("#current-weather-container");
// var citySearchTerm = document.querySelector("#city-search-term");

var dailyWeatherContainerEl = document.querySelector("#daily-weather-container");

var loadSearch = function () {
    // debugger;
    cityArray = JSON.parse(localStorage.getItem('city'));
    // console.log(cityArray);
    
    // console.log(cityArray[i].name);
    // console.log(cityArray.length)
if (cityArray) {
        for (let i = 0; i < cityArray.length; i++) {
            const { name, lat, lon } = cityArray[i];
        var citybutton = document.createElement('button')
        citybutton.textContent = name;
        citybutton.type = ('submit');
        citybutton.className = ('city-button');
        citybutton.dataset.name = name;
        citybutton.dataset.lat = lat;
        citybutton.dataset.lon = lon;
        cityButtonsEl.appendChild(citybutton);
    };
} else {
    cityButtonsEl.display = ('none');
    return;
}
}


var formSubmitHandler = function (event) {
    event.preventDefault();
    weatherContainer.style = "contents"
    // get value from input element
    var cityname = nameInputEl.value.trim();
    // console.log(cityname);
    if (cityname) {
        getCity(cityname);
        //   nameInputEl.value = "";
    } else {
        alert("Please enter a City name");
    }
};

var getCity = function (city) {
    // debugger;
    fetch
        ("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=ffaf5b955f9d8df5264787907b066904")
        .then(function (response) {

            response.json().then(function (data) {
                // console.log(data);

                // console.log(cityname);
                // const lat = data[0].lat;
                // const lon = data[0].lon;
                getWeather(data);
                saveSearch(data);
            });
        });
};

var saveSearch = function (data) {
    // console.log(data);
    const { lat, lon, name } = data[0];
    var cityDetails = {"name": name, "lat": lat, "lon": lon};
    cityArray = JSON.parse(localStorage.getItem('city'));
    // console.log(lat);
    // console.log(lon);  
    // console.log(name);
    if (!cityArray){
        cityArray = [];
    }
        console.log(cityDetails);
        // const cityname = data[0].name;
        // cityArray = JSON.parse(localStorage.getItem('city'));
        // // console.log(cityname);
        console.log(cityArray);
        cityArray.push(cityDetails);
    
        
        // console.log(citynameArray);
        localStorage.setItem('city', JSON.stringify(cityArray));
        
       
    
    
}

var getWeather = function (data) {
    // console.log(data);
    // const lat = 
    const { lat, lon, name } = data[0];
    // console.log(lat);
    // console.log(lon);
    // console.log(name);
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=metric&appid=ffaf5b955f9d8df5264787907b066904")
        .then(function (response) {
            response.json().then(function (data) {
                // console.log(data);
                displayCurrentWeather(data, name);
                displayForecast(data, name);
            });
        });
};

var displayCurrentWeather = function (data, name) {

    // currentWeatherContainerEl = "";
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

    var date = new Date(dt * 1000)
    var formattedDate = date.toDateString();
    // console.log(formatted)


    // currentWeatherContainerEl.classList.add("card");
    // var currentEl = document.createElement("div");
    // currentEl.classList.add("card");

    // var currentCardHeader = document.createElement("h3")
    // currentCardHeader.className = ("card-header col-sm-12");
    // var citySearchTerm = document.createElement("span")

    // var currentDateEl = document.createElement("span");
    // var currentIconContainerEl = document.createElement("span");
    // var currentIconEl = document.createElement("img");

    // var currentCardBody = document.createElement("div");
    // currentCardBody.className = ("card-body")
    // var currentWeatherNameEl = document.createElement("ul");
    // currentWeatherNameEl.className = "list-unstyled flex-row";
    // var currentTempEl = document.createElement("li");
    // var currentWindEl = document.createElement("li");
    // var currentHumidityEl = document.createElement("li");
    // var currentUvEl = document.createElement("li");

    // var currentUvColorEl = document.createElement("span");
    currentCityEl.textContent = name;
    currentDateEl.textContent = ('(' + formattedDate + ')');
    currentIconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    currentTempEl.textContent = "Temp: " + temp + " °C";
    currentWindEl.textContent = "Wind: " + wind_speed + " meters/sec";
    currentHumidityEl.textContent = "Humidity: " + humidity + "%";
    currentUvEl.textContent = "UV Index: ";
    currentUvColorEl.textContent = uvi;
    currentUvColorEl.style.backgroundColor = "red";


    // currentCardBody.appendChild(currentWeatherNameEl);
    // currentWeatherNameEl.appendChild(currentTempEl);
    // currentWeatherNameEl.appendChild(currentWindEl);
    // currentWeatherNameEl.appendChild(currentHumidityEl);
    // currentWeatherNameEl.appendChild(currentUvEl);
    // currentUvEl.appendChild(currentUvColorEl);

    // currentCardHeader.appendChild(citySearchTerm);
    // currentCardHeader.appendChild(currentDateEl);
    // currentIconContainerEl.appendChild(currentIconEl);
    // currentCardHeader.appendChild(currentIconContainerEl);

    // currentEl.appendChild(currentCardHeader);
    // currentEl.appendChild(currentCardBody);
    // currentWeatherContainerEl.appendChild(currentEl);


};

var displayForecast = function (data) {
    // console.log(data)
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

        var date = new Date(dailyDate * 1000)
        var formattedDate = date.toDateString();
        // create an element to hold each Date Title
        var dailyDateEl = document.createElement("li");
        dailyDateEl.textContent = formattedDate;

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
        dailyWeatherListEl.appendChild(dailyDateEl);
        dailyWeatherListEl.appendChild(dailyIconContainerEl);
        dailyWeatherListEl.appendChild(dailyTempEl);
        dailyWeatherListEl.appendChild(dailyWindEl);
        dailyWeatherListEl.appendChild(dailyHumidityEl);

        dailyEl.appendChild(dailyWeatherListEl);
        // append container to the dom
        dailyWeatherContainerEl.appendChild(dailyEl);
    }

};
loadSearch();
cityFormEl = addEventListener("submit", formSubmitHandler);
cityFormEl = addEventListener("submit", loadSearch);
cityButtonsEl = addEventListener("submit", getCity);