export type SearchResult = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
};

export type Weather = {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  feelslike_c: number;
  time: string;
  hour?: Weather[];
};

export type WeatherForecast = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
    customName?: string;
  };
  current: Weather;
  forecast: {
    forecastday: Weather[];
  };
};

export type Card = {
  data: WeatherForecast;
  requestTime: number;
};
