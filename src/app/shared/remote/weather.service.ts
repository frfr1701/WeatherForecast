import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherData, updateTable, Box } from './../data';
import { Injectable } from '@angular/core';

const weather_url: string[] = ['https://api.openweathermap.org/data/2.5/forecast?q=', '&APPID=7e483fda3799b98fc867a6231f62d3ed&lang=se'];
const weather_latlon_url: string[] = ['https://api.openweathermap.org/data/2.5/forecast?APPID=7e483fda3799b98fc867a6231f62d3ed&lat=', '&lon='];

@Injectable()
export class WeatherService {


  constructor(private http: HttpClient) { }

  getCoordinates(lat: string, lon: string, table: updateTable) {
    var weatherResponse: Box;
    this.http.get(weather_latlon_url[0] + lat + weather_latlon_url[1] + lon).subscribe(
      data => {
        weatherResponse = this.parseWeather("", data);
        table.updateWeather(weatherResponse.weatherData);
        table.SetElementValue("searchInput", "");
        table.SetElementValue("searchLongitudeInput", lon);
        table.SetElementValue("searchLatitudeInput", lat);
        table.setErrorMessage("");
        document.getElementById("city_header").innerHTML = "";
        document.getElementById("tableResult").classList.add("displaying");
        document.getElementById("tableResult").classList.remove("not_displaying");
        document.getElementById("searchCard").classList.add("mb-5");
        document.getElementById("searchCard").classList.remove("mb-before-search");
        document.getElementById("searchCard").classList.remove("mb-wrong-search");
      },
      err => {
        table.updateWeather(null);
        if (lat.length == 0 && lon.length == 0) {
          table.setErrorMessage("Finns inga koordinater");
        } else if (lat.length == 0) {
          table.setErrorMessage("Finns ingen latitud koordinat");
        } else if (lon.length == 0) {
          table.setErrorMessage("Finns ingen longitud koordinat");
        } else {
          table.setErrorMessage("Felinmatning på koordinater");
        }
        table.SetElementValue("searchInput", "");
        document.getElementById("city_header").innerHTML = "";
        document.getElementById("tableResult").classList.add("not_displaying");
        document.getElementById("tableResult").classList.remove("displaying");
        document.getElementById("searchCard").classList.add("mb-wrong-search");
        document.getElementById("searchCard").classList.remove("mb-before-search");
        document.getElementById("searchCard").classList.remove("mb-5");
      }
    );
  }

  getHomeCity(city: string, table: updateTable) {
    var weatherResponse: Box;
    this.http.get(weather_url[0] + city + weather_url[1]).subscribe(
      data => {
        weatherResponse = this.parseWeather(city, data);
        table.updateWeather(weatherResponse.weatherData);
      });
  }

  getCity(city: string, table: updateTable) {
    var weatherResponse: Box;
    this.http.get(weather_url[0] + city + weather_url[1]).subscribe(
      data => {
        weatherResponse = this.parseWeather(city, data);
        table.updateWeather(weatherResponse.weatherData);
        table.setErrorMessage("");
        table.SetElementValue("searchLongitudeInput", weatherResponse.lon);
        table.SetElementValue("searchLatitudeInput", weatherResponse.lat);
        document.getElementById("city_header").innerHTML = city.charAt(0).toUpperCase() + city.substring(1).toLowerCase();
        document.getElementById("tableResult").classList.add("displaying");
        document.getElementById("tableResult").classList.remove("not_displaying");
        document.getElementById("searchCard").classList.add("mb-5");
        document.getElementById("searchCard").classList.remove("mb-before-search");
        document.getElementById("searchCard").classList.remove("mb-wrong-search");
      },
      err => {
        table.SetElementValue("searchLongitudeInput", "");
        table.SetElementValue("searchLatitudeInput", "");
        table.updateWeather(null);
        if (city.length == 0) {
          table.setErrorMessage("Sökfältet är tomt");
        } else {
          table.setErrorMessage("finns ingen stad som heter: \"" + city.charAt(0).toUpperCase() + city.substring(1).toLowerCase() + "\"");
        }
        document.getElementById("city_header").innerHTML = "";
        document.getElementById("tableResult").classList.add("not_displaying");
        document.getElementById("tableResult").classList.remove("displaying");
        document.getElementById("searchCard").classList.add("mb-wrong-search");
        document.getElementById("searchCard").classList.remove("mb-before-search");
        document.getElementById("searchCard").classList.remove("mb-5");
      }
    );
  }

  parseWeather(city: string, data: any): Box {
    var weatherData = new Array<WeatherData>();
    var lon: string;
    var lat: string;
    for (let index = 0; index < 7; index++) {
      var time = ((new Date(data.list[index].dt_txt).getHours() + ":00").length > 4 ? "" : "0") + new Date(data.list[index].dt_txt).getHours() + ":00";
      var wind = data.list[index].wind.speed.toFixed(1) + " m/s";
      var temp = (Number(data.list[index].main.temp) - 273.15).toFixed(1) + "°C";
      var icon = "http://openweathermap.org/img/w/" + data.list[index].weather[0].icon + ".png";
      if (city.length != 0) {
        city = city.charAt(0).toUpperCase() + city.substring(1).toLowerCase();
      }
      weatherData.push({
        city: city,
        clock: time,
        wind: wind,
        temperature: temp,
        icon: icon
      });
    }
    lat = data.city.coord.lat;
    lon = data.city.coord.lon;
    return {weatherData, lat, lon};
  }
}