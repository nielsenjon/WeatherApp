document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
  return;
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=3aa3fd854ee330d8fd498f2f3b8edf2d";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<h2 class="h2 currentCity">Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
        results += '<img class="todayWeather_img" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2 class="h2 todayTemp">' + json.main.temp + " &deg;F</h2>"
      results += "<p class='p weatherDescription'>"
      for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
        results += ", "
      }
      results += "</p>"
      results += "<p class='p feelsLike'>Feels like " + json.main.feels_like + " &deg;F</p>";
      results += '<h4 class="h4 wind">Wind Speed:</h4>'
      results += "<p class='p wind'>" + json.wind.speed + " meter/sec</p>";
      results += '<h4 class="h4 humidity">Humidity:</h4>'
      results += "<p class='p humidity'>" + json.main.humidity + "%</p>"



  document.getElementById("weatherResults").innerHTML = results;
  });
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=3aa3fd854ee330d8fd498f2f3b8edf2d";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
    let forecast = "";
    for (let i=0; i < json.list.length; i++) {
      forecast += "<h2 class='h2'>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
      forecast += "<p class='p minTemp'>Min Temperature: " + json.list[i].main.temp_min + " &deg;F</p>";
      forecast += '<img class="weekWeather_imgs" src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      forecast += "<p class='p maxTemp'>Max Temperature: " + json.list[i].main.temp_max + " &deg;F</p>";
    }
    document.getElementById("forecastResults").innerHTML = forecast;
    });

});
