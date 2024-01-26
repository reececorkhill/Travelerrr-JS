$(document).ready(function() {
    // console.log("Ready!");

    function displayForecasts () {

        var cityName = $("#search-input").val().trim();
        var apiKey = "a9c66b40cb4e146f6ec43b344359e309";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var cityName = (data.name);
            // var forecastDate
            // var forecastIcon
            // var forcastIconLink = ("https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png")
            // var forecastTemp
            // var forecastWind
            // var forecastHumidity

            var todaysForecastDiv = $("<div>");
            todaysForecastDiv.css({"border":"solid black 1px"})

            // City Name and Date
            var todaysForecastCityDate = $("<h2>");
            todaysForecastCityDate.text(cityName) //+ "(" + forecastDate + ")"); // Placeholder - to remove.
            todaysForecastDiv.append(todaysForecastCityDate);

            // // Weather Forecast Icon
            // var todaysForecastIcon = $(`<img src="${forcastIconLink}">`)
            // todaysForecastDiv.append(todaysForecastIcon);

            // // Temperature Forecast
            // var todaysForecastTemp = $("<p>");
            // todaysForecastTemp.text("Temp: " + forecastTemp);
            // todaysForecastDiv.append(todaysForecastTemp);

            // // Wind Forecast
            // var todaysForecastWind = $("<p>");
            // todaysForecastWind.text("Wind: " + forecastWind + " KPH")
            // todaysForecastDiv.append(todaysForecastWind);

            // // Humidity Forecast
            // var todaysForecastHumidity = $("<p>");
            // todaysForecastHumidity.text("Humidity: " + forecastHumidity + "%")
            // todaysForecastDiv.append(todaysForecastHumidity);

            $("#today").append(todaysForecastDiv);
        });

    }

    // This function handles events where a movie button is clicked
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        displayForecasts();
    });
});