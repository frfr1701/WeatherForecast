export interface WeatherData {
    city: string;
    clock: string;
    wind: string;
    temperature: string;
    icon: string;
}

export interface Box {
    weatherData: Array<WeatherData>;
    lon: string;
    lat: string;
}

export interface Options {
    enableHighAccuracy: boolean,
    timeout: number,
    maximumAge: number
}

export interface updateTable {
    updateWeather(data: Array<WeatherData>);
    setErrorMessage(data: string);
    SetElementValue(id: string, data: string);
}