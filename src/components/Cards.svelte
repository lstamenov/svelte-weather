<script lang="ts">
  import LocalStorage from "../services/LocalStorage";
  import { cards } from "../stores/store";
  import Card from "./Card.svelte";

  const localStorageSerivce: LocalStorage = LocalStorage.getInstance();

  $: localStorageSerivce.addCardsToStorage($cards);
</script>

<div class="cards">
  {#each $cards as { data, requestTime } (`${data.location.lat},${data.location.lon}`)}
    {#key data}
      <Card forecast={data} {requestTime} />
    {/key}
  {/each}
</div>

<style>
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
