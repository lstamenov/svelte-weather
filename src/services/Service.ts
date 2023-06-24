import type { Card, SearchResult, WeatherForecast } from "../types";

export default class Service {
  private static instance: Service;

  private constructor() {}

  private buildLink(url: string, queryParams: Record<string, string>): string {
    const query = Object.keys(queryParams).map(
      (key) => `${key}=${queryParams[key]}`
    );
    return `http://api.weatherapi.com/v1/${url}?key=26c3d5db20764d1aa4f185611232206&${query}`;
  }

  public async fetchSearchResults(query: string): Promise<SearchResult[]> {
    const url: string = this.buildLink("search.json", { q: query });
    const res = await fetch(url);
    return res.json();
  }

  public async fetchForecastData(lon: number, lat: number): Promise<Card> {
    const url: string = this.buildLink("forecast.json", { q: `${lat},${lon}` });
    const startTime: number = new Date().getTime();
    const res = await fetch(url);
    const data: WeatherForecast = await res.json();
    const endTime: number = new Date().getTime();

    return { data, requestTime: endTime - startTime };
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Service();
    }

    return this.instance;
  }
}
