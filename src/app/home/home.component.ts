import { WeatherService } from './../shared/remote/weather.service';
import { WeatherData, updateTable } from './../shared/data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, updateTable{
 
  weatherData: Array<WeatherData>; 
  city: string; 
  latitude: number;
  longitude: number;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherData = new Array<WeatherData>();
    this.weatherService.getHomeCity("Stockholm", this);
    this.weatherService.getHomeCity("Göteborg", this);
    this.weatherService.getHomeCity("Malmö", this);
  }

  updateWeather(data: Array<WeatherData>){
    this.weatherData.push({
      city: data[0].city,
      clock: data[0].clock,
      wind: data[0].wind,
      temperature: data[0].temperature,
      icon: data[0].icon
    });
  }

  setErrorMessage(data: string){
    document.getElementById('errormessage').innerHTML = data;
  }

  SetElementValue(id: string, data: string){
    (document.getElementById(id) as HTMLInputElement).value = data;
  }
}
