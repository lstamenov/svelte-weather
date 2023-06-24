<script lang="ts">
  import Service from "../services/Service";
  import { cards } from "../stores/store";
  import type { SearchResult as SearchResultI } from "../types";
  import SearchResult from "./SearchResult.svelte";

  export let results: SearchResultI[] = [];
  export let handleClearInput: () => void;
  const service: Service = Service.getInstance();

  const handleResultClick = (result: SearchResultI) => async () => {
    const { lon, lat } = result;
    const card = await service.fetchForecastData(lon, lat);
    cards.addCard(card);
    handleClearInput();
  };
</script>

{#if results.length}
  <div class="results">
    {#each results as result (result.id)}
      <SearchResult
        onClick={handleResultClick(result)}
        name={result.name}
        region={result.region}
        country={result.country}
      />
    {/each}
  </div>
{/if}

<style>
  .results {
    position: absolute;
    margin-top: 35px;
    box-shadow: 3px 5px 10px;
    width: 300px;
    z-index: 5;
  }
</style>
