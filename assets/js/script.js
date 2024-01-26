$(document).ready(function() {
    console.log("Ready!");

    // Creating Today's Forecast Div //

    var todaysForecastDiv = $("<div>");
    todaysForecastDiv.css({"border":"solid black 1px"})

    var todaysForecastCityDate = $("<h2>");
    todaysForecastCityDate.text("London (01/01/2024)"); // Placeholder - to remove.
    todaysForecastDiv.append(todaysForecastCityDate);

    $("#today").append(todaysForecastDiv);

});