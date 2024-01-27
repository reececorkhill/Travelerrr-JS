$(document).ready(function() {

    // Function to display the weather today based on the city the user searches for.
    function displayWeatherToday () {

        var cityName = $("#search-input").val().trim();                                                                                             // Taking user input value and removing whitespace.
        var apiKey = "a9c66b40cb4e146f6ec43b344359e309";                                                                                            // OpenWeatherMap API Key.
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&mode=json&units=metric&appid=" + apiKey;                 // Setting the query URL following API docs spec and specifying metric units of measure.

        fetch(queryURL)                                                                                                                             // Performing a fetch call on the queryURL.
        .then(function (response) {                                                                                                                 // Convering the response to JSON.
            return response.json();                                                                                                                 
        })
        .then(function (data) {                                                                                                                     // Accessing the returned data after being converted.

            var cityName = (data.name);                                                                                                             // Setting the cityName variable to the name from data.
            var forecastDate = dayjs.unix(data.dt).format("DD-MM-YYYY");                                                                            // Setting the forcastDate variable to the unix timestamp from data and formatting it using dayJS.
            var forecastIcon = (data.weather[0].icon);                                                                                              // Setting the forcastIcon variable to the icon code from data.
            var forcastIconLink = ("https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");                                                // Setting the forecastIconLink variable to the docs' icon search link using the forecastIcon code from data.
            var forecastTemp = (data.main.temp.toFixed(1));                                                                                         // Setting the forecastTemp variable to the temp from data and specifying it to 1 decimal place.
            var forecastWind = (data.wind.speed.toFixed(0));                                                                                        // Setting the forecastWind variable to the wind from data and specifying it to 0 decimal places.
            var forecastHumidity = (data.main.humidity);                                                                                            // Setting the forecastHumidity variable to the humidity from data.

            var todaysForecastDiv = $("<div>");                                                                                                     // Creating a div for today's weather information.
            todaysForecastDiv.css({"border":"solid black 1px"});                                                                                    // Adding css border to the div.

            // City Name
            var todaysForecastCity = $("<h2>");                                                                                                     // Creating a h2 element for the city name.
            todaysForecastCity.text(cityName);                                                                                                      // Setting the h2 text to the show the cityName.
            todaysForecastDiv.append(todaysForecastCity);                                                                                           // Appending the h2 element to todaysForecastDiv.

            // Today's Date
            var todaysDate = $("<p>");                                                                                                              // Creating a p element for today's date.
            todaysDate.text("(" + forecastDate + ")");                                                                                              // Setting the p text to show forecastDate.
            todaysForecastDiv.append(todaysDate);                                                                                                   // Appending the p element to todaysForecastDiv.

            // Weather Forecast Icon
            var todaysForecastIcon = $(`<img src="${forcastIconLink}">`);                                                                           // Creating an img element which includes the icon link in source.
            todaysForecastDiv.append(todaysForecastIcon);                                                                                           // Appending the img element to todaysForecastDiv.

            // Temperature Forecast
            var todaysForecastTemp = $("<p>");                                                                                                      // Creating a p element for the temp value.
            todaysForecastTemp.text("Temp: " + forecastTemp + " °C");                                                                               // Setting the p text to show the temp with degrees celsius added on.
            todaysForecastDiv.append(todaysForecastTemp);                                                                                           // Appending the p element to todaysForecastDiv.

            // Wind Forecast
            var todaysForecastWind = $("<p>");                                                                                                      // Creating a p element for the wind value.
            todaysForecastWind.text("Wind: " + forecastWind + " /mph");                                                                             // Setting the p text to show the wind with miles per hour added on.
            todaysForecastDiv.append(todaysForecastWind);                                                                                           // Appending the p element to todaysForecastDiv.

            // Humidity Forecast
            var todaysForecastHumidity = $("<p>");                                                                                                  // Creating a p element for the humidity value.
            todaysForecastHumidity.text("Humidity: " + forecastHumidity + "%");                                                                     // Setting the p text to show the humidity with % added on.
            todaysForecastDiv.append(todaysForecastHumidity);                                                                                       // Appending the p element to todaysForecastDiv.

            $("#today").append(todaysForecastDiv);                                                                                                  // Appending the todaysForecastDiv to the #today section.
        });

    }

    $("#search-button").on("click", function (event) {                                                                                              // Function to handle events when search button is clicked.
        event.preventDefault();                                                                                                                     // Preventing default behaviour.
        displayWeatherToday();                                                                                                                      // Calling the displayWeatherToday function.
    });
});