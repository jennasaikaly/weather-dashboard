// var getCityName = function() {

//     console.log("function 1 was called");
//   };

var getWeather = function () {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ffaf5b955f9d8df5264787907b066904").then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};


    //   getCityName();
    getWeather(); 