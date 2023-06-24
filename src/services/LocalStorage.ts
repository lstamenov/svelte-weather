import type { Card, WeatherForecast } from "../types";

export default class LocalStorage {
  private static instance: LocalStorage;

  private constructor() {}

  public getCards(): Card[] {
    const cards: Card[] =
      JSON.parse(localStorage.getItem("cards") || '[]');
    return cards;
  }

  public addCardsToStorage(cards: Card[]) {
    localStorage.setItem("cards", JSON.stringify(cards));
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new LocalStorage();
    }

    return this.instance;
  }
}
