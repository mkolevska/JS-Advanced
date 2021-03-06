
console.log("Ready");

function getWeatherInfo(url) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            console.log(response)
            showInfo(response.city,response.list[0].main);
        },
        error: function (error) {
            console.log(error);
        }
    })
}


function showInfo(city,weather) {
    document.getElementById('city-name')
    .innerHTML =`${city.name}`;
     document.getElementById('highest')
     .innerHTML = `Highest temperature: ${Math.round(weather.temp_max)} `;
    document.getElementById('lowest')
     .innerHTML =`Lowest temperatre is: ${Math.round(weather.temp_min)} `;
    document.getElementById('average')
    .innerHTML = `Average temperature is : ${Math.round(((weather.temp_max + weather.temp_min) / 2))}`;
    document.getElementById('humidity-in-air')
    .innerHTML = `${weather.humidity} %`;
    document.getElementById('pressure')
    .innerHTML = `${weather.pressure} hPa`;

}



function getHhourlyWeather(url) {
    $.ajax({
        url: url,
        method: 'GET',

        success: function (response) {
            console.log(response);
            showHhourlyWeatherStats(response)
        },
        error: {
            function(error) {
                console.log(error);
            }
        }
    })
}


function showHhourlyWeatherStats(hourToWeather) {
    let length = hourToWeather.list;
    let table = document.getElementById('table-body');

    for (let i = 0; i < length.length; i++) {
        let row = document.createElement('tr');
        let colIcon = document.createElement('td');
        let img = document.createElement('img');
         img.src = `https://openweathermap.org/img/wn/${length[i].weather[0].icon}.png`;
        colIcon.append (img);
        let colDesc = document.createElement('td');
        colDesc.innerHTML = length[i].weather[0].description;
        let colDate = document.createElement('td');
        colDate.innerHTML =  length[i].dt_txt;
        let colTemp = document.createElement('td');
        colTemp.innerHTML = Math.round(length[i].main.temp )+ ""; 
        let colHum = document.createElement('td');
        colHum.innerHTML = length[i].main.humidity + "%"; 
        let colWindSpeed = document.createElement('td');
        colWindSpeed.innerHTML = length[i].wind.speed + "km/h";


        row.append(colIcon, colDesc, colDate, colTemp, colHum, colWindSpeed);
        table.append(row);

    }

}


//Reusable intems
let tempData = document.getElementById("temperature-data");
tempData.style.display = 'none';
let home = document.getElementById('home-page');
let hourly = document.getElementById('hourly-weather');
hourly.style.display = 'none';
let chooseCity = document.getElementById('custom-report');
chooseCity.style.display = 'none';
let about = document.getElementById('about');
about.style.display = 'none';

//Events

document.getElementById('home-main')
    .addEventListener('click', function () {
        home.style.display = 'block';
        hourly.style.display = 'none';
        chooseCity.style.display = 'none';
        about.style.display = 'none';
        tempData.style.display = 'none';
    });

  document.getElementById('show-temp-info').addEventListener('click' , function(){
    let cityNameInput = document.getElementById('city-name-input').value;
    if(cityNameInput.length === 0){
        alert("Please enter city");
    }
    else{
    tempData.style.display = 'block';
    document.getElementById('temperature').append(tempData)
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput}&units=metric&APPID=9fc4813e53a3955974d219d40b9f499b`;
     getWeatherInfo(url2);
     getHhourlyWeather(url2);
    }
    });

document.getElementById('hourly-weather-main')
    .addEventListener('click', function () {
        home.style.display = 'none';
        hourly.style.display = 'block';
        chooseCity.style.display = 'none';
        about.style.display = 'none';
        tempData.style.display = 'none';
    });

    document.getElementById('choose-city')
    .addEventListener('click', function () {
        hourly.style.display = 'none';
        home.style.display = 'none';
        chooseCity.style.display = 'block';
        about.style.display = 'none';
    });

document.getElementById('about-main')
    .addEventListener('click', function () {
        hourly.style.display = 'none';
        home.style.display = 'none';
        about.style.display = 'block';
        chooseCity.style.display = 'none';
        tempData.style.display = 'none';
    });
    document.getElementById('get-information')
    .addEventListener('click', function () {
        let cityName = document.getElementById("city-name-custom").value;
      console.log(cityName);
        let language = document.getElementById("choose-language").value;
        let metric = document.getElementById("choose-metric").value;
        console.log(metric);
        let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${metric}&lang=${language}&APPID=9fc4813e53a3955974d219d40b9f499b`;
      getWeatherInfo(url2);
      let tempData = document.getElementById("temperature-data");
      tempData.style.display = 'block';
      console.log(tempData)
      document.body.append(tempData);
      getHhourlyWeather(url2);
    })












