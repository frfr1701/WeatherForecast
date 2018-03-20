import { WeatherService } from './../shared/remote/weather.service';
import { Component, OnInit } from '@angular/core';
import { WeatherData, updateTable } from '../shared/data';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, updateTable {

  searchResult: Array<WeatherData>; 

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.searchResult = new Array<WeatherData>();
  }

  getWeatherAtPlace(){
    this.weatherService.getCity(this.getElementValue("searchInput"), this);
  }

  getWeatherAtCoordinates(){
    this.weatherService.getCoordinates(this.getElementValue("searchLatitudeInput"), this.getElementValue("searchLongitudeInput"), this);
  }

  updateWeather(data: Array<WeatherData>){
    this.searchResult = data;
  }
  setErrorMessage(data: string){
    document.getElementById('errormessage').innerHTML = data;
  }
  getElementValue(id: string): string{
    return (document.getElementById(id) as HTMLInputElement).value;
  }

  SetElementValue(id: string, data: string){
    (document.getElementById(id) as HTMLInputElement).value = data;
  }
}
