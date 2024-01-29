$(document).ready(function() {
    
    displayButtons();                                                                                                                               // Calling the display button function to display previously searched cities from local storage.

    // Function to display the weather today based on the city the user searches for.
    function displayWeatherToday () {

        var cityName = $("#search-input").val().trim();                                                                                             // Taking user input value and removing whitespace.
        var apiKey = "a9c66b40cb4e146f6ec43b344359e309";                                                                                            // OpenWeatherMap API Key.

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&mode=json&units=metric&appid=" + apiKey;                 // Setting the query URL following API docs spec for today's weather call and specifying metric units of measure.

        fetch(queryURL)                                                                                                                             // Performing a fetch call on the queryURL.
        .then(function (response) {                                                                                                                 // Convering the response to JSON.
            return response.json();                                                                                                                 
        })
        .then(function (data) {                                                                                                                     // Accessing the returned data after being converted.
            $("#today").empty();                                                                                                                    // Clear the today div.
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
            todaysForecastWind.text("Wind: " + forecastWind + "/mph");                                                                              // Setting the p text to show the wind with miles per hour added on.
            todaysForecastDiv.append(todaysForecastWind);                                                                                           // Appending the p element to todaysForecastDiv.

            // Humidity Forecast
            var todaysForecastHumidity = $("<p>");                                                                                                  // Creating a p element for the humidity value.
            todaysForecastHumidity.text("Humidity: " + forecastHumidity + "%");                                                                     // Setting the p text to show the humidity with % added on.
            todaysForecastDiv.append(todaysForecastHumidity);                                                                                       // Appending the p element to todaysForecastDiv.

            $("#today").append(todaysForecastDiv);                                                                                                  // Appending the todaysForecastDiv to the #today section.
        });

    }

    // Function to display the 5 day weather forecast based on the city the user searches for.
    function displayForecast () {

        var forecastCityName = $("#search-input").val().trim();                                                                                     // Taking user input value and removing whitespace.
        var apiKey = "a9c66b40cb4e146f6ec43b344359e309";                                                                                            // OpenWeatherMap API Key.

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecastCityName + "&mode=json&units=metric&appid=" + apiKey;        // Setting the query URL following API docs spec for forecast call and specifying metric units of measure.

        fetch(queryURL)                                                                                                                             // Performing a fetch call on the queryURL.
        .then(function (response) {                                                                                                                 // Convering the response to JSON.
            return response.json();                                                                                                                 
        })
        .then(function (data) {                                                                                                                     // Accessing the returned data after being converted.
            for (var i = 0; i < data.list.length; i++) {                                                                                            // Iterating through the data one by one.
                if (data.list[i].dt_txt.includes("00:00:00")) {                                                                                     // Checking if the the date/time text includes 00:00:00 - to make sure we're only getting 5 days.

                    console.log(data.list[i]);
                    var eachDate = dayjs.unix(data.list[i].dt).format("DD-MM-YYYY");                                                                // Setting the eachDate variable to the unix timestamp from data iteration and formatting it using dayJS.
                    console.log(eachDate);
                    var eachIcon = (data.list[i].weather[0].icon);                                                                                  // Setting the eachIcon variable to the icon code from data iteration.
                    console.log(eachIcon);
                    var eachIconLink = ("https://openweathermap.org/img/wn/" + eachIcon + "@2x.png");                                               // Setting the eachIconLink variable to the docs' icon search link using the eachIcon code from data iteration.
                    console.log(eachIconLink);
                    var eachTemp = (data.list[i].main.temp.toFixed(1));                                                                             // Setting the eachTemp variable to the temp from data iteration and specifying it to 1 decimal place.
                    console.log(eachTemp);
                    var eachWind = (data.list[i].wind.speed.toFixed(0));                                                                            // Setting the eachWind variable to the wind from data iteration and specifying it to 0 decimal places.
                    console.log(eachWind);
                    var eachHumidity = (data.list[i].main.humidity);                                                                                // Setting the eachHumidity variable to the humidity from data iteration.
                    console.log(eachHumidity)

                    // 5-day Forecast Grid Layout
                    var multiDayForecastGrid = $("<div>");                                                                                          // Setting the Forecast Area Grid Div.
                    multiDayForecastGrid.addClass("col-sm-12 col-md-12 col-lg-2");                                                                  // Adding classes for column sizing.

                    // 5-day Forecast Cards
                    var multiDayForecastCard = $("<div>");                                                                                          // Setting the Forecast Cards.
                    multiDayForecastCard.addClass("card");                                                                                          // Adding bootstrap class - card.
                    multiDayForecastGrid.append(multiDayForecastCard);                                                                              // Appening the card to the grid.

                    // 5-day Forecast Card Body's
                    var multiDayForecastCardBody = $("<div>");                                                                                      // Setting the Forecast Cards' Body.
                    multiDayForecastCardBody.addClass("card-body");                                                                                 // Adding bootstrap class - card-body.
                    multiDayForecastCardBody.css({"text-align":"center"})                                                                           // Adding css to centre align content.
                    multiDayForecastCard.append(multiDayForecastCardBody);                                                                          // Appending the card body to the forecast card.

                    // 5-day Forecast Card Title
                    var multiDayForecastCardTitle = $("<h5>");                                                                                      // Setting the Forecast Cards' Title.
                    multiDayForecastCardTitle.addClass("card-title");                                                                               // Adding bootstrap class - card-title.
                    multiDayForecastCardTitle.text("(" + eachDate + ")");                                                                           // Adding the eachDate variable to the title text.
                    multiDayForecastCardBody.append(multiDayForecastCardTitle);                                                                     // Appening the card title to the forecast card body.

                    // 5-day Forecast Card Icon
                    var multiDayForecastCardIcon = $(`<img src="${eachIconLink}">`);                                                                // Setting the Forecast Cards' Weather Icon.
                    multiDayForecastCardIcon.css({"height":"75px", "width":"75px"});                                                                // Adding css to change the icon size.
                    multiDayForecastCardBody.append(multiDayForecastCardIcon);                                                                      // Appending the weather icon to the card body.

                    // 5-day Forecast Card Temp
                    var multiDayForecastCardTemp = $("<p>");                                                                                        // Setting the Forecast Cards' Temp.
                    multiDayForecastCardTemp.text("Temp: " + eachTemp + " °C")                                                                      // Adding the eachTemp variable to the temp text.
                    multiDayForecastCardBody.append(multiDayForecastCardTemp);                                                                      // Appending the card temp to the forecast card body.

                    // 5-day Forecast Card Wind
                    var multiDayForecastCardWind = $("<p>");                                                                                        // Setting the Forecast Cards' Wind.
                    multiDayForecastCardWind.text("Wind: " + eachWind + "/mph")                                                                     // Adding the eachWind variable to the wind text.
                    multiDayForecastCardBody.append(multiDayForecastCardWind);                                                                      // Appending the card wind to the forecast card body.

                    // 5-day Forecast Card Humidity
                    var multiDayForecastCardHumidity = $("<p>");                                                                                    // Setting the Forecast Cards' Humidity.
                    multiDayForecastCardHumidity.text("Humidity: " + eachHumidity + "%")                                                            // Adding the eachHumidity variable to the humidity text.
                    multiDayForecastCardBody.append(multiDayForecastCardHumidity);                                                                  // Appending the card humidity to the forecast card body.

                    $("#forecast").append(multiDayForecastGrid);                                                                                    // Appending the multiDayForecastGrid to the forecast div.
                }
            }
        });
    }

    // Function to save city names to localstorage.
    function saveCity() {
        var newCityName = $("#search-input").val().trim();                                                                                          // Setting the newCityName variable to the search input box value and removing whitespace.
        var existingCities = JSON.parse(localStorage.getItem("savedCities"));                                                                       // Declaring existingCities variable which gets savedCities from localstorage and parses it.

        if (newCityName !== "") {                                                                                                                   // Checking that the user has entered something in the newCityName input box.
            var cityText = newCityName;                                                                                                             // Declaring cityText variable to the value of the newCityName input box.
            var cityObject = {cityText};                                                                                                            // Declaring cityObject variable which will store the cityText in an object.
        } else {                                                                                                                                    // If the newCityName input box is empty:
            alert("Please enter a city before searching!");                                                                                         // Alert the user they must enter a city in the input box.
            return;
        };

        if (!existingCities) {                                                                                                                      // If existingUserTasks is falsy.
            existingCities = [];                                                                                                                    // Set existingCities to an empty array.
        };

        var newCities = [...existingCities, cityObject];                                                                                            // Creates newCities array by spreading the elements of existingCities and adding cityObject to the end.
        localStorage.setItem("savedCities", JSON.stringify(newCities));                                                                             // Converts newCities to a string and stores it in local storage with the key "savedCities".
    }

    // Function to display previously searched cities from local storage as buttons.
    function displayButtons () {
        var existingCities = JSON.parse(localStorage.getItem("savedCities"));                                                                       // Getting savedCities from localstorage and parsing it.
        
        if (existingCities !== null) {                                                                                                              // If the array is empty (null):
            $("#history").empty();                                                                                                                  // Clear the history div.
            for (var i = 0; i < existingCities.length; i++) {                                                                                       // Iterate through the exisitingCities array.
                var searchHistoryButton = $("<button>");                                                                                            // Setting the searchHistoryButton element.
                searchHistoryButton.addClass("btn btn-primary col-12 mt-2 previous-search");                                                        // Adding bootstrap classes and giving a class of previous-search.
                searchHistoryButton.text(existingCities[i].cityText);                                                                               // Applying the cityText to the button.
                $("#history").append(searchHistoryButton);                                                                                          // Appening the searchHistoryButton to the history div.
            }; 
        } else {                                                                                                                                    // If the existingCities array is null, return.
            return;
        };    
    }

    // Function to handle events when search button is clicked.
    $("#search-button").on("click", function (event) {
        event.preventDefault();                                                                                                                     // Preventing default behaviour.
        var newCityName = $("#search-input").val().trim();                                                                                          // Setting the newCityName variable to the search input box value and removing whitespace.
        if (newCityName !== "") {                                                                                                                   // Only running the following code if the input box is not empty.
            displayWeatherToday();                                                                                                                  // Calling the displayWeatherToday function.
            $("#forecast").empty();                                                                                                                 // Clear the forecast div.
            $("#forecast").css({"display":"flex", "justify-content":"space-between"});                                                              // Making the forecast div use flex and space the content within between.
            var forecastH4 = $("<h4>");                                                                                                             // Creating a h4 tag.
            forecastH4.text("5-Day Forecast");                                                                                                      // Setting the text of the h4 tag.
            $("#forecast").append(forecastH4);                                                                                                      // Appending the h4 tag to the forecast div.
            displayForecast();                                                                                                                      // Calling the displayForecast function. 
            saveCity();                                                                                                                             // Calling the saveCity function.
            displayButtons();                                                                                                                       // Calling the displayButtons function.  
        } else {                                                                                                                                    // If the newCityName input box is empty:
            alert("Please enter a city before searching!");                                                                                         // Alert the user they must enter a city in the input box.
            return;
        }
    });

    $(".previous-search").on("click", function (event) {
        event.preventDefault();
        var cityName = $(this).text();    
        var forecastCityName = $(this).text(); 
        $("#today").empty();
        $("#forecast").empty();
        console.log(cityName)
        console.log(forecastCityName)
    })
});