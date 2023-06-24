<script lang="ts">
  import type { Weather } from "../types";

  export let forecast: Weather;
  const {
    condition: { icon },
    temp_c,
    time,
  } = forecast;
  
  const getHours = (dateAsString: string): string =>
    `${new Date(dateAsString).getHours()}:00`;
</script>

<div class="hourly-forecast">
  <img src={icon} alt="icon" />
  <span class="hourly-forecast-detail">{temp_c} °C</span>
  <span class="hourly-forecast-detail">{getHours(time)}</span>
</div>

<style>
  .hourly-forecast {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hourly-forecast-detail {
    font-size: 14px;
  }
</style>
