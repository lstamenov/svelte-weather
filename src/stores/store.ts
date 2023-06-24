import { writable } from "svelte/store";
import type { Card as TCard } from "../types";
import LocalStorage from "../services/LocalStorage";
const localStorageService: LocalStorage = LocalStorage.getInstance();

const createStore = () => {
  const { subscribe, update } = writable<TCard[]>(
    localStorageService.getCards()
  );

  const addCard = (card: TCard) => update((val) => [...val, card]);

  const removeCard = (lon: number, lat: number) =>
    update((val) =>
      val.filter(
        ({ data: { location } }) => location.lon !== lon && location.lat !== lat
      )
    );

  const updateCard = (card: TCard) =>
    update((arr) =>
      arr.map((currentCard) => {
        if (
          currentCard.data.location.lat === card.data.location.lat &&
          currentCard.data.location.lon === card.data.location.lon
        ) {
          card.data.location.customName = currentCard.data.location.customName;

          return card;
        }

        return currentCard;
      })
    );

  const renameCard = (lon: number, lat: number, newName: string) =>
    update((arr) =>
      arr.map((card) => {
        if (card.data.location.lat === lat && card.data.location.lon === lon) {
          const newCard = { ...card };
          newCard.data.location.customName = newName;

          return newCard;
        }

        return card;
      })
    );

  return { subscribe, addCard, removeCard, updateCard, renameCard };
};

export const cards = createStore();
