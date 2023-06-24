<script lang="ts">
  import type { Weather, WeatherForecast } from "../types";
  import HourlyForecast from "./HourlyForecast.svelte";
  import { cards } from "../stores/store";
  import Service from "../services/Service";
  import { onMount } from "svelte";
  import CardTitle from "./CardTitle.svelte";

  export let forecast: WeatherForecast;
  const {
    location: { name, country, lat, lon, region, localtime, customName },
    current: {
      condition: { icon },
      temp_c,
      feelslike_c,
    },
    forecast: { forecastday },
  } = forecast;
  export let requestTime: number;
  let shouldShowRequestTime: boolean = true;

  let title: string = customName
    ? customName
    : `${name}, ${region}, ${country}`;
  const localTime = new Date(localtime);
  const service = Service.getInstance();

  onMount(() => {
    const timeout: number = setTimeout(() => {
      shouldShowRequestTime = false;
    }, 3000);

    const interval: number = setInterval(async () => {
      const card = await service.fetchForecastData(lon, lat);
      cards.updateCard(card);
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  });

  const hourlyForecast: Weather[] = forecastday[0].hour.filter(
    (_, index) => index > localTime.getHours()
  );

  const handleRemoveCard = () => cards.removeCard(lon, lat);

  const handleSaveTitle = (newTitle: string) => () =>
    cards.renameCard(lon, lat, newTitle);

  const getTime = () => {
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();

    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };
</script>

<div class="card">
  {#if shouldShowRequestTime}
    <span class="request-time">Request Time: {requestTime}ms</span>
  {/if}
  <CardTitle {title} onSave={handleSaveTitle} />
  <h5>{lon}, {lat}</h5>
  <div class="container">
    <img class="img" src={icon} alt="icon" />
    <div>
      <span>{temp_c}°C, Feels like {feelslike_c}°C</span>
      <span>Local Time: {getTime()}</span>
    </div>
  </div>
  <div class="hourly-forecast-container">
    {#each hourlyForecast as cast}
      <HourlyForecast forecast={cast} />
    {/each}
  </div>
  <button on:click={handleRemoveCard} class="remove-btn">Remove</button>
</div>

<style>
  .card {
    position: relative;
    background-color: rgb(195, 195, 195);
    border-radius: 4px;
    box-shadow: 1px 3px 18px;
    padding: 5px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .request-time {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 3;
    background-color: rgb(92, 219, 92);
    color: white;
    border-radius: 4px;
    padding: 10px 0;
  }

  .img {
    width: 120px;
    height: 120px;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hourly-forecast-container {
    overflow: scroll;
    overflow-y: hidden;
    width: 300px;
    display: flex;
  }

  .remove-btn {
    background-color: rgb(254, 84, 84);
    width: 50%;
    border-radius: 3px;
    color: white;
    align-self: center;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.4s ease;
  }

  .remove-btn:hover {
    background-color: rgb(250, 68, 68);
  }

  h5 {
    margin: 3px;
  }
</style>
